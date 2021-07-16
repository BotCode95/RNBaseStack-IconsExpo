import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { HomeScreen } from '../Screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

export const Navigation = () => {
    const Stack = createStackNavigator();
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}



    