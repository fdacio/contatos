import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Alert } from 'react-native';
import axios from 'axios';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Message from '../../components/Message';

const DeleteContato= ({ navigation, route }) => {

    const [contato, setContato] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const labelBotao = "Deletar";
    const [labelButton, setLabelButton] = useState(labelBotao);
    const [loading, setLoading] = useState(false);

    const resetMessages = async () => {
        setMessageError('');
    };

    useEffect(() => {
        onLoadContatos(route.params.id);
    }, []);

    const onLoadContatos = async (id) => {
        if (id === undefined) return;
        console.log("Carregando Delete ...");
        setLoading(true);

        const url = 'https://contatos.daciosoftware.com.br/api/contatos/' + id;
        await axios.get(url)
            .then((response) => {
                if (response.status == 200) {
                    setContato(response.data);
                }
            })
            .catch(function (error) {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert("Erro", "Ver conexão com a internet");
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

        const url = 'https://contatos.daciosoftware.com.br/api/contatos/' + contato.id;

        await axios.delete(url)
            .then((response) => {
                if (response.status == 204) {
                    setMessageSuccess("Registro excluído com succeso");
                    const toRef = setTimeout(() => {
                        navigation.goBack();
                        clearTimeout(toRef);
                    }, 3000);
                }
            })
            .catch((error) => {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert("Erro", "Ver conexão com a internet");
                    dispatch({ type: RELOAD });
                } else {
                    setMessageError('Erro ao excluir o registro: ' + error.response.data.error);
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

            <Header title="Deletar Contato" navigation={navigation} />

            <Message message={messageSuccess} ></Message>

            <View style={{ padding: 16 }} >

                <View style={styles.contentDados}>
                    <Text style={styles.itemName}>{contato.nome}</Text>
                    <Text style={styles.itemEmail}>{contato.email}</Text>
                    <Text style={styles.itemTelefone}>{contato.telefone}</Text>
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
        padding: 8,
        borderWidth: 1,
        borderRadius: 4,
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
        borderRadius: 4
    },

    messageError: {
        fontSize: 14,
        color: 'red',
        alignContent: 'center'
    }
});

export default DeleteContato;