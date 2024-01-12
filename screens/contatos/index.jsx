import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

import FormSearchContatos from './search';

const ListContatos = ({ navigation, route }) => {

    const [contatos, setContatos] = useState([]);
    const [isFreshing, setIsFreshing] = useState(false);
    const [formSearch, setFormSearch] = useState();
    const [visibleFormSearch, setVisibleFormSearch] = useState(false);

    let nomeSearch;
    let grupoSearch;

    const onLoadList = async () => {
        console.log("Carregando Lista...");
        console.log("Nome Search: " + nomeSearch);
        setIsFreshing(true);
        let nome = (nomeSearch != undefined) ? `nome=${nomeSearch}` : '';
        let grupo = (grupoSearch != undefined && grupoSearch.id != undefined) ? `&grupo=${grupoSearch.id}` : '';
        const url = `https://contatos.daciosoftware.com.br/api/contatos/?${nome}${grupo}`;
        console.log(url);
        await axios.get(url)
            .then((response) => {
                if (response.status == 200) {
                    setContatos((response.data));
                }

            }).catch((error) => {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert('Error: Ver conexão com a Internet');
                    dispatch({ type: RELOAD });
                }
            }).finally(() => {
                setIsFreshing(false);
            });
    }

    const onSetNome = (nome) => {
        console.log("Nome no Index: " + nome);
        nomeSearch = nome;
    }

    const onFormSearch = () => {
        if (!visibleFormSearch) {
            setFormSearch(<FormSearchContatos onSearch={onLoadList} onSetNome={onSetNome} />);
        } else {
            setFormSearch();
        }
        setVisibleFormSearch(!visibleFormSearch);
    }

    useEffect(() => {
        onLoadList();
        console.log("useEffect");
    }, []);

    return (

        <SafeAreaView style={styles.container}>

            <Header title="Contatos" navigation={navigation} buttonsAction={[

                <Button onPress={() => navigation.navigate('CreateContato')}
                    icon={
                        <Icon
                            name="plus"
                            size={20}
                            color="#fff" />
                    }
                    type="clear"
                    key="0"
                />,
                <Button onPress={() => onFormSearch()}
                    icon={
                        <Icon
                            name="search"
                            size={20}
                            color="#fff" />
                    }
                    type="clear"
                    key="1"
                />
            ]
            }>
            </Header>

            {formSearch}

            <FlatList style={{ padding: 16 }}
                data={contatos}
                refreshing={isFreshing}
                onEndReached={onLoadList}
                onEndReachedThreshold={0.5}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <View style={styles.itemContent}>
                        <View>
                            <Text style={styles.itemName}>{item.nome}</Text>
                            <Text style={styles.itemEmail}>{item.email}</Text>
                            <Text style={styles.itemTelefone}>{item.telefone}</Text>
                            <Text style={styles.itemTelefone}>{item.grupo.nome}</Text>
                        </View>
                        <View style={styles.groupButton} >
                            <TouchableOpacity onPress={() => navigation.navigate('DeleteContato', { id: item.id })} style={styles.actionButton}>
                                <Icon
                                    name="trash"
                                    size={32}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('EditContato', { id: item.id })} style={styles.actionButton}>
                                <Icon
                                    name="edit"
                                    size={32}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                }
            />

            <Loading loading={isFreshing} />

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    buttonAction: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },


    itemName: {
        fontSize: 18,
        height: 35,
        fontWeight: 'bold',
    },

    itemEmail: {
        fontSize: 16,
        height: 25
    },

    itemTelefone: {
        fontSize: 16,
        height: 25
    },

    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 16,
        flexWrap: 'wrap'
    },

    groupButton: {
        flexDirection: 'row',
    },

    actionButton: {
        marginLeft: 10
    }

});

export default ListContatos;