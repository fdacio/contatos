import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Header = (props) => {

    const onGoBack = () => {
        const navigation = props.navigation;
        navigation.goBack();
    }

    const onOpenDrawer = () => {
        const navigation = props.navigation;
        navigation.openDrawer();
    }

    return (
        <View style={styles.content}>
            <View style={styles.buttonLeft}>
                {(props.buttonBack != undefined && props.buttonBack) &&
                    <TouchableOpacity style={styles.button}
                        onPress={() => onGoBack()}>
                        <Icon
                            name="arrow-left"
                            size={20}
                            color="white" />
                    </TouchableOpacity>
                }
                {(props.buttonMenu != undefined && props.buttonMenu) &&
                    <TouchableOpacity style={styles.button}
                        onPress={() => onOpenDrawer()}>
                        <Icon
                            name="bars"
                            size={20}
                            color="white" />
                    </TouchableOpacity>
                }
            </View>

            <Text style={styles.title}>{props.title}</Text>

            <View style={styles.buttonRight}>
                {(props.buttonsAction != undefined) && props.buttonsAction.map((button, index) =>
                    <TouchableOpacity style={styles.button} key={index}
                        onPress={() => button.action()}>
                        <Icon
                            name={button.iconName}
                            size={20}
                            color="white" />
                    </TouchableOpacity>
                )}
                {(props.linksAction != undefined) && props.linksAction.map((link, index) =>
                    <Text style={styles.link} onPress={()=>link.action()} key={index}>{link.text}</Text>
                )}
            </View>


        </View>
    );
}


export default Header