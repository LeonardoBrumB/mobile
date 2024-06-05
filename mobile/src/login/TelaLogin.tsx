import React, { useState } from 'react';
import { Alert, View, Text, Image, TextInput, StyleSheet, Pressable, ImageBackground } from 'react-native';

import auth from '@react-native-firebase/auth'

import { LoginProps } from '../navigation/HomeNavigator'

const clicou = () => {
    Alert.alert("Vitor", "Você chegou no final da execução!");
}

const TelaLogin = ({ navigation, route}: LoginProps) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isCarregando, seiIsCarregando] = useState(false);

    function logar () {
        if(verificaCampos()){
            auth()
            .signInWithEmailAndPassword(email, senha)
            .then(() => {navigation.navigate("TelaPrincipal")})
            .catch((error) => tratarErros(String(error)))
        }
    }

    function verificaCampos () {
        if(email == ''){
            Alert.alert('Email em branco', 'Digite um email')
            return false;
        }
        if(senha == ''){
            Alert.alert('Senha em branco', 'Digite uma senha')
            return false;
        }

        return true;
    }

    function tratarErros(erro: string){
        console.log(erro);
        if(erro.includes("[auth/invalid-email]")){
            Alert.alert("Email inválido", "Digite um email válido")
        }else if(erro.includes("[ INVALID_LOGIN_CREDENTIALS ]")){
            Alert.alert("Login ou senha incorretos", "")
        }else{
            Alert.alert("Erro", erro)
        }
    }

    function redefinirSenha(){
        if(email == ''){
            Alert.alert("Email em branco", "Preencha o email")
            return
        }

        auth()
            .sendPasswordResetEmail(email)
            .then(() => Alert.alert("Redefinir senha", "Enviamos um email para você redefinir a sua senha"))
            .catch((error) => console.log(error))
    }

    return (
        <>
                <View style={styles.overlay}>
                    <Image
                        source={{
                            uri: 'data:image/jpeg;base64,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'
                        }}
                        style={styles.logo}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        onChangeText={(text) => {setEmail(text)}}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Digite sua senha"
                        onChangeText={(text) => {setSenha(text)}}
                    />
                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5} : null]}
                        onPress={() => {logar()}}
                        disabled={isCarregando}
                    >
                        <Text style={styles.botaoText}>Login</Text>
                    </Pressable>
                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5} : null]}
                        onPress={() => {navigation.navigate('Cadastro')}}
                    >
                        <Text style={styles.botaoText}>Cadastrar-se</Text>
                    </Pressable>
                    <Pressable
                        style={(state) => [styles.botao_es, state.pressed ? { opacity: 0.5} : null]}
                        onPress={() => {redefinirSenha()}}
                    >
                        <Text style={styles.botaoText}>Redefinir senha</Text>
                    </Pressable>
                </View>
        </>
    );
};

export default TelaLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(20,0,300,0.5)', // Um overlay preto com 50% de opacidade
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 4,
        marginBottom: 20,
    },
    input: {
        marginTop: 15,
        padding: 10,
        width: 300,
        backgroundColor: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
        borderRadius: 3,
        color: 'black'
    },
    botao: {
        width: 160,
        height: 42,
        backgroundColor: 'indigo',
        marginTop: 15,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botao_es: {
        width: 160,
        height: 42,
        marginTop: 30,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
})