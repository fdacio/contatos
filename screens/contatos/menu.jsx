import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListContatos from './index';
import DeleteContato from './delete';
import EditContato from './edit';
import CreateContato from './create';

const Stack = createStackNavigator();

const MenuContatos = () => {

    return (
        <Stack.Navigator initialRouteName="ListContatos" >
            <Stack.Screen name="ListContatos" component={ListContatos} options={{title: 'Contatos', headerShown: false }} />
            <Stack.Screen name="DeleteContato" component={DeleteContato} options={{ title: 'Deletar Contato', headerShown: false }} />
            <Stack.Screen name="CreateContato" component={CreateContato} options={{ title: 'Cadastrar Contato', headerShown: false  }} />
            <Stack.Screen name="EditContato" component={EditContato} options={{ title: 'Editar Contato', headerShown: false }} />
        </Stack.Navigator>
    )
}

export default MenuContatos;