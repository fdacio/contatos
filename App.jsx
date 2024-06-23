import React, { useEffect } from 'react';
import { StatusBar, BackHandler, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenu from './screens/DrawerMenu';
import Login from './screens/login';


const Stack = createStackNavigator();

const App = ({ navigation }) => {

    useEffect(() => {
        const backAction = () => {


            Alert.alert("Contatos", "Deseja sair da aplicação?", [
                {
                    text: "Não",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Sim", onPress: () => BackHandler.exitApp() }
            ]);

            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();

    }, []);

    return (
        
        <NavigationContainer>
            <StatusBar backgroundColor='#a37522' />            
            <Stack.Navigator>
                <Stack.Screen name="DrawerMenu" component={DrawerMenu} options={{headerShown: false }}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
