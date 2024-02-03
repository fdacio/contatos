import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import Header from '../../components/Header';
import axios from 'axios';
import Button from '../../components/Button';
import TextInputLabel from '../../components/TextInputLabel';
import Loading from '../../components/Loading';
import Message from '../../components/Message';

const CreateGrupo = ({ navigation }) => {

    const [nome, setNome] = useState('');
    const [alertNome, setAlertNome] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const labelBotao = "Salvar";
    const [labelButton, setLabelButton] = useState(labelBotao);
    const [loading, setLoading] = useState(false);

    const resetMessages = async () => {
        setAlertNome('');
        setMessageError('');
    };

    const onCreate = async () => {

        resetMessages('');
        setDisabledButton(true);
        setLabelButton("Aguarde...");
        setLoading(true);

        const url = 'https://contatos.daciosoftware.com.br/api/grupos';
        let data = {
            'nome': nome
        };

        await axios.post(url, data)
            .then((response) => {
                if (response.status == 201) {
                    setMessageSuccess("Registro cadastrado com sucesso");
                    const toRef = setTimeout(() => {
                        navigation.goBack();
                        clearTimeout(toRef);
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert("Erro", "Ver conexão com a internet");
                    dispatch({ type: RELOAD });
                }
                if (error.response.data !== undefined) {
                    if (error.response.data.nome != undefined) {
                        setAlertNome(error.response.data.nome);
                    }
                } else {
                    setMessageError('Erro ao criar registro: ' + error.response.data.error);
                }
            })
            .finally(function () {
                //setDisabledButton(false);
                //setLabelButton(labelBotao);
                //setLoading(false);
            });

    }


    return (
        <SafeAreaView style={styles.container}>

            <Header title="Cadastrar Grupo" navigation={navigation} buttonBack={true} />

            <Message message={messageSuccess} ></Message>

            <View style={{ padding: 16 }} >

                <TextInputLabel label="Nome" autoCapitalize="words" onChangeText={text => setNome(text)} alert={alertNome} value={nome} />

                <View style={styles.bottomPosition}>
                    <Button label={labelButton} onPress={onCreate} disabled={disabledButton} />
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

export default CreateGrupo;