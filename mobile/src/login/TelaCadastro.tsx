import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ScrollViewComponent, ScrollView } from 'react-native';
import { CadUsuarioProps } from '../navigation/HomeNavigator';
import auth from "@react-native-firebase/auth"
import Carregamento from '../navigation/Carregamento';

const Cadastro = ({ navigation, route }: CadUsuarioProps) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function cadastro() {
        if (verificaCampos()) {
            auth()
                .createUserWithEmailAndPassword(email, senha)
                .then(() => {
                    Alert.alert("conta",
                        "cadastrado com sucesso!"
                    )
                    navigation.goBack();
                })
                .catch((error) => { tratarErros(String(error)) })
                .finally(() => {
                    setIsCarregando(false)
                });
        }
        setIsCarregando(false);
    }

    function verificaCampos() {
        let resultado = true;

        if (email == '') {
            Alert.alert("Email em branco", "Digite um email")
            return false;
        }
        if (senha == '') {
            Alert.alert("Senha em branco", "Digite uma senha")
            return false;
        }
        if (confSenha == '') {
            Alert.alert("Comfirmação de senha em branco!",
                "Digite a confirmação de senha"
            )
            return false;
        }
        if (senha != confSenha) {
            Alert.alert("Comfirmação de senha em branco!",
                "Digite a confirmação de senha"
            )
            return false;
        }

        return true;
    }

    function tratarErros(erro: string) {
        console.log(erro);
        if (erro.includes("[auth/invalid-email]")) {
            Alert.alert("Email inválido", "Digite um email válido")
        } else if (erro.includes("[auth/weak-password]")) {
            Alert.alert("Senha fraca", "A senha deve conter no mínimo 6 dígitos.")
        }
        else if (erro.includes("[auth/email-already-in-use]")) {
            Alert.alert("email em uso", "O email inserido já foi cadastrado em outra conta.")
        } else {
            Alert.alert("Erro", erro)
        }
    }

    return (
        <View style={styles.container}>
            <Carregamento isCarregando={isCarregando} />
            <View style={styles.painel_imagem}>
                <Image
                    style={styles.imagem}
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
            </View>

            <View style={styles.container_cadastro}>
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
                <Text
                    style={styles.titulo_caixa_texto}>
                    Confirmar senha
                </Text>
                <TextInput
                    style={styles.caixa_texto}
                    secureTextEntry={true}
                    onChangeText={(text) => { setConfSenha(text) }} />

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => cadastro()}
                    disabled={isCarregando}>
                    <Text style={styles.desc_botao}>Cadastrar</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaLogin') }}>
                    <Text style={styles.desc_botao}>Logar</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Cadastro;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#1c62be'
    },
    container_cadastro: {
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
        marginTop: 30,
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
