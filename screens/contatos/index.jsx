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
    const [urlFirstPage, setUrlFirstPage] = useState();
    const [urlPreviorPage, setUrlPreviorPage] = useState();
    const [urlNextPage, setUrlNextPage] = useState();
    const [urlLastPage, setUrlLastPage] = useState();

    const [sizePage, setSizePage] = useState(20);
    const [urlDefault, setUrlDefault] = useState(`https://contatos.daciosoftware.com.br/api/contatos/pageable?page=1&size=${sizePage}`);


    const onLoadList = async (url) => {

        if (isFreshing) return;
        setIsFreshing(true);

        console.log("URL Get: " + url);


        await axios.get(url)
            .then((response) => {
                if (response.status == 200) {
                    setContatos(response.data.data);
                    setTotalRegistros(response.data.total);
                    setUrlFirstPage((response.data.first_page_url != null) ? response.data.first_page_url : url);
                    setUrlPreviorPage((response.data.prev_page_url != null) ? response.data.prev_page_url : url);
                    setUrlNextPage((response.data.next_page_url != null) ? response.data.next_page_url : url)
                    setUrlLastPage((response.data.last_page_url != null) ? response.data.last_page_url : url);
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

    const onFormSearch = () => {
        if (!visibleFormSearch) {
            setFormSearch(<FormSearchContatos onSearch={onLoadList} url={urlDefault} />);
        } else {
            setFormSearch();
        }
        setVisibleFormSearch(!visibleFormSearch);
    }

    const onFirstPage = () => {
        onLoadList(urlFirstPage);
    }
    const onPreviorPage = () => {
        onLoadList(urlPreviorPage);
    }
    const onNextPage = () => {
        onLoadList(urlNextPage);
    }
    const onLastPage = () => {
        onLoadList(urlLastPage);
    }
    const onRefreshPages = () => {
        onLoadList(urlDefault);
    } 

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log("useEffect");
            onLoadList(urlDefault);
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

            <Pagination totalRegistros={totalRegistros} onRefresh={onRefreshPages} actions={[
                {
                    'key': 'fp',
                    'action': onFirstPage
                },
                {
                    'key': 'pp',
                    'action': onPreviorPage
                },
                {
                    'key': 'np',
                    'action': onNextPage
                },
                {
                    'key': 'lp',
                    'action': onLastPage
                },
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