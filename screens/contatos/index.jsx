import React, { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text, Alert, TouchableOpacity } from 'react-native';
import ButtonListItem from '../../components/ButtonListItem';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import axios from 'axios';

import FormSearchContatos from './search';
import FloatButton from '../../components/FloatButton';

const ListContatos = ({ navigation }) => {

    const flatListRef = useRef()
    const [contatos, setContatos] = useState([]);
    const [isFreshing, setIsFreshing] = useState(false);
    const [formSearch, setFormSearch] = useState();
    const [visibleFormSearch, setVisibleFormSearch] = useState(false);

    const [totalRegistros, setTotalRegistros] = useState();
    const [totalPaginas, setTotalPaginas] = useState();
    const [paginaAtual, setPaginaAtual] = useState();
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
                    setTotalPaginas(response.data.last_page);
                    setPaginaAtual(response.data.current_page);
                    setUrlFirstPage((response.data.first_page_url != null) ? response.data.first_page_url : url);
                    setUrlPreviorPage((response.data.prev_page_url != null) ? response.data.prev_page_url : url);
                    setUrlNextPage((response.data.next_page_url != null) ? response.data.next_page_url : url)
                    setUrlLastPage((response.data.last_page_url != null) ? response.data.last_page_url : url);
                    setIsFreshing(false);
                    flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
                }

            }).catch((error) => {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert("Erro", "Ver conexão com a internet");
                }
            }).finally(() => {
                setIsFreshing(false);
            });
    }

    const onCreateContato = () => {
        navigation.navigate('CreateContato');
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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log("useEffect");
            onLoadList(urlDefault);
        });
        return unsubscribe;
    }, [navigation]);

    return (

        <SafeAreaView style={styles.container}>

            <Header title="Contatos" navigation={navigation} buttonBack={true} buttonsAction={[
                {
                    "action" : onCreateContato,
                    "iconName" : "plus"
                },
                {
                    "action" : onFormSearch,
                    "iconName" : "search"

                },
            ]
            }>
            </Header>

            {formSearch}

            <FlatList style={styles.flatList}
                ref={flatListRef}
                data={contatos}
                refreshing={isFreshing}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <View style={styles.itemContent}>
                        <View style={styles.itemContentRow}>
                            <Text style={styles.textItemName}>{item.nome}</Text>
                            <View style={styles.groupButton} >
                                <ButtonListItem navigation={navigation} buttonsAction={[
                                    {
                                        "route" : "EditContato",
                                        "id" : item.id,
                                        "iconName" : "edit"
                                    },
                                    {
                                        "route" : "DeleteContato",
                                        "id" : item.id,
                                        "iconName" : "trash"
                                    },
                                ]}/>
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

                ListFooterComponent={(totalRegistros > 0) && <View><Text></Text></View>}

            />
            
            <FloatButton iconName="refresh" onPress={() => onLoadList(urlDefault)} style={{bottom: 64}}/>

            <Pagination totalRegistros={totalRegistros} totalPaginas={totalPaginas} paginaAtual={paginaAtual} actions={[
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
                ]}/>

             <Loading loading={isFreshing} />
        
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    flatList: {
        padding: 16
    },

    itemContent: {
        paddingVertical: 8,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
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
});

export default ListContatos;