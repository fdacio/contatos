import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Header from '../../components/Header';

const EditGrupo = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Cadastrar Grupo" navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default EditGrupo;