import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import styles from './styles';

const Message = (props) => {

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (props.message) {
            setVisible(true);
            setMessage(props.message);
        }
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

export default Message