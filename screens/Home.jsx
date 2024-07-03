import React, { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { StyleSheet, SafeAreaView, TouchableOpacity, View, Image, Text } from 'react-native';
import Header from '../components/Header';
import Logo from '../assets/home.png'
import { useNavigation } from '@react-navigation/native';


const Home = () => {

    const navigation = useNavigation();

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
        <SafeAreaView style={styles.container}>

            <Header title="Meus Contatos" buttonBack={false} buttonMenu={true} componentsRight={[
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{ color: "white" }}>Login</Text>
                </TouchableOpacity>
            ]} />

            <View style={styles.contentImageHome}>
                <TouchableOpacity style={styles.touchableImageHome}
                    onPress={() => navigation.navigate('Contatos')} >
                    <Image source={Logo} style={styles.imageHome}></Image>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    contentImageHome: {
        justifyContent: 'center',
        flex: 1
    },

    touchableImageHome: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 500,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageHome: {
        height: 300,
        width: 300,
    }

});

export default Home;