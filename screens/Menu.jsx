import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenu from './DrawerMenu';

const Stack = createStackNavigator();

const Menu = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="DrawerMenu">
                <Stack.Screen
                    name="DrawerMenu"
                    component={DrawerMenu}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
export default Menu;