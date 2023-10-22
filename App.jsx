import React from 'react';
import { StatusBar, StyleSheet, Text, ImageBackground, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './screens/Home';
import MenuContatos from './screens/contatos/menu';
import MenuGrupos from './screens/grupos/menu';

import Banner from './assets/users.png';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();


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
                    color: "#009"
                },
            }}

            drawerContent={(props) => <CustomDrawer {...props} />}>

            <Drawer.Screen name="Home" component={Home} options={{ title: 'Home', headerShown: false, drawerIcon: (() => <Icon name="home" size={32} color="#009" width={32} />) }} />
            <Drawer.Screen name="MenuContatos" component={MenuContatos} options={{ title: 'Contatos', headerShown: false, drawerIcon: (() => <Icon name="users" size={32} color="#009" width={32} />) }} />
            <Drawer.Screen name="MenuGrupos" component={MenuGrupos} options={{ title: 'Grupos', headerShown: false, drawerIcon: (() => <Icon name="users" size={32} color="#009" width={32} />) }} />

        </Drawer.Navigator>
    );
}
const CustomDrawer = (props) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Banner} style={{ height: 120 }} />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem {...props}
                    label="Sair"
                    onPress={() => { BackHandler.exitApp(); }
                    }
                    style={{ borderTopWidth: 1 }}
                    labelStyle={styles.drawerItemStyle}
                    icon={() => <Icon name="sign-out" size={32} color="#009" width={34}/>}
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


const App = () => {
    return (
        <NavigationContainer >
            <StatusBar backgroundColor='#009' />
            <DrawerMenu />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({

    imageBanner: {
        width: 'auto',
        height: 200,
    },

    drawerScreenItemStyle: {
        fontSize: 20,
        color: "#080"
    },

    drawerItemStyle: {
        fontSize: 20,
        color: "#080"
    }

});


export default App;