import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SelectInputPlaceholder = (props) => {

    const [visibleModal, setVisibleModal] = useState(false);
    const [itemSelected, setItemSelected] = useState();

    const onSelectedItem = ({ item }) => {
        let itemSelected = (item.id == props.value) ? {} : item
        setItemSelected(itemSelected);
        setVisibleModal(false);
    }

    return (

        <View style={styles.content}>

            <TouchableOpacity style={styles.selectInput} onPress={() => setVisibleModal(true)}>
                <Text style={[styles.selectText, (props.value == undefined) && styles.selectTextInvisible]}>
                    {props.text}{(itemSelected != undefined) ? itemSelected.nome : ''}
                </Text>
                <Text style={[styles.selectTextPlaceholder, (props.value  != undefined) && styles.selectTextPlaceholderInvisible]}>
                    {props.placeholder}
                </Text>
                <Icon name="chevron-down" size={14} color="#000" style={styles.selectIcon} />
            </TouchableOpacity>
  
            <Modal visible={visibleModal} animationType="slide" >
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
                    <TouchableOpacity style={styles.btnCancelar} onPress={()=>setVisibleModal(false)}>
                        <Text style={styles.btnCancelarText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>

            </Modal>

        </View>
    );

}

const styles = StyleSheet.create({

    content: {
        marginBottom: 16
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
        display: 'flex'
    },

    selectTextInvisible: {
        display: 'none',
    },

    selectTextPlaceholder: {
        fontSize: 18,
        alignSelf: 'center',
        color: "#ccc",
        display: 'flex'
    },
    
    selectTextPlaceholderInvisible: {
        display: 'none',
    },

    selectIcon: {
        alignSelf: 'center',
    },

    textAlert: {
        fontSize: 14,
        color: 'red'
    },

    modalContent: {
        flex: 1,
    },

    modalHeader: {
        flexDirection: 'row',
        backgroundColor: '#201f1f',
        height: 56,
    },

    modalHeaderContentTitle: {
        flex: 1,
        justifyContent: 'center',
    },

    modalHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
        textAlign: 'center'
    },

    contentList: {
        padding: 4
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
        position: 'absolute',
        bottom:0,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '95%',
        marginBottom: 10,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 4,
    },

    btnCancelarText:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }

})

export default SelectInputPlaceholder;