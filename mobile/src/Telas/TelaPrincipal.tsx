import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const TelaPrincipal = ({ navigation, route }) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.container_header}>
                <Text style={styles.titulo}>Bem Vindo!</Text>
            </View>
            <View style={styles.container_body}>
                <Pressable
                    style={styles.botao}
                    onPress={() => { navigation.navigate('TelaCadCli') }}
                >
                    <Text style={styles.desc_botao}>Cadastrar Cliente</Text>
                </Pressable>
                <Pressable
                    style={styles.botao}
                    onPress={() => { navigation.navigate('TelaConCli') }}
                >
                    <Text style={styles.desc_botao}>Consultar clientes</Text>
                </Pressable>
                <Pressable
                    style={styles.botao}
                    onPress={() => { navigation.navigate('TelaCadAtend') }}
                >
                    <Text style={styles.desc_botao}>Cadastrar Atendimento</Text>
                </Pressable>
                <Pressable
                    style={styles.botao}
                    onPress={() => { navigation.navigate('TelaConsAtend') }}
                >
                    <Text style={styles.desc_botao}>Consultar Atendimentos</Text>
                </Pressable>
                <Pressable
                    style={styles.botao}
                    onPress={() => { navigation.goBack() }}
                >
                    <Text style={styles.desc_botao}>Sair</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default TelaPrincipal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(20,0,300,0.5)',
    },
    container_header: {
        backgroundColor: 'rgba(20,0,300,0.5)',
    },
    container_body: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    titulo: {
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
        marginBottom: 30,
        marginTop: 30,
    },
    botao: {
        backgroundColor: 'indigo',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },
    desc_botao: {
        fontSize: 18,
        color: '#FFFFFF',
    }
});
