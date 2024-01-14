import React, { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';

import FormSearchContatos from './search';

const ListContatos = ({ navigation }) => {

    const flatListRef = useRef()
    const [contatos, setContatos] = useState([]);
    const [totalRegistros, setTotalRegistros] = useState();
    const [isFreshing, setIsFreshing] = useState(false);
    const [formSearch, setFormSearch] = useState();
    const [visibleFormSearch, setVisibleFormSearch] = useState(false);
    const [urlPreviorPage, setUrlPreviorPage] = useState();
    const [urlDefault, setUrlDefaul] = useState();
    const [urlNextPage, setUrlNextPage] = useState();

    let nomeSearch;
    let grupoSearch;

    const onLoadList = async (url) => {
        if (isFreshing) return;
        setIsFreshing(true);
        let nome = (nomeSearch != undefined) ? `&nome=${nomeSearch}` : '';
        let grupo = (grupoSearch != undefined && grupoSearch.id != undefined) ? `&grupo=${grupoSearch.id}` : '';
        let uri = `${url}${nome}${grupo}`;
        console.log("uri:" + uri);
        await axios.get(uri)
            .then((response) => {
                if (response.status == 200) {
                    setContatos(response.data.data);
                    setTotalRegistros(response.data.total);
                    setUrlPreviorPage((response.data.prev_page_url != null) ? response.data.prev_page_url + '&size=' + response.data.per_page : uri);
                    setUrlNextPage((response.data.next_page_url) ? response.data.next_page_url + '&size=' + response.data.per_page : uri) 
                    setIsFreshing(false);
                    flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
                }

            }).catch((error) => {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert('Error: Ver conexão com a Internet');
                }
            }).finally(() => {
                setIsFreshing(false);
            });
    }

    const onSetNome = (nome) => {
        nomeSearch = nome;
    }

    const onSetGrupo = (grupo) => {
        grupoSearch = grupo;
    }

    const onFormSearch = () => {
        if (!visibleFormSearch) {
            setFormSearch(<FormSearchContatos onSearch={onLoadList} url={`https://contatos.daciosoftware.com.br/api/contatos/pageable/?`} onSetNome={onSetNome} onSetGrupo={onSetGrupo} />);
        } else {
            setFormSearch();
        }
        setVisibleFormSearch(!visibleFormSearch);
    }

    const onPreviorPage = () => {
        onLoadList(urlPreviorPage);
    }

    const onNextPage = () => {
        onLoadList(urlNextPage);
    }

    useEffect(() => {
        const size = 20;
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log("useEffect");
            onLoadList(`https://contatos.daciosoftware.com.br/api/contatos/pageable?page=1&size=${size}`);
        });
        return unsubscribe;
    }, [navigation]);

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
                ref={flatListRef}
                data={contatos}
                refreshing={isFreshing}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <View style={styles.itemContent}>
                        <View style={styles.itemContentRow}>
                            <Text style={styles.textItemName}>{item.nome}</Text>
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
                        <View>
                            <Text style={styles.textItem}>{item.email}</Text>
                            <Text style={styles.textItem}>{item.telefone}</Text>
                            <View style={styles.itemContentRow}>
                                <Text style={styles.textItem}>{item.grupo.nome}</Text>
                                <Text style={styles.textItemId}>{item.id}</Text>
                            </View>
                        </View>
                    </View>
                }
            />

            <Loading loading={isFreshing} />

            <Pagination totalRegistros={totalRegistros} actions={[
                {
                    'key': 'pp',
                    'action': onPreviorPage
                },
                {
                    'key': 'np',
                    'action': onNextPage
                }
            ]}></Pagination>

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

    itemContent: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 8,
    },
    
    itemContentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
    textItemName: {
        fontSize: 18,
        height: 35,
        fontWeight: 'bold',
    },
    
    textItem: {
        fontSize: 16,
        height: 25,
        flexWrap: 'wrap'
    },

    textItemId: {
        fontSize: 16,
        height: 25,
        color: '#ccc'
    },


    groupButton: {
        flexDirection: 'row',
    },

    actionButton: {
        marginLeft: 10
    }

});

export default ListContatos;