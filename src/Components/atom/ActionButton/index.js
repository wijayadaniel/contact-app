import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';

const ActionButton = ({buttonText, customStyles, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, customStyles]}>
      <Text style={{color: 'white', textAlign: 'center'}}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: scale(4),
    backgroundColor: '#0f6ab4',
    paddingHorizontal: scale(20),
    justifyContent: 'center',
    paddingVertical: scale(4),
  },
});

export default ActionButton;
