import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { IClientes } from "../model/Cliente";
import Carregamento from "../navigation/Carregamento";
import { AltCliProps } from "../navigation/HomeNavigator";

const TelaAltCliente = ({ navigation, route }: AltCliProps) => {
    const [id,] = useState(route.params.id);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [datanasc, setDataNasc] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function carregar() {
        setIsCarregando(true);
        try {
            const resultado = await firestore()
                .collection('cliente')
                .doc(id)
                .get();

            const cliente = {
                id: resultado.id,
                ...resultado.data()
            } as IClientes;

            setNome(cliente.nome);
            setCpf(cliente.cpf);
            setDataNasc(cliente.dataNascimento);
            setRua(cliente.rua);
            setNumero(cliente.numero);
            setBairro(cliente.bairro);
            setComplemento(cliente.complemento);
            setCidade(cliente.cidade);
            setEstado(cliente.estado);
        } catch (error) {
            setIsCarregando(false);
            console.log(error)
        }
        setIsCarregando(false);
    };

    useEffect(() => {
        carregar();
    }, []);

    function alterar() {
        if (verificaCampos()) {
            setIsCarregando(true);
            firestore()
                .collection('cliente')
                .doc(id)
                .update({
                    nome,
                    cpf,
                    datanasc,
                    rua,
                    numero,
                    bairro,
                    complemento,
                    cidade,
                    estado,
                    created_at: firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    Alert.alert('Cliente', 'Alterado com sucesso')
                    navigation.goBack();
                })
                .catch((error) => console.log(error))
                .finally(() => setIsCarregando(false));
        }
    }

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
        setCpf(formatarCPF(text));
    }

    function validarCPF() {
        let cpfValido = cpf.replace(/\D/g, '');

        if (cpfValido.length !== 11) {
            return false;
        }

        const todosDigitosIguais = /^(\d)\1{10}$/.test(cpfValido);
        if (todosDigitosIguais) {
            return false;
        }

        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpfValido.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpfValido.substring(9, 10))) {
            return false;
        }

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpfValido.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpfValido.substring(10, 11))) {
            return false;
        }

        return true;
    }

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
        setDataNasc(dataFormatada);
    };

    function verificaCampos() {
        if (nome == '') {
            Alert.alert("Nome em branco", "Preencha o nome do cliente")
            return false;
        } if (!(/^[a-zA-Z\s]+$/.test(nome))) {
            Alert.alert("Nome inválido", "O nome do cliente deve conter apenas letras")
            return false;
        } if (cpf == '') {
            Alert.alert("CPF em branco", "Insira o CPF do cliente")
            return false;
        } if (!(cpf.length == 14)) {
            Alert.alert("CPF inválido", "O CPF do cliente deve conter 11 dígitos")
            return false;
        } if (!(validarCPF())) {
            Alert.alert("CPF inválido", "Digite um CPF válido")
            return false;
        } if (datanasc == '') {
            Alert.alert("Data de nascimento em branco", "Insira a data de nascimento do cliente")
            return false;
        } if (!(datanasc.length == 10)) {
            Alert.alert("Data de nascimento incompleta", "Digite a data completa")
            return false;
        } if (rua == '') {
            Alert.alert("Rua em branco", "Insira a rua do cliente")
            return false;
        } if (numero == '') {
            Alert.alert("Número em branco", "Insira o número do cliente")
            return false;
        } if (bairro == '') {
            Alert.alert("Bairro em branco", "Insira o bairro do cliente")
            return false;
        } if (cidade == '') {
            Alert.alert("Cidade em branco", "Insira a cidade do cliente")
            return false;
        } if (estado == '') {
            Alert.alert("Estado em branco", "Insira o estado do cliente")
            return false;
        }
        return true;
    }

    return (
        <ScrollView style={styles.container}>
            <Carregamento isCarregando={isCarregando} />

            <Text style={styles.titulo}>Alterar dados do cliente</Text>

            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={(text) => { setNome(text) }}
                placeholder='Digite o nome do cliente' />
            
            <Text style={styles.label}>CPF:</Text>
            <TextInput
                style={styles.input}
                onChangeText={ajustarCPF}
                value={cpf}
                keyboardType="numeric"
                maxLength={14}
                placeholder='Digite o CPF do cliente' />

            <Text style={styles.label}>Rua:</Text>
            <TextInput
                style={styles.input}
                value={rua}
                onChangeText={(text) => { setRua(text) }}
                placeholder='Digite a rua do cliente' />
            
            <Text style={styles.label}>Número:</Text>
            <TextInput
                style={styles.input}
                value={numero}
                onChangeText={(text) => { setNumero(text) }}
                placeholder='Digite o número do endereço do cliente' />

            <Text style={styles.label}>Bairro:</Text>
            <TextInput
                style={styles.input}
                value={bairro}
                onChangeText={(text) => { setBairro(text) }}
                placeholder='Digite o bairro do cliente' />

            <Text style={styles.label}>Complemento:</Text>
            <TextInput
                style={styles.input}
                value={complemento}
                onChangeText={(text) => { setComplemento(text) }} 
                placeholder='Digite o complemento do endereço do cliente'/>

            <Text style={styles.label}>Cidade:</Text>
            <TextInput
                style={styles.input}
                value={cidade}
                onChangeText={(text) => { setCidade(text) }}
                placeholder='Digite a cidade do cliente' />

            <Text style={styles.label}>Estado (UF):</Text>
            <TextInput
                style={styles.input}
                value={estado}
                onChangeText={(text) => { setEstado(text) }}
                maxLength={2}
                placeholder='Digite o UF do cliente' />

            <Text style={styles.label}>Data de nascimento:</Text>
            <TextInput
                style={styles.input}
                onChangeText={ajustarDataNascimento}
                value={datanasc}
                keyboardType="numeric"
                maxLength={10}
                placeholder='DD/MM/AAAA' />

            <Pressable
                style={styles.botao}
                onPress={alterar}
                disabled={isCarregando}>
                <Text style={styles.desc_botao}>Alterar</Text>
            </Pressable>
        </ScrollView>
    );
}

export default TelaAltCliente;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    titulo: {
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    label: {
        color: '#fff',
        marginBottom: 5,
        fontSize: 20
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: 'black',
        fontSize: 20
    },
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#00BFFF',
        paddingVertical: 10
    },
    desc_botao: {
        fontSize: 18,
        color: '#fff'
    },
});
