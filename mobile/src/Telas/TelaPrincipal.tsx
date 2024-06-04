import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';

const TelaPrincipal = ({ navigation, route }: PrincipalProps) => {

    return (
        <ScrollView>
            <View style={styles.container_header}>
                <Text style={styles.titulo}>
                    Título
                </Text>
            </View>
            <View style={styles.container}>
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaCadCli') }}>
                    <Text style={styles.desc_botao}>Cadastrar Cliente</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaConsCli') }}>
                    <Text style={styles.desc_botao}>Consultar cliente</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaCadAtend') }}>
                    <Text style={styles.desc_botao}>Cadastrar Atendimento</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default TelaPrincipal;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: 220,
    },
    container_header: {
        flex: 1,
        backgroundColor: '#164d96',
        paddingBottom: 80,
    },
    titulo: {
        paddingTop: 55,
        color: 'white',
        fontSize: 45,
        marginLeft: 40,
    },
    botao: {
        backgroundColor: 'blue',
        paddingVertical: 20,
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 70,
    },
    desc_botao: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    },
});
