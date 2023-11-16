/**
 * Install the React Native Mask Input component in your project
 * npm install react-native-mask-input
 */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaskInput from 'react-native-mask-input';

const TextInputMaskLabel = (props) => {
    const setValor = props.onChangeText;
    return (
        <View style={styles.content}>
            <Text style={styles.textLabel}>{props.label}</Text>
            <MaskInput mask={props.mask} style={styles.textInput} onChangeText={(mask, unmask) => {setValor(mask)}} value={props.value} autoComplete={props.autoComplete} autoCapitalize={props.autoCapitalize} inputMode={props.inputMode} keyboardType={props.keyboardType} autoCorrect={props.autoCorrect} />
            <Text style={styles.textAlert}>{props.alert}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    content: {
        marginBottom: 0,
    },

    textLabel: {
        fontSize: 18,
        marginBottom: 0
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

export default TextInputMaskLabel;