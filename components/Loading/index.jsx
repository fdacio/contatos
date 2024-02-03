import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

const Loading = (props) => {
    return (
        <View style={styles.container}>
            {props.loading && <ActivityIndicator color="#a37522" size={80} />}
        </View>
    );
}

export default Loading;