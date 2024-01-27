import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import Header from '../components/Header';
import Logo from '../assets/home.png'

const Home = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>

            <Header title="Meus Contatos" navigation={navigation} buttonBack={false} buttonMenu={true} />

            <View style={styles.contentImageHome}>
                <TouchableOpacity style={styles.touchableImageHome}
                    onPress={() => navigation.navigate('MenuContatos')} >

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