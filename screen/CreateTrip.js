import {useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {
  Appbar,
  Menu,
  TextInput,
  Paragraph,
  Dialog,
  Portal,
  Button,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {openDatabase} from 'react-native-sqlite-storage';

const CreateTrip = ({navigation}) => {
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
  const [successModal, setSuccessModal] = useState(false);

  const [showIsRequireAssessment, setShowIsRequireAssessment] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const [date, setDate] = useState(new Date());

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

  const insertData = () => {
    if (
      tripName == '' ||
      tripDestination == '' ||
      vehicle == '' ||
      requireAssessment == '' ||
      dateOfTrip == '' ||
      status == ''
    ) {
      ToastAndroid.show('Please input all required field', ToastAndroid.SHORT);
    } else {
      databaseHelper.transaction(tx => {
        tx.executeSql(
          'INSERT INTO trips (tripName, tripDestination, vehicle, requireAssessment, dateOfTrip, description, status) VALUES (?,?,?,?,?,?,?)',
          [
            tripName,
            tripDestination,
            vehicle,
            requireAssessment,
            dateOfTrip,
            description,
            status,
          ],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              setSuccessModal(true);
            } else
              ToastAndroid.show(
                'Problem when creating trip! Please try again',
                ToastAndroid.SHORT,
              );
          },
        );
      });
    }
  };

  const onChange = (event, selectedDate) => {
    setDateOfTrip(selectedDate.toString());
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
    });
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const menuDrawer = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction title="Back" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Adding New Trip" />
        <Appbar.Action
          icon="check"
          onPress={insertData}
          title="Adding New Trip"
        />
      </Appbar.Header>

      <Portal>
        <Dialog visible={successModal}>
          <Dialog.Title>Adding Trip Successfully</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{`Name: ${tripName}`}</Paragraph>
            <Paragraph>{`Destination: ${tripDestination}`}</Paragraph>
            <Paragraph>{`Vehicle: ${vehicle}`}</Paragraph>
            <Paragraph>{`Require Assessment: ${requireAssessment}`}</Paragraph>
            <Paragraph>{`Date Of Trip: ${moment(dateOfTrip).format(
              'L',
            )}`}</Paragraph>
            <Paragraph>{`Status: ${status}`}</Paragraph>
            <Paragraph>
              {description !== '' && `Description: ${description}`}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => navigation.goBack()}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <SafeAreaView style={styles.CreateTrip}>
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
  CreateTrip: {
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

export default CreateTrip;
