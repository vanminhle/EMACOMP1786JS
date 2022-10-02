import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar, Menu} from 'react-native-paper';

import 'react-native-gesture-handler';

const EditTrip = () => {
  const [openMenu, setOpenMenu] = React.useState(false);

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
          <Menu.Item onPress={() => {}} title="Delete Trip" />
        </Menu>
      </Appbar.Header>
      <View style={styles.EditTrip}>
        <Text style={styles.text}>Edit Trip Screen</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  EditTrip: {
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

export default EditTrip;
