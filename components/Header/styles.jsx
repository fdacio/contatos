import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({

    content: {
        flexDirection: 'row',
        backgroundColor: '#201f1f',
        height: 56,
        paddingHorizontal: 8
    },

    buttonLeft: {
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'center',
    },

    title: {
        flex: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        flexWrap: 'nowrap',
    },

    link: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },


    buttonRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
    },

    button: {
        padding: 8,
        borderWidth: 0,
        borderColor: '#fff'
    }
});

export default Styles;