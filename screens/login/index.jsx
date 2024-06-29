import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from 'react-native';
import Header from '../../components/Header';
import axios from 'axios';
import Button from '../../components/Button';
import TextInputLabel from '../../components/TextInputLabel';
import TextAreaLabel from '../../components/TextAreaLabel';
import Loading from '../../components/Loading';


const Login = ({navigation}) => {

    const [login, setLogin] = useState('811235440116');
    const [senha, setSenha] = useState('123456');
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const labelBotao = "Entrar";
    const [labelButton, setLabelButton] = useState(labelBotao);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        setMessageError("");
        setMessageSuccess("");
        setDisabledButton(true);
        setLabelButton("Aguarde...");
        setLoading(true);

        const url = 'https://159.203.24.33:8883/siga/auth/usuario';
        let data = {
            'login': login,
            'senha': senha
        };
        let _headers = { 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        await axios.post(url, data, _headers)
            .then((response) => {
                if (response.status == 200) {
                    setMessageSuccess("Login OK: " + JSON.stringify(response.data, null, "\t"));
                    setLoading(false);
                }
            })
            .catch((error) => {
                setMessageError(JSON.stringify(error, null, "\t"));
            })
            .finally(function () {
                setDisabledButton(false);
                setLabelButton(labelBotao);
                setLoading(false);
            });

    }

    return (
        <SafeAreaView style={styles.container}>

            <Header title="Login" navigation={navigation} buttonBack={true}/>

            <View style={{ padding: 16 }} >

                <TextInputLabel label="Login" onChangeText={text => setLogin(text)} value={login} />
                <TextInputLabel label="Senha" onChangeText={text => setSenha(text)} value={senha} />

                <View style={styles.bottomPosition}>
                    <Button label={labelButton} onPress={onLogin} disabled={disabledButton} />
                </View>

                <Loading loading={loading} />
                {messageSuccess != ""  &&
                <Text style={styles.messageSuccess}>{messageSuccess}</Text>
                }
                {messageError != ""  &&
                <TextAreaLabel style={styles.messageError} value={messageError} numLines={10}/>
                }
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
    },
    messageSuccess: {
        fontSize: 14,
        color: '#rgb(36, 145, 3)',
        alignContent: 'center'
    }
});

export default Login;