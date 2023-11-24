import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Loading = (props) => {
    return (
        <View style={[styles.container, styles.horizontal]}>
            {props.loading && <ActivityIndicator color="#a37522" size={80} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: '50%',
      alignSelf: 'center'
    }
  });

export default Loading;