import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const ButtonListItem = (props) => {

    return (
        <View style={styles.content}>
            {(props.buttonsAction != undefined) && props.buttonsAction.map((button, index) =>
                <TouchableOpacity style={styles.button} key={index}
                    onPress={() => props.navigation.navigate(button.route, {id: button.id})}>
                    <Icon
                        name={button.iconName}
                        size={24}
                        color="#ccc" />
                </TouchableOpacity>
            )}
        </View>
    )
}
export default ButtonListItem;
