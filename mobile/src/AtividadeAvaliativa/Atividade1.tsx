import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

type Props = {
    titulo: string;
}

const Atividade1 = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.container_titulo}>
                <Text
                    style={styles.titulo_caixa_texto}>
                    {props.titulo}
                </Text>
                <TextInput
                    style={styles.caixa_texto}
                />
            </View>
        </View>
    );
}

export default Atividade1;

const styles = StyleSheet.create({
    container: {
        paddingTop: 250,
        flex: 1,
        backgroundColor: '#1d7cd4'
    },
    container_titulo: {
        flex: 2,
        alignItems: 'center'
    },
    titulo_caixa_texto: {
        fontSize: 25,
        color: 'black'
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white'
    },

});
