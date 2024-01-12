import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import styles from './styles';

const Header = (props) => {

    const onGoBack = () => {
        const navigation = props.navigation;
        navigation.goBack();
    }
    
    return (
        <View style={styles.content}>
            <View style={styles.buttonArrow}>
                {(props.buttonBack == undefined) &&
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
            </View>
            <Text style={styles.title}>{props.title}</Text>

            <View style={styles.buttonAction}>
                {(props.buttonsAction != undefined) ? props.buttonsAction.map((component) => component) : []}
            </View>

        </View>
    );
}


export default Header