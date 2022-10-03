import {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Appbar, Menu, TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';

import 'react-native-gesture-handler';

const EditTrip = ({route, navigation}) => {
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

  const [openMenu, setOpenMenu] = useState(false);

  const [showIsRequireAssessment, setShowIsRequireAssessment] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const [date, setDate] = useState(new Date());

  const [id, setId] = useState('');
  const [tripName, setTripName] = useState('');
  const [tripDestination, setTripDestination] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [requireAssessment, setRequireAssessment] = useState('');
  const [dateOfTrip, setDateOfTrip] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const isRequireAssessment = [
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
  ];

  const tripStatus = [
    {
      label: 'Initial',
      value: 'Initial',
    },
    {
      label: 'Pending',
      value: 'Pending',
    },
    {
      label: 'Done',
      value: 'Done',
    },
  ];

  useEffect(() => {
    setId(route.params.id);
    setTripName(route.params.tripName);
    setTripDestination(route.params.tripDestination);
    setVehicle(route.params.vehicle);
    setRequireAssessment(route.params.requireAssessment);
    setDateOfTrip(route.params.dateOfTrip);
    setDescription(route.params.requireAssessment);
    setStatus(route.params.status);
  }, []);

  deleteTrip = () => {
    databaseHelper.transaction(tx => {
      tx.executeSql('DELETE FROM trips where id=?', [id], (tx, results) => {
        if (results.rowsAffected > 0) {
          ToastAndroid.show('Delete trip successfully', ToastAndroid.SHORT);
        }
      });
    });
    navigation.goBack();
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateOfTrip(currentDate);
  };

  showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
    });
  };

  showDatePicker = () => {
    showMode('date');
  };

  menuDrawer = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction title="Back" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Trip" />
        <Appbar.Action
          icon="check"
          onPress={this.navigateToScreen}
          title="Edit Trip"
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
          <Menu.Item onPress={deleteTrip} title="Delete Trip" />
        </Menu>
      </Appbar.Header>
      <SafeAreaView style={styles.EditTrip}>
        <ScrollView>
          <TextInput
            maxLength={45}
            mode="outlined"
            label={
              <Text>
                Trip Name
                <Text style={{color: '#b61827'}}> *</Text>
              </Text>
            }
            value={tripName}
            onChangeText={tripName => setTripName(tripName)}
            style={{marginVertical: 10}}
          />

          <TextInput
            maxLength={45}
            mode="outlined"
            label={
              <Text>
                Trip Destination
                <Text style={{color: '#b61827'}}> *</Text>
              </Text>
            }
            value={tripDestination}
            onChangeText={tripDestination =>
              setTripDestination(tripDestination)
            }
          />

          <TextInput
            maxLength={45}
            mode="outlined"
            label={
              <Text>
                Vehicle
                <Text style={{color: '#b61827'}}> *</Text>
              </Text>
            }
            value={vehicle}
            onChangeText={vehicle => setVehicle(vehicle)}
            style={{marginVertical: 10}}
          />

          <DropDown
            label={
              <Text>
                Require Risk Assessment
                <Text style={{color: '#b61827'}}> *</Text>
              </Text>
            }
            mode={'outlined'}
            visible={showIsRequireAssessment}
            showDropDown={() => setShowIsRequireAssessment(true)}
            onDismiss={() => setShowIsRequireAssessment(false)}
            value={requireAssessment}
            setValue={setRequireAssessment}
            list={isRequireAssessment}
          />

          <TextInput
            onTouchStart={() => showDatePicker()}
            mode="outlined"
            label={
              <Text>
                Date of Trip
                <Text style={{color: '#b61827'}}> *</Text>
              </Text>
            }
            value={dateOfTrip && moment(dateOfTrip).format('L')}
            style={{marginVertical: 10}}
          />

          <DropDown
            label={
              <Text>
                Status
                <Text style={{color: '#b61827'}}> *</Text>
              </Text>
            }
            mode={'outlined'}
            visible={showStatus}
            showDropDown={() => setShowStatus(true)}
            onDismiss={() => setShowStatus(false)}
            value={status}
            setValue={setStatus}
            list={tripStatus}
          />

          <TextInput
            maxLength={225}
            mode="outlined"
            label="Description"
            multiline={true}
            numberOfLines={5}
            value={description}
            onChangeText={description => setDescription(description)}
            style={{marginVertical: 10}}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  EditTrip: {
    flex: 1,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 10,
    flexGrow: 1,
  },

  text: {
    textAlign: 'center',
    margin: 12,
    fontSize: 22,
    fontWeight: '100',
  },
});

export default EditTrip;
