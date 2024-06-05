import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import Carregamento from "../navigation/Carregamento";
import { InfoAtendProps } from "../navigation/HomeNavigator";
import { Atendimento } from "../Model/Atendimento";
import { Cliente } from "../Model/Cliente";


const TelaInfoAtend = ({ navigation, route }: InfoAtendProps) => {
    const [id,] = useState(route.params.id);
    const [nome, setNome] = useState('');
    const [Cliente, setCliente] = useState([] as Cliente[]);
    const [Atendimento, setAtendimento] = useState([] as Atendimento[]);
    const [cpf, setCpf] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function carregar_() {
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
        setIsCarregando(false);
    };

    useEffect(() => {
        carregar_();
    }, []);

    async function carregar() {
        setIsCarregando(true);
        const resultado = await firestore()
            .collection('Atendimento')
            .doc(id)
            .get();

        const atendimento = {
            id: resultado.id,
            ...resultado.data()
        } as Atendimento;

        setData(atendimento.data);
        setHora(atendimento.hora);
        setDescricao(atendimento.descricao);
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
                <Text style={styles.titulo}>Informações do atendimento de {nome}</Text>
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
                        Data:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {data}
                    </Text>

                    <Text
                        style={styles.titulo_caixa_texto}>
                        Hora:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {hora}
                    </Text>


                    <Text
                        style={styles.titulo_caixa_texto}>
                        Descrição:
                    </Text>
                    <Text
                        style={styles.caixa_texto}>
                        {descricao}
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

export default TelaInfoAtend;

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
