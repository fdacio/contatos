import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import Header from '../../components/Header';

const ListGrupos = ({ navigation, route }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Grupos" navigation={navigation}
                buttonAction={
                    <Button onPress={() => navigation.navigate('CreateGrupo')}
                        icon={
                            <Icon
                                name="plus"
                                size={20}
                                color="#fff" />
                        }
                        type="clear"
                    />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default ListGrupos;