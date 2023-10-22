import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, Text, Alert } from 'react-native';
import axios from 'axios';
import Button from '../../components/Button';
import TextInputLabel from '../../components/TextInputLabel';
import TextInputMaskLabel from '../../components/TextInputMaskLabel';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

const EditContato = ({ navigation, route }) => {

    const [id, setId] = useState();
    const [nome, setNome] = useState('');
    const [alertNome, setAlertNome] = useState('');
    const [email, setEmail] = useState('');
    const [alertEmail, setAlertEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [alertTelefone, setAlertTelefone] = useState('');
    const [messageError, setMessageError] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const labelBotao = "Alterar";
    const [labelButton, setLabelButton] = useState(labelBotao);
    const [loading, setLoading] = useState(false);

    const maskTelefone = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    const resetMessages = async () => {
        setAlertNome('');
        setAlertEmail('');
        setAlertTelefone('');
        setMessageError('');
    };

    useEffect(() => {
        onLoadContato(route.params.id);
    }, []);

    const onLoadContato = async (id) => {
        if (id === undefined) return;
        console.log("Carregando Edit ...");
        setLoading(true);

        const url = 'https://automacao.daciosoftware.com.br/api/usuarios/' + id + '/find';
        await axios.get(url)
            .then((response) => {
                if (response.status == 200) {
                    setId(response.data.id);
                    setNome(response.data.nome);
                    setEmail(response.data.email);
                    setTelefone(response.data.telefone);
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

        resetMessages();
        setDisabledButton(true);
        setLabelButton("Aguarde...");
        setLoading(true);

        const url = 'https://automacao.daciosoftware.com.br/api/Contatos/' + id + '/update';
        let data = {
            'nome': nome,
            'email': email,
            'telefone': telefone
        };

        await axios.put(url, data)
            .then((response) => {
                if (response.status == 204) {
                    navigation.navigate('ListContato', { message: "Registro alterado com sucesso" });
                }
            })
            .catch((error) => {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert('Error: Ver conexão com a Internet');
                    dispatch({ type: RELOAD });
                }
                if (error.response.data.errors !== undefined) {

                    if (error.response.data.errors.nome != undefined) {
                        setAlertNome(error.response.data.errors.nome);
                    }

                    if (error.response.data.errors.email != undefined) {
                        setAlertEmail(error.response.data.errors.email);
                    }

                    if (error.response.data.errors.email != undefined) {
                        setAlertTelefone(error.response.data.errors.telefone);
                    }

                } else {
                    setMessageError('Error ao alterar registro: ' + error.message);
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

            <Header title="Editar Contato" navigation={navigation} />

            <ScrollView style={{ padding: 16 }}>

                <TextInputLabel label="Nome" autoCapitalize="words" onChangeText={text => setNome(text)} alert={alertNome} value={nome} />

                <TextInputLabel label="Email" keyboardType="email-address" autoCapitalize='none' autoCorrect={false} onChangeText={text => setEmail(text)} alert={alertEmail} value={email} />

                <TextInputMaskLabel label="Telefone" mask={maskTelefone} keyboardType="phone-pad" onChangeText={setTelefone} alert={alertTelefone} value={telefone} />

                <View style={styles.bottomPosition}>
                    <Button label={labelButton} onPress={onUpdate} disabled={disabledButton} />
                </View>

                <Text style={styles.messageError}>{messageError}</Text>

                <Loading loading={loading} />

            </ScrollView>

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

export default EditContato;
