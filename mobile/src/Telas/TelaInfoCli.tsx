import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Cliente } from "../Model/Cliente";
import Carregamento from "../navigation/Carregamento";
import { InfoCliProps } from "../navigation/HomeNavigator";


const TelaInfoCli = ({ navigation, route }: InfoCliProps) => {
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


    return (
        <ScrollView>
            <View
                style={styles.container_header}>
                <Carregamento isCarregando={isCarregando} />
                <Text style={styles.titulo}>Informações de {nome}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.caixas}>

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Nome:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {nome}
                    </Text>

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Cpf:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {cpf}
                    </Text>

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Rua:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {rua}
                    </Text>

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Numero:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {numero}
                    </Text>


                    <Text
                        style={styles.titulo_caixa_texto}>
                        Bairro:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {bairro}
                    </Text>

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Complemento:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {complemento}
                    </Text>

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Cidade:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {cidade}
                    </Text>

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Estado:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {estado}
                    </Text>

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Data de nascimento:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {dataNasc}
                    </Text>
                    
                </View>
                <View style={styles.caixa_botao}>
                    <Pressable
                        style={styles.botao}
                        onPress={() => { navigation.goBack() }}
                        disabled={isCarregando}>
                        <Text style={styles.desc_botao}>Voltar</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView >
    );
}

export default TelaInfoCli;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: 25,
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
        paddingBottom: 40,
    },
    titulo: {
        paddingTop: 35,
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
    },
    botao: {
        backgroundColor: 'blue',
        paddingVertical: 20,
        marginTop: 30,
        borderRadius: 10,
        marginHorizontal: 70,
    },
    desc_botao: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    },
    titulo_caixa_texto: {
        marginTop: 30,
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
        fontSize: 20,
    },
});
