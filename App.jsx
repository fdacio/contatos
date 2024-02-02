import React, { useEffect } from 'react';
import { StatusBar, BackHandler, Alert, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerMenu from './screens/DrawerMenu';


const App = () => {

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
            <DrawerMenu />
        </NavigationContainer>
    )
}

export default App;
