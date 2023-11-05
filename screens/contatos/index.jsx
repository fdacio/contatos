import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Message from '../../components/Message';


const ListContatos = ({ navigation, route }) => {

    const [contatos, setContatos] = useState([]);
    const [isFreshing, setIsFreshing] = useState(false);
    const [message, setMessage] = useState();

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

    useEffect(() => {
        setMessage(route?.params?.message);
        onLoadList();
    }, [route]);

    return (

        <SafeAreaView style={styles.container}>
            <Header title="Contatos" navigation={navigation}
                buttonAction={
                    <Button onPress={() => navigation.navigate('CreateContato')}
                        icon={
                            <Icon
                                name="plus"
                                size={20}
                                color="#fff" />
                        }
                        type="clear"
                    />}
            />

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