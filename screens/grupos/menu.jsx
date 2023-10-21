import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import ListGrupos from './index';
import DeleteGrupo from './delete';
import EditGrupo from './edit';
import CreateGrupo from './create';

const Stack = createStackNavigator();

const MenuGrupos = ({ navigation }) => {

    return (
        <Stack.Navigator initialRouteName="ListGrupo" >
            <Stack.Screen name="ListGrupos" component={ListGrupos} options={{title: 'Grupos', headerShown: false }} />
            <Stack.Screen name="DeleteGrupo" component={DeleteGrupo} options={{ title: 'Deletar Grupo', headerShown: false }} />
            <Stack.Screen name="CreateGrupo" component={CreateGrupo} options={{ title: 'Cadastrar Grupo', headerShown: false  }} />
            <Stack.Screen name="EditGrupo" component={EditGrupo} options={{ title: 'Editar Grupo', headerShown: false }} />
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

export default MenuGrupos;