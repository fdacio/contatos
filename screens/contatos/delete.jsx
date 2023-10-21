import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Alert } from 'react-native';
import axios from 'axios';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

const DeleteUsuario = ({ navigation, route }) => {

    const [usuario, setUsuario] = useState([]);
    const [messageError, setMessageError] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const labelBotao = "Deletar";
    const [labelButton, setLabelButton] = useState(labelBotao);
    const [loading, setLoading] = useState(false);

    const resetMessages = async () => {
        setMessageError('');
    };

    useEffect(() => {
        onLoadUsuario(route.params.id);
    }, []);

    const onLoadUsuario = async (id) => {
        if (id === undefined) return;
        console.log("Carregando Delete ...");
        setLoading(true);

        const url = 'https://automacao.daciosoftware.com.br/api/usuarios/' + id + '/find';
        await axios.get(url)
            .then((response) => {
                if (response.status == 200) {
                    setUsuario(response.data);
                }
            })
            .catch(function (error) {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert('Error: Ver conexão com a Internet');
                    dispatch({ type: RELOAD });
                }   
            }).finally(() => {
                setLoading(false);
            });
    }

    const onDelete = async () => {

        resetMessages();
        setDisabledButton(true);
        setLabelButton("Aguarde...");
        setLoading(true);

        const url = 'https://automacao.daciosoftware.com.br/api/usuarios/' + usuario.id + '/destroy';

        await axios.delete(url)
            .then((response) => {
                if (response.status == 204) {
                    navigation.navigate('ListUsuario', { message: 'Registro excluído com sucesso.' });
                }
            })
            .catch((error) => {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert('Error: Ver conexão com a Internet');
                    dispatch({ type: RELOAD });
                } else {
                    setMessageError('Error ao excluir o registro: ' + error.message);
                }
            })
            .finally(function () {
                setDisabledButton(false);
                setLabelButton(labelBotao);
                setLoading(false);
            });

    }

    return (

        <SafeAreaView style={styles.container}>

            <Header title="Deletar Usuário" navigation={navigation} />

            <View style={{ padding: 16 }} >

                <View style={styles.contentDados}>
                    <Text style={styles.itemName}>{usuario.nome}</Text>
                    <Text style={styles.itemEmail}>{usuario.email}</Text>
                    <Text style={styles.itemTelefone}>{usuario.telefone}</Text>
                </View>

                <View style={styles.bottomPosition}>
                    <Button label={labelButton} onPress={onDelete} disabled={disabledButton} style={styles.buttonDelete} />
                </View>

                <Text style={styles.messageError}>{messageError}</Text>

                <Loading loading={loading} />

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    
    contentDados: {
        padding: 4,
        borderWidth: 1,
        borderRadius: 8,
    },

    itemName: {
        fontSize: 18,
        height: 35,
        fontWeight: 'bold'
    },

    itemEmail: {
        fontSize: 16,
        height: 25
    },

    itemTelefone: {
        fontSize: 16,
        height: 25
    },

    bottomPosition: {
        marginTop: 16,
    },

    buttonDelete: {
        width: '100%',
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },

    messageSuccess: {
        fontSize: 14,
        color: 'green',
        alignContent: 'center'
    },

    messageError: {
        fontSize: 14,
        color: 'red',
        alignContent: 'center'
    }
});

export default DeleteUsuario;