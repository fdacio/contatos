import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Loading = (props) => {
    return (
        <View style={styles.container}>
            {props.loading && <ActivityIndicator color={"blue"} size={80} />}
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%'
    },

})

export default Loading;