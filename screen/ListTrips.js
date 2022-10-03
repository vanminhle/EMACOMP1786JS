import {useEffect, useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Appbar, Menu} from 'react-native-paper';
import 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

const ListTrips = ({navigation}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [trips, setTrips] = useState([]);
  const [emptyTrip, setEmptyTrip] = useState(false);

  const isFocused = useIsFocused();
  moment.suppressDeprecationWarnings = true;

  const databaseHelper = openDatabase(
    {
      name: 'TripsDatabase',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error);
    },
  );

  useEffect(() => {
    databaseHelper.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'trips ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, tripName TEXT, tripDestination TEXT, vehicle TEXT, requireAssessment TEXT, dateOfTrip TEXT, description TEXT, status TEXT);',
      );
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      databaseHelper.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM trips ORDER BY id DESC',
          [],
          (tx, results) => {
            const tempData = [];
            if (results.rows.length === 0) {
              setEmptyTrip(true);
            } else {
              setEmptyTrip(false);
              for (let i = 0; i < results.rows.length; ++i)
                tempData.push(results.rows.item(i));
              setTrips(tempData);
            }
          },
        );
      });
    }, [isFocused, trips]),
  );

  deleteAllTrip = () => {
    databaseHelper.transaction(tx => {
      tx.executeSql('DELETE FROM trips');
    });
  };

  editTrip = (
    id,
    tripName,
    tripDestination,
    vehicle,
    requireAssessment,
    dateOfTrip,
    description,
    status,
  ) => {
    navigation.navigate('EditTrip', {
      id,
      tripName,
      tripDestination,
      vehicle,
      requireAssessment,
      dateOfTrip,
      description,
      status,
    });
  };

  navigateToScreen = () => {
    navigation.navigate('CreateTrip');
  };

  menuDrawer = () => {
    setOpenMenu(!openMenu);
  };

  listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#c7c7c7',
        }}
      />
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Trip Management" />
        <Appbar.Action
          icon="plus"
          onPress={this.navigateToScreen}
          title="Create New Trip"
        />
        <Menu
          visible={openMenu}
          onDismiss={menuDrawer}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="white"
              onPress={menuDrawer}
            />
          }>
          <Menu.Item onPress={deleteAllTrip} title="Delete All Trip" />
        </Menu>
      </Appbar.Header>
      <SafeAreaView style={styles.ListTrips}>
        <View>
          {emptyTrip ? (
            <Text style={styles.noTripsText}>
              No trips available. Please create a new one
            </Text>
          ) : (
            <FlatList
              data={trips}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View key={item.id} style={{padding: 20}}>
                  <TouchableOpacity
                    onPress={() =>
                      editTrip(
                        item.id,
                        item.tripName,
                        item.tripDestination,
                        item.vehicle,
                        item.requireAssessment,
                        item.dateOfTrip,
                        item.description,
                        item.status,
                      )
                    }>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.tripNameStyle}>
                      {item.tripName}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.itemsStyle}>
                      Destination: {item.tripDestination}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.itemsStyle}>
                      Vehicle: {item.vehicle}
                    </Text>
                    <Text style={styles.itemsStyle}>
                      Date Of Trip:
                      {moment(item.dateOfTrip).format('L')}
                    </Text>
                    <Text style={styles.itemsStyle}>
                      Require Risk Assessment: {item.requireAssessment}
                    </Text>
                    <Text style={styles.itemsStyle}>Status: {item.status}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  ListTrips: {
    paddingBottom: 60,
  },

  tripNameStyle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },

  itemsStyle: {
    fontSize: 17,
    color: '#000',
    marginBottom: 5,
  },

  noTripsText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '100',
    marginTop: '70%',
  },
});

export default ListTrips;
