import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    
    content: {
        padding: 8
    },

    contentButtons: {
        flexDirection: 'row',
    },

    buttonLoad: {
        flex: 1,
        alignContent: 'flex-start',
    },

    contentNavigationButton: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },


    navigationButton:{
        paddingHorizontal: 16
    },

    textTotalPage: {
        alignSelf: 'center',
        textAlign: 'center',
    }
});
export default Styles;