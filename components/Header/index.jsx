import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {

    const navigation = useNavigation();

    return (
        <View style={styles.content}>
            <View style={styles.contentComponentsLeft}>
                {(props.buttonBack != undefined && props.buttonBack) &&
                    <TouchableOpacity style={styles.componentsActions}
                        onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-left"
                            size={20}
                            color="white" />
                    </TouchableOpacity>
                }
                {(props.buttonMenu != undefined && props.buttonMenu) &&
                    <TouchableOpacity style={styles.componentsActions}
                        onPress={() => navigation.openDrawer()}>
                        <Icon
                            name="bars"
                            size={20}
                            color="white" />
                    </TouchableOpacity>
                }
            </View>

            <Text style={styles.title}>{props.title}</Text>

            <View style={styles.contentComponentsRight}>

                {
                    (props.componentsRight != undefined) && props.componentsRight.map((component, index) => {

                        return (
                            <View style={styles.componentsActions} key={index} >
                                {component}
                            </View>
                        )
                    }

                    )
                }

            </View>

        </View>
    );
}


export default Header