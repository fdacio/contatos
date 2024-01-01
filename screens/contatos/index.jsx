import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
import FormSearchContatos from './search';

const ListContatos = ({ navigation, route }) => {
    
    const [contatos, setContatos] = useState([]);
    const [isFreshing, setIsFreshing] = useState(false);
    const [message, setMessage] = useState();
    const [visibleSearch, setVisibleSearch] = useState(false);


    const onLoadList = async (nome, grupo) => {
        console.log("Carregando Lista...");
        setIsFreshing(true);
        let nomeSearch = (nome != '') ? `nome=${nome}` : '';
        let grupoSearch = (grupo != undefined && grupo.id != undefined) ? `&grupo=${grupo.id}` : '';
        const url = `https://contatos.daciosoftware.com.br/api/contatos/?${nomeSearch}${grupoSearch}`;
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

    const onFormSearchVisible = () => {
        setVisibleSearch(!visibleSearch);
    }

    useEffect(() => {
        onLoadList();
        setMessage(route?.params?.message);
        setVisibleSearch(false);
    }, [route]);


    return (

        <SafeAreaView style={styles.container}>

            <Header title="Contatos" navigation={navigation} buttonsAction={
                <View style={styles.buttonAction}>
                    <Button onPress={() => navigation.navigate('CreateContato')}
                        icon={
                            <Icon
                                name="plus"
                                size={20}
                                color="#fff" />
                        }
                        type="clear"
                    />
                    <Button onPress={() => onFormSearchVisible()}
                        icon={
                            <Icon
                                name="search"
                                size={20}
                                color="#fff" />
                        }
                        type="clear"
                    />
                </View>
            }>
            </Header>
            
            <FormSearchContatos visibleSearch={visibleSearch} onSearch={onLoadList} />

            <Message message={message} visible={(message !== undefined)} navigation={navigation} />

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