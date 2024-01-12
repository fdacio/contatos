import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

const TextInputLabel = (props) => {

    return (
        <View style={styles.content}>
            <Text style={[styles.textLabel, (props.label == '' && styles.textLabelInvisible)]}>{props.label}</Text>
            <TextInput style={styles.textInput} onChangeText={props.onChangeText} value={props.value} placeholder={props.placeholder} placeholderTextColor="#ccc" autoCapitalize={props.autoCapitalize} inputMode={props.inputMode} autoComplete={props.autoComplete} keyboardType={props.keyboardType} autoCorrect={props.autoCorrect}/>
            <Text style={styles.textAlert}>{props.alert}</Text>
        </View>
    );
}

export default TextInputLabel;