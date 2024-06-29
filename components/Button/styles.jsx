import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    button: {
        width: '100%',
        height: 50,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },

    buttonEnable: {
        backgroundColor: '#201f1f',
    },

    buttonDisabled: {
        backgroundColor: '#d6d6d6',
    },

    textButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        display: 'flex'
    },

    icon: {
        color: 'white'
    }

});

export default styles;
