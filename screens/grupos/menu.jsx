import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListGrupos from './index';
import DeleteGrupo from './delete';
import EditGrupo from './edit';
import CreateGrupo from './create';

const Stack = createStackNavigator();

const MenuGrupos = () => {

    return (
        <Stack.Navigator initialRouteName="ListGrupo" >
            <Stack.Screen name="ListGrupos" component={ListGrupos} options={{title: 'Grupos', headerShown: false }} />
            <Stack.Screen name="DeleteGrupo" component={DeleteGrupo} options={{ title: 'Deletar Grupo', headerShown: false }} />
            <Stack.Screen name="CreateGrupo" component={CreateGrupo} options={{ title: 'Cadastrar Grupo', headerShown: false  }} />
            <Stack.Screen name="EditGrupo" component={EditGrupo} options={{ title: 'Editar Grupo', headerShown: false }} />
        </Stack.Navigator>
    )
}

export default MenuGrupos;
