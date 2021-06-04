import React from 'react';
import {StatusBar, StyleSheet, Platform, View} from 'react-native';
import RootNavigation from './src/Navigation/root-navigation';

const App = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'android' ? (
        <StatusBar backgroundColor={'#281C50'} />
      ) : null}
      <RootNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
