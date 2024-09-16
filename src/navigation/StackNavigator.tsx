import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NoteScreen from '../screens/NoteScreen';
import SavedNoteScreen from '../screens/SavedNoteScreen';

export type RootStackParamList = {
  Home: undefined;
  Note: undefined;
  SavedNote: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Note" component={NoteScreen} />
        <Stack.Screen name="SavedNote" component={SavedNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
