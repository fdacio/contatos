import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const TextInputPlaceholder = (props) => {

    return (
        <View style={styles.content}>
            <TextInput style={styles.textInput} onChangeText={props.onChangeText} value={props.value} placeholder={props.placeholder} placeholderTextColor="#ccc" autoCapitalize={props.autoCapitalize} inputMode={props.inputMode} autoComplete={props.autoComplete} keyboardType={props.keyboardType} autoCorrect={props.autoCorrect}/>
        </View>
    );
}

const styles = StyleSheet.create({

    content: {
        marginBottom: 16,
        border: 1,
        borderColor: 'red'
    },

    textInput: {
        borderColor: '#000',
        borderWidth: 1,
        width: '100%',
        height: 48,
        padding: 8,
        fontSize: 18,
        borderRadius: 4
    },

    textAlert: {
        fontSize: 14,
        color: 'red'
    }

})

export default TextInputPlaceholder;