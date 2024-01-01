import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const TextInputPlaceholder = (props) => {

    return (
        <View style={styles.content}>
            <TextInput style={styles.textInput} onChangeText={props.onChangeText} value={props.value} placeholder={props.placeholder} placeholderTextColor="#ccc" autoCapitalize={props.autoCapitalize} inputMode={props.inputMode} autoComplete={props.autoComplete} keyboardType={props.keyboardType} autoCorrect={props.autoCorrect}/>
        </View>
    );
}

const styles = StyleSheet.create({

    content: {
        marginBottom: 16
    },

    textInput: {
        fontSize: 18,
        width: '100%',
        height: 48,
        padding: 8,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4
    },

    textAlert: {
        fontSize: 14,
        color: 'red'
    }

})

export default TextInputPlaceholder;