import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
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
            <View style={styles.buttonArrow}>
                {(props.buttonBack != undefined && props.buttonBack) &&
                    <Button
                        onPress={() => onGoBack()}
                        icon={
                            <Icon
                                name="arrow-left"
                                size={20}
                                color="white" />
                        }
                        type="clear"
                    />
                }
                {(props.buttonMenu != undefined && props.buttonMenu) &&
                    <Button
                        onPress={() => onOpenDrawer()}
                        icon={
                            <Icon
                                name="bars"
                                size={20}
                                color="white" />
                        }
                        type="clear"
                    />
                }
            </View>
            <Text style={styles.title}>{props.title}</Text>

            <View style={styles.buttonAction}>
                {(props.buttonsAction != undefined) && props.buttonsAction.map((component) => component)}
            </View>


        </View>
    );
}


export default Header