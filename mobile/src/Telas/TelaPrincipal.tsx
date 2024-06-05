import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';

const TelaPrincipal = ({ navigation, route }: PrincipalProps) => {

    return (
        <ScrollView>
            <View style={styles.container_header}>
                <Text style={styles.titulo}>
                    Bem vindo!
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
                    onPress={() => { navigation.navigate('TelaConsCliToAtend') }}>
                    <Text style={styles.desc_botao}>Cadastrar Atendimento</Text>
                </Pressable>
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaConsAtend') }}>
                    <Text style={styles.desc_botao}>Consultar Atendimento</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default TelaPrincipal;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: '80%',
        flex: 1,
        backgroundColor: '#1c62be'

    },
    container_header: {
        flex: 1,
        backgroundColor: '#164d96',
        paddingBottom: 40,
    },
    titulo: {
        paddingTop: 35,
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'blue',
        paddingVertical: 15,
        marginTop: 25,
        borderRadius: 10,
        marginHorizontal: 50,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
});
