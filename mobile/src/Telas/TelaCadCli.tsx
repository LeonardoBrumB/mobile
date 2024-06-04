import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { CadCliProps } from '../navigation/HomeNavigator';
import Carregamento from '../navigation/Carregamento';
import { Cliente } from '../Model/Cliente';
import firestore from "@react-native-firebase/firestore";



const TelaCadCli = ({ navigation, route }: CadCliProps) => {
    const [id,] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    function cadastrar() {
        setIsCarregando(true);

        if (verificaCampos()) {
            let cliente = {
                id: id,
                nome: nome,
                cpf: cpf,
                rua: rua,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                dataNasc: dataNasc,
                created_at: firestore.FieldValue.serverTimestamp()
            } as Cliente;

            firestore()
                .collection('cliente')
                .add(cliente)
                .then(() => {
                    Alert.alert("cliente", "Cadastrado com sucesso")
                    navigation.navigate('TelaPrincipal')
                })
                .catch((error) => console.log(error))
                .finally(() => setIsCarregando(false));
        }
        setIsCarregando(false);
    }

    function verificaCampos() {
        if (nome == '') {
            Alert.alert("Nome em branco",
                "Digite um nome")
            return false;
        }
        if (cpf == '') {
            Alert.alert("Cpf em branco",
                "Digite um Cpf")
            return false;
        }
        if (rua == '') {
            Alert.alert("rua em branco",
                "Digite uma rua")
            return false;
        }
        if (numero == '') {
            Alert.alert("numero em branco",
                "Digite um numero")
            return false;
        }
        if (bairro == '') {
            Alert.alert("Bairro em branco",
                "Digite um bairro")
            return false;
        }
        if (cidade == '') {
            Alert.alert("Cidade em branco",
                "Digite uma cidade")
            return false;
        }
        if (estado == '') {
            Alert.alert("Estado em branco",
                "Digite um estado")
            return false;
        }
        if (dataNasc == '') {
            Alert.alert("Data de nascimento em branco",
                "Digite uma data de nascimento")
            return false;
        }

        return true;
    }

    function formataCPF(cpf) {
        const cpfAtual = cpf.value

        let cpfAtualizado;

        cpfAtualizado = cpfAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
            function (regex, argumento1, argumento2, argumento3, argumento4) {
                return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
            })
        cpf = cpfAtualizado;
    }

    function formataData(dataNasc) {
        const dataAtual = dataNasc.value

        let dataAtualizada;

        dataAtualizada = dataAtual.replace(/(\d{2})(\d{2})(\d{4})/,
            function (regex, argumento1, argumento2, argumento3) {
                return argumento1 + '/' + argumento2 + '/' + argumento3;
            })
        dataNasc = dataAtualizada;
    }


    return (
        <ScrollView>
            <View style={styles.container_header}>
                <Text style={styles.titulo}>
                    Cadastro de cliente
                </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.caixas}>
                    <Text style={styles.titulo_caixa_texto}>
                        Nome:
                    </Text>
                    <TextInput style={styles.caixa_texto}
                        onChangeText={(text) => { setNome(text) }}>

                    </TextInput>

                    <Text style={styles.titulo_caixa_texto}>
                        Cpf:
                    </Text>
                    <TextInput style={styles.caixa_texto}
                        onChangeText={(text) => { setCpf(text.toString()) }}
                        maxLength={11}
                        keyboardType='numeric' />
                    {formataCPF(cpf)}

                </TextInput>

                <Text style={styles.titulo_caixa_texto}>
                    Rua:
                </Text>
                <TextInput style={styles.caixa_texto}
                    onChangeText={(text) => { setRua(text) }}>

                </TextInput>

                <Text style={styles.titulo_caixa_texto}>
                    Número:
                </Text>
                <TextInput style={styles.caixa_texto}
                    onChangeText={(text) => { setNumero(text.toString()) }}
                    keyboardType='numeric'>

                </TextInput>

                <Text style={styles.titulo_caixa_texto}>
                    Bairro:
                </Text>
                <TextInput style={styles.caixa_texto}
                    onChangeText={(text) => { setBairro(text) }}>

                </TextInput>

                <Text style={styles.titulo_caixa_texto}>
                    Complemento:
                </Text>
                <TextInput style={styles.caixa_texto}
                    onChangeText={(text) => { setComplemento(text) }}>

                </TextInput>

                <Text style={styles.titulo_caixa_texto}>
                    Cidade:
                </Text>
                <TextInput style={styles.caixa_texto}
                    onChangeText={(text) => { setCidade(text) }}>

                </TextInput>

                <Text style={styles.titulo_caixa_texto}>
                    Estado:
                </Text>
                <TextInput style={styles.caixa_texto}
                    onChangeText={(text) => { setEstado(text) }}>

                </TextInput>

                <Text style={styles.titulo_caixa_texto}>
                    Data de nascimento:
                </Text>
                <TextInput style={styles.caixa_texto}
                    onChangeText={(text) => { setDataNasc(text.toString()) }}
                    maxLength={8}
                    keyboardType='numeric'>
                        {formataData(dataNasc)}

                </TextInput>
            </View>
            <View style={styles.caixa_botao}>
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => cadastrar()}
                    disabled={isCarregando}>
                    <Text style={styles.desc_botao}>Cadastrar</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaPrincipal') }}>
                    <Text style={styles.desc_botao}>voltar</Text>
                </Pressable>
            </View>
        </View>
        </ScrollView >
    );
}

export default TelaCadCli;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: 100,
    },
    caixas: {
        alignItems: 'center',
    },
    caixa_botao: {
        paddingTop: 15,
    },
    container_header: {
        flex: 1,
        backgroundColor: '#164d96',
        paddingBottom: 60,
    },
    titulo: {
        paddingTop: 55,
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
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
    titulo_caixa_texto: {
        paddingTop: 10,
        fontSize: 25,
        color: 'black',
        paddingBottom: 10,
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white',
    },
});
