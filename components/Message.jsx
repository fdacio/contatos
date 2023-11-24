import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

const Message = (props) => {

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (props.message) {
            setVisible(true);
            setMessage(props.message);
        }
        props.navigation.setParams({'message' : null});
        const toRef = setTimeout(() => {
            setVisible(false);
            clearTimeout(toRef);
          }, 5000);
    }, [props.message]);

    const onClose = () => {
        setVisible(false);
    }

    return (

        <View style={(visible) ? styles.content : styles.messageInvisible}>

            <Text style={styles.message}>{message}</Text>

            <View style={styles.buttonClose}>
                <Button
                    onPress={onClose}
                    icon={
                        <Icon
                            name="close"
                            size={18}
                            color="#155724" />
                    }
                    type="clear"
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    content: {
        flexDirection: 'row',
        backgroundColor: '#d4edda',
        height: 52,
        padding: 8,
        borderRadius: 4,
        borderColor: '#c3e6cb',
        marginHorizontal: 8,
        marginVertical: 4
    },

    message: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#155724',
        flex: 8,
        alignItems: 'flex-start',
        alignSelf: 'center',
        marginStart: 4
    },

    buttonClose: {
        flex: 1,
        alignItems: 'flex-end',
        alignSelf: 'flex-start',
        width: 2,
    },

    messageInvisible: {
        display: 'none'
    },
})

export default Message