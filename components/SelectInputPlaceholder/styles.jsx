import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({

    content: {
        marginBottom: 16
    },

    selectInput: {
        borderColor: '#000',
        borderWidth: 1,
        width: '100%',
        height: 48,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontSize: 18,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    selectText: {
        fontSize: 18,
        alignSelf: 'center',
        display: 'flex'
    },

    selectTextInvisible: {
        display: 'none',
    },

    selectTextPlaceholder: {
        fontSize: 18,
        alignSelf: 'center',
        color: "#ccc",
        display: 'flex'
    },
    
    selectTextPlaceholderInvisible: {
        display: 'none',
    },

    selectIcon: {
        alignSelf: 'center',
    },

    textAlert: {
        fontSize: 14,
        color: 'red'
    },

    modalContent: {
        flex: 1,
    },

    modalHeader: {
        flexDirection: 'row',
        backgroundColor: '#201f1f',
        height: 56,
    },

    modalHeaderContentTitle: {
        flex: 1,
        justifyContent: 'center',
    },

    modalHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
        textAlign: 'center'
    },

    contentList: {
        padding: 4
    },

    contentItem: {
        padding: 8,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },

    textItem: {
        fontSize: 18
    },

    btnCancelar: {
        position: 'absolute',
        bottom:0,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '95%',
        marginBottom: 10,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 4,
    },

    btnCancelarText:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }

});

export default Styles;
