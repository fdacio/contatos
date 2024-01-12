/**
 * Install the React Native Mask Input component in your project
 * npm install react-native-mask-input
 */
import React from 'react';
import { View, Text } from 'react-native';
import MaskInput from 'react-native-mask-input';
import styles from './styles';

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


export default TextInputMaskLabel;