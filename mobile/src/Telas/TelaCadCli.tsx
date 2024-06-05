import React, { useState } from 'react';
import { TextInput, View, Alert, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Carregamento from '../navigation/Carregamento';
import { CadCliProps } from "../navigation/HomeNavigator";
import { Cliente } from '../model/Cliente';

const TelaCadCli = ({ navigation, route }: CadCliProps) => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    const formatarCPF = (text: string) => {
        let cpfFormatado = text.replace(/\D/g, '');

        if (cpfFormatado.length > 3) {
            cpfFormatado = cpfFormatado.replace(/^(\d{3})(\d)/g, '$1.$2');
            if (cpfFormatado.length > 7) {
                cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
                if (cpfFormatado.length > 11) {
                    cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3-$4');
                }
            }
        }

        return cpfFormatado.substring(0, 14);
    };

    const ajustarCPF = (text: string) => {
        const cpfFormatado = formatarCPF(text);
        setCpf(cpfFormatado);
    };

    const formatarData = (text: string) => {
        let dataFormatada = text.replace(/\D/g, '');

        if (dataFormatada.length > 2) {
            dataFormatada = dataFormatada.replace(/^(\d{2})(\d)/g, '$1/$2');
            if (dataFormatada.length > 5) {
                dataFormatada = dataFormatada.replace(/^(\d{2})\/(\d{2})(\d)/g, '$1/$2/$3');
            }
        }

        return dataFormatada.substring(0, 10);
    };

    const ajustarDataNascimento = (text: string) => {
        const dataFormatada = formatarData(text);
        setDataNascimento(dataFormatada);
    };

    const cadastrar = () => {
        setIsCarregando(true);

        if (verificaCampos()) {
            let cliente = {
                nome: nome,
                cpf: cpf,
                rua: rua,
                numero: numero,
                bairro: bairro,
                complemento: complemento,
                cidade: cidade,
                estado: estado,
                dataNascimento: dataNascimento,
                created_at: firestore.FieldValue.serverTimestamp()
            } as Cliente;

            firestore()
                .collection('clientes')
                .add(cliente)
                .then(() => {
                    Alert.alert("Cliente", "Cadastrado com sucesso");
                    navigation.navigate("TelaPrincipal");
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert("Erro", "Ocorreu um erro ao cadastrar o cliente.");
                })
                .finally(() => setIsCarregando(false));
        } else {
            setIsCarregando(false);
        }
    };

    function verificaCampos() {
        if (nome === '') {
            Alert.alert("Nome em branco", "Preencha o Nome");
            return false;
        } else if (!(/^[a-zA-Z\s]+$/.test(nome))) {
            Alert.alert("Formato do nome inválido", "O nome deve conter apenas letras.");
            return false;
        } else if (cpf === '') {
            Alert.alert("CPF em branco", "Digite seu CPF");
            return false;
        } else if (cpf.length !== 14) {
            Alert.alert("CPF inválido", "Deve ser informado um CPF com 11 dígitos");
            return false;
        } else if (dataNascimento === '') {
            Alert.alert("Data de Nascimento em branco", "Preencha a Data de Nascimento");
            return false;
        } else if (dataNascimento.length !== 10) {
            Alert.alert("Data de nascimento inválida", "Números insuficientes");
            return false;
        } else if (rua === '') {
            Alert.alert("Rua em branco", "Digite a rua");
            return false;
        } else if (bairro === '') {
            Alert.alert("Bairro em branco", "Digite seu bairro");
            return false;
        } else if (cidade === '') {
            Alert.alert("Cidade em branco", "Digite sua cidade");
            return false;
        } else if (estado === '') {
            Alert.alert("Estado em branco", "Digite seu estado");
            return false;
        }
        return true;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Carregamento isCarregando={isCarregando} />
                <View style={styles.container_header}>
                    <Text style={styles.titulo_T}>
                        Cadastrar cliente
                    </Text>
                </View>
                <View style={styles.container_body}>
                    <Text style={styles.titulo}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setNome(text) }}
                        placeholder='Nome' />

                    <Text style={styles.titulo}>CPF</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ajustarCPF}
                        value={cpf}
                        keyboardType="numeric"
                        maxLength={14}
                        placeholder='CPF' />

                    <Text style={styles.titulo}>Data de Nascimento</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ajustarDataNascimento}
                        value={dataNascimento}
                        keyboardType="numeric"
                        maxLength={10}
                        placeholder='DD/MM/YYYY' />

                    <Text style={styles.titulo}>Rua</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setRua(text) }}
                        placeholder='Rua' />

                    <Text style={styles.titulo}>Número</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setNumero(text.toString()) }}
                        placeholder='Número'
                        keyboardType='numeric' />

                    <Text style={styles.titulo}>Bairro</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setBairro(text) }}
                        placeholder='Bairro' />

                    <Text style={styles.titulo}>Complemento</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setComplemento(text) }}
                        placeholder='Complemento' />

                    <Text style={styles.titulo}>Cidade</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setCidade(text) }}
                        placeholder='Cidade' />

                    <Text style={styles.titulo}>Estado</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => { setEstado(text) }}
                        placeholder='Estado' />

                    <Pressable
                        style={styles.botao}
                        onPress={() => { cadastrar() }}>
                        <Text style={styles.desc_botao}>Cadastrar</Text>
                    </Pressable>
                    <Pressable
                        style={styles.botao}
                        onPress={() => { navigation.goBack() }}>
                        <Text style={styles.desc_botao}>Voltar</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

export default TelaCadCli;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(20,0,300,0.5)',
    },
    container_header: {
        backgroundColor: 'rgba(20,0,300,0.5)',
        paddingBottom: 30,
        paddingTop: 30,
    },
    container_body: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 30,
    },
    titulo: {
        color: 'white',
        fontSize: 23,
        marginBottom: 3,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    titulo_T: {
        color: 'white',
        fontSize: 30,
        marginLeft: 50,
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        height: 43,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 19,
        color: 'black'
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

