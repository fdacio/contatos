import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, Text, Alert } from 'react-native';
import axios from 'axios';
import Button from '../../components/Button';
import TextInputLabel from '../../components/TextInputLabel';
import TextInputMaskLabel from '../../components/TextInputMaskLabel';
import SelectInputLabel from '../../components/SelectInputLabel';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Message from '../../components/Message';

const EditContato = ({ navigation, route }) => {

    const [id, setId] = useState();
    const [nome, setNome] = useState('');
    const [alertNome, setAlertNome] = useState('');
    const [email, setEmail] = useState('');
    const [alertEmail, setAlertEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [alertTelefone, setAlertTelefone] = useState('');
    const [grupo, setGrupo] = useState({});
    const [alertGrupo, setAlertGrupo] = useState('');
    const [grupos, setGrupos] = useState({})

    const [messageSuccess, setMessageSuccess] = useState('');
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
        setAlertGrupo('');
        setMessageError('');
        setMessageSuccess('');
    };

    useEffect(() => {
        console.log("useEffect Edit ...");
        onLoadGrupos();
        onLoadContato(route.params.id);
    }, []);

    const onLoadGrupos = async () => {
        const url = 'https://contatos.daciosoftware.com.br/api/grupos';
        await axios.get(url)
            .then((response) => {
                if (response.status == 200) {
                    setGrupos(response.data);
                }
            })
            .catch(function (error) {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert("Erro", "Ver conexão com a internet");
                    dispatch({ type: RELOAD });
                }
            });
    };

    const onLoadContato = async (id) => {
        if (id === undefined) return;
        setLoading(true);

        const url = 'https://contatos.daciosoftware.com.br/api/contatos/' + id;
        await axios.get(url)
            .then((response) => {
                if (response.status == 200) {
                    setId(response.data.id);
                    setNome(response.data.nome);
                    setEmail(response.data.email);
                    setTelefone(response.data.telefone);
                    setGrupo(response.data.grupo);
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

    const onUpdate = async () => {

        resetMessages();
        setDisabledButton(true);
        setLabelButton("Aguarde...");
        setLoading(true);

        const url = 'https://contatos.daciosoftware.com.br/api/contatos/' + id;
        let data = {
            'nome': nome,
            'email': email,
            'telefone': telefone,
            'id_grupo': grupo.id
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
                    Alert.alert("Erro", "Ver conexão com a internet");
                    dispatch({ type: RELOAD });
                }
                if (error.response.data !== undefined) {

                    if (error.response.data.nome != undefined) {
                        setAlertNome(error.response.data.nome);
                    }

                    if (error.response.data.email != undefined) {
                        setAlertEmail(error.response.data.email);
                    }

                    if (error.response.data.telefone != undefined) {
                        setAlertTelefone(error.response.data.telefone);
                    }
                    if (error.response.data.id_grupo != undefined) {
                        setAlertGrupo(error.response.data.id_grupo);
                    }
                } else {
                    setMessageError('Erro ao criar registro: ' + error.response.data.error);
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

            <Message message={messageSuccess} />

            <ScrollView style={{ padding: 16 }}>

                <TextInputLabel label="Nome" autoCapitalize="words" onChangeText={text => setNome(text)} alert={alertNome} value={nome} />

                <TextInputLabel label="Email" keyboardType="email-address" autoCapitalize='none' autoCorrect={false} onChangeText={text => setEmail(text)} alert={alertEmail} value={email} />

                <TextInputMaskLabel label="Telefone" mask={maskTelefone} keyboardType="phone-pad" onChangeText={setTelefone} alert={alertTelefone} value={telefone} />

                <SelectInputLabel label="Grupo" title="Grupos" text={grupo.nome} value={grupo.id} dados={grupos} alert={alertGrupo} onSelectedItem={setGrupo}></SelectInputLabel>

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

    messageError: {
        fontSize: 14,
        color: 'red',
        alignContent: 'center'
    }
});

export default EditContato;
