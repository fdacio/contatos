import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Alert } from 'react-native';
import axios from 'axios';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Message from '../../components/Message';

const DeleteGrupo = ({ navigation, route }) => {

    const [grupo, setGrupo] = useState([]);
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
        onLoadGrupo(route.params.id);
    }, []);

    const onLoadGrupo= async (id) => {
        if (id === undefined) return;
        console.log("Carregando Delete ...");
        setLoading(true);

        const url = 'https://contatos.daciosoftware.com.br/api/grupos/' + id;
        await axios.get(url)
            .then((response) => {
                if (response.status == 200) {
                    setGrupo(response.data);
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

        const url = 'https://contatos.daciosoftware.com.br/api/grupos/' + grupo.id;

        await axios.delete(url)
            .then((response) => {
                if (response.status == 204) {
                    setMessageSuccess("Registro excluído com sucesso");
                    const toRef = setTimeout(() => {
                        navigation.goBack();
                        clearTimeout(toRef);
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log(error.response.data);
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
            
            <Header title="Deletar Grupo" navigation={navigation} buttonBack={true} />

            <Message message={messageSuccess} ></Message>
            
            <View style={{ padding: 16 }} >

                <View style={styles.contentDados}>
                    <Text style={styles.itemName}>{grupo.nome}</Text>
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

    messageError: {
        fontSize: 14,
        color: 'red',
        alignContent: 'center'
    }
});

export default DeleteGrupo;