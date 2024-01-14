import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, Text, Alert } from 'react-native';
import axios from 'axios';
import Button from '../../components/Button';
import TextInputLabel from '../../components/TextInputLabel';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Message from '../../components/Message';

const EditGrupo = ({ navigation, route }) => {

    const [id, setId] = useState();
    const [nome, setNome] = useState('');
    const [alertNome, setAlertNome] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const labelBotao = "Alterar";
    const [labelButton, setLabelButton] = useState(labelBotao);
    const [loading, setLoading] = useState(false);

    const resetMessages = async () => {
        setAlertNome('');
        setMessageError('');
    };

    useEffect(() => {
        onLoadGrupo(route.params.id);
    }, []);

    const onLoadGrupo = async (id) => {
        if (id === undefined) return;
        console.log("Carregando Edit ...");
        setLoading(true);

        const url = 'https://contatos.daciosoftware.com.br/api/grupos/' + id;
        await axios.get(url)
            .then((response) => {
                if (response.status == 200) {
                    setId(response.data.id);
                    setNome(response.data.nome);
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

    const onUpdate = async () => {

        resetMessages('');
        setDisabledButton(true);
        setLabelButton("Aguarde...");
        setLoading(true);

        const url = 'https://contatos.daciosoftware.com.br/api/grupos/' + id;
        let data = {
            'nome': nome
        };

        await axios.put(url, data)
            .then((response) => {
                if (response.status == 200) {
                    setMessageSuccess("Registro alterado com sucesso");
                    const toRef = setTimeout(() => {
                        navigation.goBack();
                        clearTimeout(toRef);
                    }, 3000);
                }
            })
            .catch((error) => {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert('Error: Ver conexão com a Internet');
                    dispatch({ type: RELOAD });
                }
                if (error.response.data !== undefined) {

                    if (error.response.data.nome != undefined) {
                        setAlertNome(error.response.data.nome);
                    }

                } else {
                    setMessageError('Error ao criar registro: ' + error.response.data.error);
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

            <Header title="Cadastrar Grupo" navigation={navigation} />

            <Message message={messageSuccess} ></Message>

            <View style={{ padding: 16 }} >

                <TextInputLabel label="Nome" autoCapitalize="words" onChangeText={text => setNome(text)} alert={alertNome} value={nome} />

                <View style={styles.bottomPosition}>
                    <Button label={labelButton} onPress={onUpdate} disabled={disabledButton} />
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

    bottomPosition: {
        marginTop: 16,
    },

    messageError: {
        fontSize: 14,
        color: 'red',
        alignContent: 'center'
    }
});

export default EditGrupo;