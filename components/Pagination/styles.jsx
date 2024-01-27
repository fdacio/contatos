import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    
    content: {
        padding: 16,
    },

    contentButtons: {
        flexDirection: 'row',
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

    textTotalPage: {
        alignSelf: 'center',
        textAlign: 'center',
    }

});
export default Styles;