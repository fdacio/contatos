import React from 'react';
import { StatusBar, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from './screens/Rotas';

const App = () => {

    return (
        
        <NavigationContainer>
            <StatusBar backgroundColor='#a37522' />            
            <Rotas />
        </NavigationContainer>
    )
}

export default App;
