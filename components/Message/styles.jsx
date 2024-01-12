import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({

    content: {
        flexDirection: 'row',
        backgroundColor: '#d4edda',
        height: 52,
        padding: 8,
        borderRadius: 4,
        borderColor: '#c3e6cb',
        marginHorizontal: 8,
        marginVertical: 4
    },

    message: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#155724',
        flex: 8,
        alignItems: 'flex-start',
        alignSelf: 'center',
        marginStart: 4
    },

    buttonClose: {
        flex: 1,
        alignItems: 'flex-end',
        alignSelf: 'flex-start',
        width: 2,
    },

    messageInvisible: {
        display: 'none'
    },
});

export default Styles;