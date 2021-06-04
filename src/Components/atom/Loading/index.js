import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const Loading = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
      <ActivityIndicator animating={true} color="blue" size="large" />
      <Text style={{fontSize: moderateScale(14, 0.5)}}>Please wait ...</Text>
    </View>
  );
};

export default Loading;