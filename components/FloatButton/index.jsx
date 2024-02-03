import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const FloatButton = (props) => {

    return (
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
            <Icon
            name={props.iconName}
            size={24}
            color="white" />
        </TouchableOpacity>
    )

}

export default FloatButton;