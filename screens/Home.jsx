import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderHome from '../components/HeaderHome';

const Home = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>

            <HeaderHome title="Meus Contatos" navigation={navigation} />
            <View style={styles.contentImageHome}>
                <TouchableOpacity style={styles.imageHome}
                    onPress={() => navigation.navigate('MenuUsuario')} >
                    <Icon
                        name="users"
                        size={200}
                        color="#ccc"

                    />
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
    
    imageHome: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 500,
        padding: 24,
        height: 300,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default Home;