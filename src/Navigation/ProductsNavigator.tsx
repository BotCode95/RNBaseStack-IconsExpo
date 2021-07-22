import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import { ProductScreen } from '../Screens/ProductScreen';
import { ProductsScreen } from '../Screens/ProductsScreen';

export type ProductsStackParams = {
    ProductsScreen: undefined,
    ProductScreen : {id? : string, name?: string}
}


const Stack = createStackNavigator();
export const ProductsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'white'
                },
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                }
            }}
        >
            <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{title: 'Productos'}}/>
            <Stack.Screen name="ProductScreen" component={ProductScreen}/>
        </Stack.Navigator>
    )
}
