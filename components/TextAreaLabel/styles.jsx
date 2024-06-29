import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({

    content: {
        marginBottom: 0
    },

    textLabel: {
        fontSize: 18,
    },

    textLabelInvisible: {
        display: 'none',
        height: 0
    },

    textInput: {
        fontSize: 18,
        width: '100%',
        height: 150,
        padding: 8,
        textAlignVertical: 'top',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4,
    },

    textAlert: {
        fontSize: 14,
        color: 'red'
    }

});

export default Styles;