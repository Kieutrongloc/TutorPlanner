import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { ColorPicker } from 'react-native-color-picker';

const AddSchedulePopup: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
  const [isStartTimePickerVisible, setStartTimePickerVisible] = React.useState(false);
  const [isDurationPickerVisible, setDurationPickerVisible] = React.useState(false);
  const [startTime, setStartTime] = React.useState(new Date());
  const [durationHours, setDurationHours] = React.useState(1);
  const [durationMinutes, setDurationMinutes] = React.useState(0);
  const [studentName, setStudentName] = React.useState('');
  const [studentAddress, setStudentAddress] = React.useState('');
  const [repeatType, setRepeatType] = React.useState('Once');
  const [note, setNote] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('#FF5733');

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.9; // 90% of the screen width

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const handleStartTimeChange = (event: Event, selectedTime: Date | undefined) => {
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const showDurationPicker = () => {
    setDurationPickerVisible(true);
  };

  const hideDurationPicker = () => {
    setDurationPickerVisible(false);
  };

  const handleDurationChange = (event: Event, selectedTime: Date | undefined) => {
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      setDurationHours(hours);
      setDurationMinutes(minutes);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text>Add New Schedule</Text>
          <TouchableOpacity onPress={showStartTimePicker}>
            <Text>Select Start Time</Text>
          </TouchableOpacity>
          {isStartTimePickerVisible && (
            <DateTimePicker
              value={startTime}
              mode="time"
              // onChange={handleStartTimeChange}
            />
          )}
          <TouchableOpacity onPress={showDurationPicker}>
            <Text>Select Duration</Text>
          </TouchableOpacity>
          {isDurationPickerVisible && (
            <DateTimePicker
              value={new Date(0, 0, 0, durationHours, durationMinutes)}
              mode="countdown"
              // onChange={handleDurationChange}
            />
          )}
          {/* ... other inputs and pickers */}
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '90%',
    height: '68%',
  },
});

export default AddSchedulePopup;
