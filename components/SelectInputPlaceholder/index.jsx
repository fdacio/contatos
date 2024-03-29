import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const SelectInputPlaceholder = (props) => {

    
    const [visibleText, setVisibleText] = useState(false);
    const [visiblePlaceholder, setVisiblePlaceholder] = useState(true);
    const [visibleModal, setVisibleModal] = useState(false);
    const setItem = props.onSelectedItem;
    
    
    const onSelectItem = ( {item} ) => {
        if (item.id != props.value) {
            setItem(item);
            setVisibleText(true);
            setVisiblePlaceholder(false);    
        } else {
            setItem();
            setVisibleText(false);
            setVisiblePlaceholder(true);    
        }
        setVisibleModal(false);
    }

    return (

        <View style={styles.content}>

            <TouchableOpacity style={styles.selectInput} onPress={() => setVisibleModal(true)}>
                {(visibleText) &&
                <Text style={styles.selectText}>
                    {props.text}
                </Text>
                }
                {(visiblePlaceholder) &&
                <Text style={styles.selectTextPlaceholder}>
                    {props.placeholder}
                </Text>
                }
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
                                <TouchableOpacity style={[styles.contentItem, (props.value == item.id ? {'backgroundColor' : '#a5b8f2'} : '')]} onPress={() => onSelectItem({item})}>
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


export default SelectInputPlaceholder;