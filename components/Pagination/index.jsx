import React, { useEffect, useState}  from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Pagination = (props) => {

    const [totalRegistros, setTotalRegistros] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(0);

    useEffect(() => {
        setTotalRegistros((props.totalRegistros != undefined) ? props.totalRegistros : 0);
        setTotalPaginas((props.totalPaginas != undefined) ? props.totalPaginas : 0 );
        setPaginaAtual((props.paginaAtual != undefined) ? props.paginaAtual : 0);
    })

    return (
        <View style={styles.content}>
            <View style={styles.contentButtons}>
                <View style={{ flex: 1 }} />
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
                <View style={{ flex: 1 }} />
            </View>
            <View style={styles.contentTotal}>
                <Text>Total:{totalRegistros}</Text>
                <Text>Pagina:{paginaAtual + "/" + totalPaginas}</Text>
            </View>
        </View>
    )
}

export default Pagination