import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    
    content: {
        padding: 8,
        marginBottom: 8,
        borderTopWidth: 1,
        borderColor: '#ccc'
    },

    contentButtons: {
        flexDirection: 'row',
        marginBottom: 8,
    },

    contentNavigationButton: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    contentTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

});
export default Styles;