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
                        
                        {(action.key === 'fp') &&
                            <Icon
                                name="angle-double-left"
                                size={40}
                                color="#ccc"
                            />
                        }
                        {(action.key === 'pp') &&
                            <Icon
                                name="angle-left"
                                size={40}
                                color="#ccc"
                            />
                        }
                        {(action.key === 'np') &&
                            <Icon
                                name="angle-right"
                                size={40}
                                color="#ccc"
                            />
                        }
                        {(action.key === 'lp') &&
                            <Icon
                                name="angle-double-right"
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