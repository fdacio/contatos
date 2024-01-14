import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Pagination = (props) => {
    
    useEffect(() => {
    }, [props]);

    return (
        <View style={styles.content}>
            <View style={styles.contentButton}>
                {(props.actions != undefined) && props.actions.map((action, index) => 
                    <View key={index}>
                        <TouchableOpacity onPress={() => {action.action() }} style={styles.actionButton}>
                        {(action.key === 'pp') &&
                            <Icon
                                name="caret-left"
                                size={40}
                                color="#ccc"
                            />
                        }
                        {(action.key === 'np') &&
                            <Icon
                                name="caret-right"
                                size={40}
                                color="#ccc"
                            />
                        }
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <Text style={styles.textTotalPage}>Total de Registros:{props.totalRegistros}</Text>

        </View>
    )
}

export default Pagination