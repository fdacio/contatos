import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, Text, ImageBackground, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Banner from '../assets/users.png';

import Home from './Home';
import Contatos from './contatos';
import Grupos from './grupos';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Banner} style={styles.imageBanner} />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem {...props}
                    label="Sair"
                    onPress={() => {
                        BackHandler.exitApp();
                        return true;
                    }
                    }
                    style={{ borderTopWidth: 1 }}
                    labelStyle={styles.drawerItemStyle}
                    icon={() => <Icon name="sign-out" size={20} color="#000" width={20} />}
                />
            </DrawerContentScrollView>
            <Text
                style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#696969'
                }}>
                www.daciosoftware.com.br
            </Text>
        </SafeAreaView>
    )
}

const DrawerMenu = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#fff',
                    marginTop: 56
                },
                drawerLabelStyle: {
                    fontSize: 20,
                    color: "#000"
                },
            }}

            drawerContent={(props) => <CustomDrawer {...props} />}>

            <Drawer.Screen name="Home" component={Home} options={{ title: 'Home', headerShown: false, drawerIcon: (() => <Icon name="home" size={20} color="#000" width={20} />) }} />
            <Drawer.Screen name="Contatos" component={Contatos} options={{ title: 'Contatos', headerShown: false, drawerIcon: (() => <Icon name="users" size={20} color="#000" width={20} />) }} />
            <Drawer.Screen name="Grupos" component={Grupos} options={{ title: 'Grupos', headerShown: false, drawerIcon: (() => <Icon name="users" size={20} color="#000" width={20} />) }} />

        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({

    imageBanner: {
        width: 'auto',
        height: 120,
        marginTop: 4
    },

    drawerScreenItemStyle: {
        fontSize: 20,
        color: "#000"
    },

    drawerItemStyle: {
        fontSize: 20,
        color: "#080"
    }

});


export default DrawerMenu;