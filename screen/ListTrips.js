import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar, Menu} from 'react-native-paper';
import 'react-native-gesture-handler';

const ListTrips = ({navigation}) => {
  const [openMenu, setOpenMenu] = React.useState(false);

  navigateToScreen = () => {
    navigation.navigate('CreateTrip');
  };

  menuDrawer = () => {
    setOpenMenu(!openMenu);
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
          <Menu.Item onPress={() => {}} title="Delete All Trip" />
        </Menu>
      </Appbar.Header>
      <View style={styles.ListTrips}>
        <Text style={styles.text}> Home </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ListTrips: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    margin: 12,
    fontSize: 22,
    fontWeight: '100',
  },
});

export default ListTrips;
