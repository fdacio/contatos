import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

const HeaderHome = (props) => {
    return (
        <View style={styles.content}>
            <View style={styles.buttonList}>
                <Button
                    onPress={() => props.navigation.toggleDrawer()}
                    icon={
                        <Icon
                            name="bars"
                            size={20}
                            color="white" />
                    }
                    type="clear"
                />
            </View>
            
            <Text style={styles.title}>{props.title}</Text>

            <View style={styles.buttonAction}>
                {props.buttonAction}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    content: {
        flexDirection: 'row',
        backgroundColor: '#0751d3',
        height: 56,
        paddingHorizontal: 8
    },

    buttonList: {
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 3,
    },

    buttonAction: {
        flex: 1,
        alignItems: 'flex-end',
        alignSelf: 'center',
    }
})

export default HeaderHome