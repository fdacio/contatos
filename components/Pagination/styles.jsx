import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    
    content: {
        paddingVertical: 8,
        marginBottom: 16
    },

    contentButtons: {
        flexDirection: 'row',
        marginBottom: 8,
    },

    contentRefreshButton: {
        flex: 1,
        justifyContent: 'center',
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