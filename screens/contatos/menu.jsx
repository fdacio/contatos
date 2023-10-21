import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import ListUsuario from './index';
import DeleteUsuario from './delete';
import EditUsuario from './edit';
import CreateUsuario from './create';

const Stack = createStackNavigator();

const MenuUsuario = ({ navigation }) => {

    return (
        <Stack.Navigator initialRouteName="ListUsuario" >
            <Stack.Screen name="ListUsuario" component={ListUsuario} options={{title: 'Usuários', headerShown: false }} />
            <Stack.Screen name="DeleteUsuario" component={DeleteUsuario} options={{ title: 'Deletar Usuário', headerShown: false }} />
            <Stack.Screen name="CreateUsuario" component={CreateUsuario} options={{ title: 'Cadastrar Usuário', headerShown: false  }} />
            <Stack.Screen name="EditUsuario" component={EditUsuario} options={{ title: 'Editar Usuário', headerShown: false }} />
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({

    btnAdd: {
        marginRight: 32
    },
    textBtnAdd: {
        color: '#000',
        fontSize: 36,
        fontWeight: 'bold'
    }
});

export default MenuUsuario;