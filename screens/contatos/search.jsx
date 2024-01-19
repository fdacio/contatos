import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import TextInputPlaceholder from '../../components/TextInputPlaceholder';
import SelectInputPlaceholder from '../../components/SelectInputPlaceholder';
import ButtonSearch from '../../components/Button';

const FormSearchContatos = (props) => {
    const [grupos, setGrupos] = useState();
    const [nome, setNome] = useState();
    const [grupo, setGrupo] = useState();
    const [params, setParams] = useState({});

    const onSetGrupoParam = (grupo) => {
        let dodos = {}
        if (grupo != undefined) {
            dodos = {
                "grupo" : grupo.id,
                "nome": nome
            };
        } else {
            dodos = {
                "grupo" : "",
                "nome": nome
            };
        }
        setGrupo(grupo);
        setParams(dodos);
    }

    const onSetNomeParam = (nome) => {
        setNome(nome);
        let dodos = {
            "grupo" : ((grupo != undefined) ? grupo.id : ""),
            "nome": nome
        };
        setParams(dodos);
    }

    const parseParams = (params) => {
        let p = "";
        p = (params.nome != undefined) ? '&nome=' + params.nome : '';
        p +=  (params.grupo != undefined) ? '&grupo=' + params.grupo : '';
        return p;
    }
    

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
                    Alert.alert('Error: Ver conexão com a Internet');
                    dispatch({ type: RELOAD });
                }
            });
    };

    useEffect(() => {
        onLoadGrupos();
    }, []);

    const onSearch = () => {
        props.onSearch(props.url+parseParams(params));
    }

    return (
        <View style={styles.containerSearch}>
            <TextInputPlaceholder placeholder="Nome" autoCapitalize="words" onChangeText={(text) => onSetNomeParam(text)} value={nome} />
            <SelectInputPlaceholder placeholder="Grupo" title="Grupos" text={(grupo != undefined) ? grupo.nome : ''} value={(grupo != undefined) ? grupo.id : ''} dados={grupos} onSelectedItem={onSetGrupoParam} />
            <ButtonSearch label="Pesquisar" onPress={() => onSearch()} />
        </View>
    );
}

const styles = StyleSheet.create({
    containerSearch: {
        padding: 16
    },

    containerSearchInvisible: {
        display: 'none',
    },

});

export default FormSearchContatos;