import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

const Header = (props) => {
    return (
        <View style={styles.content}>

            <View style={styles.buttonArrow}>
                <Button
                    onPress={() => props.navigation.goBack()}
                    icon={
                        <Icon
                            name="arrow-left"
                            size={20}
                            color="white" />
                    }
                    type="clear"
                />
            </View>

            <Text style={styles.title}>{props.title}</Text>

            <View style={styles.buttonAction}>
                {(props.buttonsAction != undefined) ? props.buttonsAction.map((component, index) => component) : []}
            </View>



        </View>
    );
}

const styles = StyleSheet.create({

    content: {
        flexDirection: 'row',
        backgroundColor: '#201f1f',
        height: 56,
        paddingHorizontal: 8
    },

    buttonArrow: {
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
        flex: 4,
        flexWrap: 'nowrap',
    },

    buttonAction: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'center',
    }
})

export default Header