import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ScrollView } from 'react-native';


const Atividade3 = () => {
    const [titulo, setTitulo] = useState('');


    return (
        <View style={styles.container}>
            <View style={styles.container_titulo}>
                <Text
                    style={styles.titulo_caixa_texto}>
                       {titulo} 
                </Text>
                <TextInput
                    style={styles.caixa_texto}
                    onChangeText={(text) => { setTitulo(text) }} />
            </View>
        </View>
    );
}

export default Atividade3;

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
