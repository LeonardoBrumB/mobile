import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ImageBackground } from 'react-native';

import auth from "@react-native-firebase/auth";
import { CadUsuarioProps } from '../navigation/HomeNavigator';
import Carregamento from '../navigation/Carregamento'

const Cadastro = ({ navigation, route }: CadUsuarioProps) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    function login() {

        if (verificaCampos()) {

            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(() => { Alert.alert('Logado com sucesso') })
                .catch((error) => tratarErros(String(error)))
        }
    }

    async function cadastrar() {
        setIsCarregando(true);

        if (verificaCampos()) {
            auth()
                .createUserWithEmailAndPassword(email, senha)
                .then(() => {
                    Alert.alert("Conta", "Cadastrada com sucesso")
                    navigation.goBack();
                })
                .catch((error) => { tratarErros(String(error)) })
                .finally(() => {
                    setIsCarregando(false)
                });
        }
        setIsCarregando;
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
        if (confirmaSenha == '') {
            Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
            return false;
        }
        if (senha != confirmaSenha) {
            Alert.alert("Senhas diferentes", "Digite senha iguais")
            return false;
        }

        return true;
    }

    function tratarErros(erro: string) {
        console.log(erro);
        if (erro.includes("[auth/invalid-email]")) {
            Alert.alert("Email inválido", "Digite um email válido")
        } else if (erro.includes("[auth/weak-password]")) {
            Alert.alert("Senha Fraca", "A senha digitada é fraca. A senha deve pelo " + "menos 6 dígitos.")
        } else if (erro.includes("[auth/email-already-in-use]")) {
            Alert.alert("Email em uso", "O email inserido já foi cadastrado em outra conta.")
        } else {
            Alert.alert("Erro", erro)
        }
    }

    return (
        <>
            <View style={styles.overlay}>
                <Image
                    source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9vlmDxgC4bB3txRrBZLQmiAhy69KVGA5roA&usqp=CAU'
                    }}
                    style={styles.logo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    onChangeText={(text) => { setEmail(text) }}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Digite sua senha"
                    onChangeText={(text) => { setSenha(text) }}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Confirme sua senha"
                    onChangeText={(text) => { setConfirmaSenha(text) }}
                />
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { cadastrar() }}
                >
                    <Text style={styles.botaoText}>Cadastrar</Text>
                </Pressable>
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.goBack() }}
                >
                    <Text style={styles.botaoText}>Voltar ao login</Text>
                </Pressable>
            </View>
        </>
    );
}

export default Cadastro;

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
});
