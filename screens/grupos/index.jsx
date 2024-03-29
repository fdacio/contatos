import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text, Alert, TouchableOpacity } from 'react-native';
import ButtonListItem from '../../components/ButtonListItem';
import axios from 'axios';
import Header from '../../components/Header';
import Loading from '../../components/Loading';


const ListGrupos = ({ navigation }) => {

    const [grupos, setGrupos] = useState([]);
    const [isFreshing, setIsFreshing] = useState(false);

    const onLoadList = async () => {
        console.log("Carregando Lista...");
        setIsFreshing(true);
        const url = 'https://contatos.daciosoftware.com.br/api/grupos';
        await axios.get(url)
            .then((response) => {
                if (response.status == 200) {
                    setGrupos((response.data));
                }
            }).catch((error) => {
                if (error.toJSON().message === 'Network Error') {
                    Alert.alert("Erro", "Ver conexão com a internet");
                    dispatch({ type: RELOAD });
                }
            }).finally(() => {
                setIsFreshing(false);
            });
    }

    const onCreateGrupo = () => {
        navigation.navigate('CreateGrupo');
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            onLoadList();
            console.log("useEffect");
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Grupos" navigation={navigation} buttonBack={true}  buttonsAction={[
                {
                    "action" : onCreateGrupo,
                    "iconName" : "plus" 
                }
            ]}
            ></Header>

            <FlatList style={{ padding: 16 }}
                data={grupos}
                refreshing={isFreshing}
                onEndReached={onLoadList}
                onEndReachedThreshold={0.5}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <View style={styles.itemContent}>
                        <View>
                            <Text style={styles.itemName}>{item.nome}</Text>
                        </View>
                        <ButtonListItem navigation={navigation} buttonsAction={[
                                    {
                                        "route" : "EditGrupo",
                                        "id" : item.id,
                                        "iconName" : "edit"
                                    },
                                    {
                                        "route" : "DeleteGrupo",
                                        "id" : item.id,
                                        "iconName" : "trash"

                                    },
                                ]}/>

                    </View>
                }
                ItemSeparatorComponent = {<View style={styles.itemSeparator}></View> }
                ListFooterComponent={<View><Text></Text></View>}
            />

            <Loading loading={isFreshing} />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    buttonAction: {
        flex: 1,
        alignItems: 'flex-end',
        alignSelf: 'center',
    },

    itemName: {
        fontSize: 18,
        height: 32,
        fontWeight: 'bold',
    },

    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        flexWrap: 'wrap'
    },

    itemSeparator: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },

    groupButton: {
        flexDirection: 'row',
    },

    actionButton: {
        marginLeft: 10
    }
});

export default ListGrupos;