import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

const TextInputPlaceholder = (props) => {

    return (
        <View style={styles.content}>
            <TextInput style={styles.textInput} onChangeText={props.onChangeText} value={props.value} placeholder={props.placeholder} placeholderTextColor="#ccc" autoCapitalize={props.autoCapitalize} inputMode={props.inputMode} autoComplete={props.autoComplete} keyboardType={props.keyboardType} autoCorrect={props.autoCorrect}/>
        </View>
    );
}

export default TextInputPlaceholder;