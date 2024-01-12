import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const SelectInputLabel = (props) => {

    const [visible, setVisible] = useState(false);
    const setItem = props.onSelectedItem;

    const onSelectedItem = ({ item }) => {
        setItem((item.id == props.value) ? {} : item);
        setVisible(false);
    }

    return (

        <View style={styles.content}>

            <Text style={[styles.textLabel, (props.label == '' && styles.textLabelInvisible)]}>{props.label}</Text>
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

export default SelectInputLabel;