import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

            <Modal visible={visible} animationType="slide" >
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

export default SelectInputLabel;