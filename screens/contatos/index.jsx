import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Message from '../../components/Message';
import TextInputPlaceholder from '../../components/TextInputPlaceholder';
import SelectInputPlaceholder from '../../components/SelectInputPlaceholder';
import ButtonSearch from '../../components/Button';


const ListContatos = ({ navigation, route }) => {
    
    const [contatos, setContatos] = useState([]);
    const [isFreshing, setIsFreshing] = useState(false);
    const [message, setMessage] = useState();
    const [visibleSearch, setVisibleSearch] = useState(false);
    const [grupos, setGrupos] = useState({});
    
    const FormSearch = (props) => {
    
        const [nome, setNome] = useState('');
        const [grupo, setGrupo] = useState({});
    
        return (
            <View style={(props.visibleSearch) ? styles.containerSearch : styles.containerSearchInvisible}>
                <TextInputPlaceholder placeholder="Nome" autoCapitalize="words" onChangeText={text => setNome(text)} value={nome} />
                <SelectInputPlaceholder placeholder="Grupo" title="Grupos" text={grupo.nome} value={grupo.id} dados={props.dados} onSelectedItem={setGrupo} />
                <ButtonSearch label="Pesquisar" onPress={() => { }} />
            </View>
    
        );
       
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

    const onLoadList = async () => {
        console.log("Carregando Lista...");
        setIsFreshing(true);
        const url = 'https://contatos.daciosoftware.com.br/api/contatos';
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

    const onSearchVisible = () => {
        setVisibleSearch(!visibleSearch);
        onLoadGrupos();
    }
    
    useEffect(() => {
        setMessage(route?.params?.message);
        onLoadList();
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
                    <Button onPress={() => onSearchVisible()}
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

            <FormSearch visibleSearch={visibleSearch} dados={grupos} />

            <Message message={message} visible={(message !== undefined)} navigation={navigation}></Message>

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

    containerSearch: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderBottomColor: "#ccc",
    },

    containerSearchInvisible: {
        display: 'none',
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