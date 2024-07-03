import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenu from './DrawerMenu';

import Login from './login'
import ListContatos from './contatos'
import DeleteContato from './contatos/delete'
import CreateContato from './contatos/create'
import EditContato from './contatos/edit'

import ListGrupos from './grupos'
import DeleteGrupo from './grupos/delete'
import CreateGrupo from './grupos/create'
import EditGrupo from './grupos/edit'

const Stack = createStackNavigator();

const Rotas = () => {
  
    return (

        <Stack.Navigator initialRouteName="DrawerMenu">

            <Stack.Screen name="DrawerMenu" component={DrawerMenu} options={{ headerShown: false }} />

            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

            <Stack.Screen name="ListContatos" component={ListContatos} options={{ title: 'Contatos', headerShown: false }} />
            <Stack.Screen name="DeleteContato" component={DeleteContato} options={{ title: 'Deletar Contato', headerShown: false }} />
            <Stack.Screen name="CreateContato" component={CreateContato} options={{ title: 'Cadastrar Contato', headerShown: false }} />
            <Stack.Screen name="EditContato" component={EditContato} options={{ title: 'Editar Contato', headerShown: false }} />

            <Stack.Screen name="ListGrupos" component={ListGrupos} options={{ title: 'Grupos', headerShown: false }} />
            <Stack.Screen name="DeleteGrupo" component={DeleteGrupo} options={{ title: 'Deletar Grupo', headerShown: false }} />
            <Stack.Screen name="CreateGrupo" component={CreateGrupo} options={{ title: 'Cadastrar Grupo', headerShown: false }} />
            <Stack.Screen name="EditGrupo" component={EditGrupo} options={{ title: 'Editar Grupo', headerShown: false }} />

        </Stack.Navigator>

    )
}
export default Rotas;
