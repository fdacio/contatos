import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({

    content: {
        flexDirection: 'row',
        backgroundColor: '#201f1f',
        height: 56,
        paddingHorizontal: 8
    },

    contentComponentsLeft: {
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

    contentComponentsRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },

    componentsActions: {
        padding: 8,
        borderWidth: 0,
        borderColor: '#fff',   
    },

    boder: {
        borderWidth: 1,
        borderColor: 'white',
    }
});

export default Styles;