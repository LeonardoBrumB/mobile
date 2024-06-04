import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';

import auth from "@react-native-firebase/auth";
import { LoginProps } from '../navigation/HomeNavigator';

const Login = ({ navigation, route }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function logar({ }) {
        if (verificaCampos()) {

            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(() => { navigation.navigate("TelaPrincipal") })
                .catch((error) => tratarErros(String(error)))
        }
    }

    function verificaCampos() {
        if (email == '') {
            Alert.alert("Email em branco", "Digite um email")
            return false;
        }
        if (senha == '') {
            Alert.alert("Senha em branco", "Digite uma senha")
            return false;
        }

        return true;
    }

    function tratarErros(erro: string) {
        console.log(erro);
        if (erro.includes("[auth/invalid-email]")) {
            Alert.alert("Email inválido", "Digite um email válido")
        } else if (erro.includes("[ INVALID_LOGIN_CREDENTIALS ]")) {
            Alert.alert("Login ou senha incorretos", "")
        } else if (erro.includes("[auth/invalid-credential]")) {
            Alert.alert("Login ou senha incorretos", "")
        } else {
            Alert.alert("Erro", erro)
        }
    }

    function redefinirSenha() {
        if (email == '') {
            Alert.alert('Email em branco', 'Preencha o email')
            return
        }

        auth()
            .sendPasswordResetEmail(email)
            .then(() => Alert.alert('redefinir senha', 'Enviamos um email para você redefinir sua senha'))
            .catch((error) => console.log(error))
    }

    return (
        <View style={styles.container}>
            <View style={styles.painel_imagem}>
                <Image
                    style={styles.imagem}
                    source={{ uri: '////////////' }} />
            </View>

            <View style={styles.container_login}>
                <Text
                    style={styles.titulo_caixa_texto}>
                    Email
                </Text>
                <TextInput
                    style={styles.caixa_texto}
                    onChangeText={(text) => { setEmail(text) }} />

                <Text
                    style={styles.titulo_caixa_texto}>
                    Senha
                </Text>
                <TextInput
                    style={styles.caixa_texto}
                    secureTextEntry={true}
                    onChangeText={(text) => { setSenha(text) }} />

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={logar}>
                    <Text style={styles.desc_botao}>Entrar</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaCadastro') }}>
                    <Text style={styles.desc_botao}>Cadastrar</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao_es, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { redefinirSenha() }}>
                    <Text style={styles.desc_botao_es}>Esqueci minha senha</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Login;

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
        marginTop: 25,
        borderRadius: 10
    },
    botao_es: {
        justifyContent: 'center',
        backgroundColor: '#1c62be',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 40,
        borderRadius: 10
    },
    desc_botao: {
        fontSize: 20,
        color: 'white'
    },
    desc_botao_es: {
        fontSize: 20,
        color: 'black'
    },
    painel_imagem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        width: 270,
        height: 200,
        resizeMode: "center"
    }
});
