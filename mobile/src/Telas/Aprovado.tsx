import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AprovadoProps } from '../navigation/HomeNavigator';

function media(nota1: number, nota2: number) {
    return (nota1 + nota2) / 2;
}

function resultado(media: number) {
    return media >= 7 ? 'Aprovado' : 'Reprovado';
}

const Aprovado = ({ navigation, route }: AprovadoProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.container_login}>
                <Text style={styles.titulo_caixa_texto}>
                    Nome:
                </Text>
                <TextInput
                    style={styles.caixa_texto}>
                    
                </TextInput>
                <Text style={styles.titulo_caixa_texto}>
                    Nota 1:
                </Text>
                <TextInput
                    style={styles.caixa_texto}>

                </TextInput>
                <Text style={styles.titulo_caixa_texto}>
                    Nota 2:
                </Text>
                <TextInput
                    style={styles.caixa_texto}>

                </TextInput>
                <Text style={styles.titulo_caixa_texto}>
                    Média: {("")}
                </Text>
                <Text style={styles.titulo_caixa_texto}>
                    {/* Resultado: {resultado(media("props.nota1, props.nota2"))} */}
                </Text>
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaPrincipal') }}>
                    <Text style={styles.desc_botao}>Calcular média</Text>
                </Pressable>
            </View>
        </View>
    )
};

export default Aprovado;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 30,
        flex: 1,
        backgroundColor: '#1c62be'
    },
    container_login: {
        flex: 2,
        alignItems: 'center'
    },
    titulo_caixa_texto: {
        paddingTop: 10,
        fontSize: 25,
        color: 'black',
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white'
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 10
    },
    desc_botao: {
        fontSize: 20,
        color: 'white'
    },
    painel_imagem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        width: 200,
        height: 200,
        resizeMode: "center"
    }
});
