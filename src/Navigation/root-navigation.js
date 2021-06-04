import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import Contact from '../Pages/Contact';
import ContactDetail from '../Pages/Contact/detail';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ContactList">
          <Stack.Screen
            name="ContactList"
            component={Contact}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ContactDetail"
            component={ContactDetail}
            options={({route}) => ({title: route.params.headerTitle})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default RootNavigation;
