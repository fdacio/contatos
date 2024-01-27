import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Pagination = (props) => {

    return (
        <View style={styles.content}>
            <View style={styles.contentButtons}>
                <View style={styles.contentRefreshButton}>
                    {(props.actions != undefined) && props.actions.filter((action) => action.key == 'rf').map((action) =>

                   
                        <View key={action.key} >
                            <TouchableOpacity onPress={() => { action.action() }}>
                                <Icon
                                    name="refresh"
                                    size={28}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                        </View>

                    )}
                </View>
                <View style={styles.contentNavigationButton}>
                    {(props.actions != undefined) && props.actions.filter((action) => action.key !== 'rf').map((action) =>
                       
                        <View key={action.key} >
                            <TouchableOpacity onPress={() => { action.action() }} >

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
                <View style={{ flex: 1 }}></View>
            </View>
            <View>
                <Text style={styles.textTotalPage}>Total de Registros:{props.totalRegistros}</Text>
            </View>
        </View>
    )
}

export default Pagination