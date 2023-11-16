import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

const SelectInputLabel = (props) => {

    const [visible, setVisible] = useState(false);
    const setItem = props.onSelectedItem;

    const onSelectedItem = ({ item }) => {
        setItem((item.id == props.value) ? {} : item);
        setVisible(false);
    }

    return (

        <View style={styles.content}>
            <Text style={styles.textLabel}>{props.label}</Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => setVisible(true)}>
                <Text style={styles.selectText}>
                    {props.text}
                </Text>
                <Icon name="chevron-down" size={14} color="#000" style={styles.selectIcon} />
            </TouchableOpacity>
            <Text style={styles.textAlert}>{props.alert}</Text>

            <Modal visible={visible} style={styles.modal} animationType="slide" transparent={true}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <View style={styles.modalHeaderContentTitle}>
                            <Text style={styles.modalHeaderTitle}>{props.title}</Text>
                        </View>
                    </View>
                    <SafeAreaView style={styles.contentList}>
                        <FlatList
                            data={props.dados}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={[styles.contentItem, (props.value == item.id ? {'backgroundColor' : '#a5b8f2'} : '')]} onPress={() => onSelectedItem({item})}>
                                    <Text style={styles.textItem}>{item.nome}</Text>
                                </TouchableOpacity>
                            }
                        >

                        </FlatList>
                    </SafeAreaView>

                    <TouchableOpacity style={styles.btnCancelar} onPress={()=>setVisible(false)}>
                        <Text style={styles.btnCancelarText}>Cancelar</Text>
                    </TouchableOpacity>

                </View>

            </Modal>

        </View>
    );


}

const styles = StyleSheet.create({

    content: {
        marginBottom: 0
    },

    textLabel: {
        fontSize: 18,
    },

    selectInput: {
        borderColor: '#000',
        borderWidth: 1,
        width: '100%',
        height: 48,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontSize: 18,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    selectText: {
        fontSize: 18,
        alignSelf: 'center',
    },

    selectIcon: {
        alignSelf: 'center',
    },

    modalContent: {
        flex: 1,
        marginVertical: 200,
        marginHorizontal: 16,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#b8b8b8"
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0751d3',
        height: 40
    },

    modalHeaderClose: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 4,
        alignSelf: 'center',
    },

    modalHeaderContentTitle: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalHeaderTitle: {
        fontSize: 18,
        color: "#fff"
    },

    contentList: {
        padding: 4
    },

    textAlert: {
        fontSize: 14,
        color: 'red'
    },

    contentItem: {
        padding: 8,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },

    textItem: {
        fontSize: 18
    },

    btnCancelar: {
        borderTopColor: '#b8b8b8',
        borderTopWidth: 1,
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#ccc',
        position: 'absolute',
        bottom:0,
        left:0,
        width: '100%'
    },

    btnCancelarText:{
        fontSize: 18,
    }

})

export default SelectInputLabel;