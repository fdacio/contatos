import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const Button = (props) => {

    return (
        <TouchableOpacity style={[props.style || styles.button, (props.disabled) ? styles.buttonDisabled : styles.buttonEnable]} onPress={props.onPress} disabled={props.disabled} >
            <Text style={styles.textButton}>{props.label}</Text>
        </TouchableOpacity>
    );
}

export default Button;