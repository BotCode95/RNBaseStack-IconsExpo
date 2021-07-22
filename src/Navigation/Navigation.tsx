import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react'
import { HomeScreen } from '../Screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { LoginScreen } from '../Screens/LoginScreen';
import { RegisterScreen } from '../Screens/RegisterScreen';
import { ProtectedScreen } from '../Screens/ProtectedScreen';
import { LoadingScreen } from '../Screens/LoadingScreen';
import { ProductsNavigator } from './ProductsNavigator';

const Stack = createStackNavigator();
export const Navigation = () => {

    const {status} = useContext(AuthContext)

    if(status === 'checking') return <LoadingScreen/>
    return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white'
          }
        }}
      >
        {
          (status !== 'authenticated')
           ? (
             <>
             <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
             </>
           )
           : (
             <>

              <Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
              <Stack.Screen name="Protected" component={ProtectedScreen} />
             </>
           )
        }
      </Stack.Navigator>
    </NavigationContainer>
    )
}



    