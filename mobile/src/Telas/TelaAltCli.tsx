import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Cliente } from "../Model/Cliente";
import Carregamento from "../navigation/Carregamento";
import { AltCliProps } from "../navigation/HomeNavigator";


const TelaAltCli = ({ navigation, route }: AltCliProps) => {
    const [id,] = useState(route.params.id);
    const [nome, setNome] = useState('');
    const [cliente, setCliente] = useState('');
    const [cpf, setCpf] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function carregar() {
        setIsCarregando(true);
        const resultado = await firestore()
            .collection('cliente')
            .doc(id)
            .get();

        const cliente = {
            id: resultado.id,
            ...resultado.data()
        } as Cliente;

        setNome(cliente.nome);
        setCpf(cliente.cpf);
        setRua(cliente.rua);
        setNumero(cliente.numero);
        setBairro(cliente.bairro);
        setComplemento(cliente.complemento);
        setCidade(cliente.cidade);
        setEstado(cliente.estado);
        setDataNasc(cliente.dataNasc);
        setIsCarregando(false);
    };

    useEffect(() => {
        carregar();
    }, []);

    function alterar() {
        setIsCarregando(true);

        firestore()
            .collection('cliente')
            .doc(id)
            .update({
                nome,
                cpf,
                rua,
                numero,
                bairro,
                complemento,
                cidade,
                estado,
                dataNasc,
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Cliente", "Alterado com sucesso")
                navigation.goBack();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));
    }

    const formataCpf = (text: string) => {
        let cpfFormat = text.replace(/\D/g, '');

        if (cpfFormat.length > 3) {
            cpfFormat = cpfFormat.replace(/^(\d{3})(\d)/g, '$1.$2');
            if (cpfFormat.length > 7) {
                cpfFormat = cpfFormat.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
                if (cpfFormat.length > 11) {
                    cpfFormat = cpfFormat.replace(/^(\d{3})\.(\d{3})\.(\d{ 3})(\d)/g, '$1.$2.$3-$4');
                }
            }
        }
        return cpfFormat.substring(0, 14);
    }

    const ajustaCpf = (text: string) => {
        const cpfFormatado = formataCpf(text);
        setCpf(cpfFormatado);
    }

    return (
        <ScrollView>
            <View
                style={styles.container_header}>
                <Carregamento isCarregando={isCarregando} />
                <Text style={styles.titulo}>Alterar {nome}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.caixas}>

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Nome:
                    </Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={nome}
                        onChangeText={(text) => { setNome(text) }} />

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Cpf:
                    </Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={cpf}
                        maxLength={14}
                        onChangeText={ajustaCpf}
                        keyboardType="numeric" />

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Rua:
                    </Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={rua}
                        onChangeText={(text) => { setRua(text) }} />

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Numero:
                    </Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={numero}
                        onChangeText={(text) => { setNumero(text.toString()) }}
                        keyboardType="numeric" />

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Bairro:
                    </Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={bairro}
                        onChangeText={(text) => { setBairro(text) }} />

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Complemento:
                    </Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={complemento}
                        onChangeText={(text) => { setComplemento(text) }} />

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Cidade:
                    </Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={cidade}
                        onChangeText={(text) => { setCidade(text) }} />

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Estado:
                    </Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={estado}
                        onChangeText={(text) => { setEstado(text) }} />

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Numero:
                    </Text>
                    <TextInput
                        style={styles.caixa_texto}
                        value={numero}
                        maxLength={8}
                        onChangeText={(text) => { setNumero(text.toString()) }}
                        keyboardType="numeric" />
                </View>
                <View style={styles.caixa_botao}>
                    <Pressable
                        style={styles.botao}
                        onPress={() => alterar()}
                        disabled={isCarregando}>
                        <Text style={styles.desc_botao}>Alterar</Text>
                    </Pressable>
                    <Pressable
                        style={styles.botao}
                        onPress={() => { navigation.navigate('TelaConsCli') }}
                        disabled={isCarregando}>
                        <Text style={styles.desc_botao}>Voltar</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView >
    );
}

export default TelaAltCli;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: '100%',
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
        alignItems: 'center',
        width: '70%',
        color: 'black',
        margin: 3,
        backgroundColor: 'white',
    },
});
