import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import styles from './styles';

const TextAreaLabel = (props) => {

    return (
        <View style={styles.content}>
            <Text style={[styles.textLabel, (props.label == '' && styles.textLabelInvisible)]}>{props.label}</Text>
            <ScrollView>
                <TextInput multiline={true} scrollEnabled={true} numberOfLines={(props.numLines != undefined) ?  props.numLines : 8} style={styles.textInput} onChangeText={props.onChangeText} value={props.value} placeholder={props.placeholder} placeholderTextColor="#ccc" autoCapitalize={props.autoCapitalize} inputMode={props.inputMode} autoComplete={props.autoComplete} keyboardType={props.keyboardType} autoCorrect={props.autoCorrect}/>
            </ScrollView>
            <Text style={styles.textAlert}>{props.alert}</Text>
        </View>
    );
}

export default TextAreaLabel;