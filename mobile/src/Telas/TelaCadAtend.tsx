import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Cliente } from "../Model/Cliente";
import Carregamento from "../navigation/Carregamento";
import { AltCliProps, CadAtendProps } from "../navigation/HomeNavigator";
import { Atendimento } from "../Model/Atendimento";


const TelaCadAtend = ({ navigation, route }: CadAtendProps) => {
    const [id,] = useState(route.params.id);
    const [nome, setNome] = useState('');
    const [cliente, setCliente] = useState('');
    const [cpf, setCpf] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [descricao, setDescricao] = useState('');
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
        setIsCarregando(false);
    };

    useEffect(() => {
        carregar();
    }, []);

    function verificaCampos() {
        if (data == '') {
            Alert.alert("Data em branco",
                "Digite uma data")
            return false;
        }
        if (hora == '') {
            Alert.alert("Hora em branco",
                "Digite uma hora")
            return false;
        }
        if (descricao == '') {
            Alert.alert("Descrição em branco",
                "Digite uma descrição")
            return false;
        }
        return true;
    }

    function cadastrar() {
        setIsCarregando(true);

        if (verificaCampos()) {
            let atendimento = {
                id: id,
                nome: nome,
                cpf: cpf,
                data: data,
                hora: hora,
                descricao: descricao,
                created_at: firestore.FieldValue.serverTimestamp()
            } as Atendimento;

            firestore()
                .collection('Atendimento')
                .add(atendimento)
                .then(() => {
                    Alert.alert("Atendimento", "Cadastrado com sucesso")
                    navigation.navigate('TelaPrincipal')
                })
                .catch((error) => console.log(error))
                .finally(() => setIsCarregando(false));
        }
        setIsCarregando(false);
    }

    const formatarHora = (text: string) => {
        let horaFormatado = text.replace(/\D/g, '');

        if (horaFormatado.length > 2) {
            horaFormatado = horaFormatado.replace(/^(\d{2})(\d)/g, '$1:$2');
        }

        return horaFormatado.substring(0, 5);
    };

    const ajustarHora = (text: string) => {
        const horaFormatado = formatarHora(text);
        setHora(horaFormatado);
    };

    const formataData = (text: string) => {
        let cpfFormat = text.replace(/\D/g, '');

        if (cpfFormat.length > 2) {
            cpfFormat = cpfFormat.replace(/^(\d{2})(\d)/g, '$1/$2');
            if (cpfFormat.length > 6) {
                cpfFormat = cpfFormat.replace(/^(\d{2})\/(\d{2})(\d)/g, '$1/$2/$3');
            }
        }
        return cpfFormat.substring(0, 10);
    }

    const ajustarData = (text: string) => {
        const dataFormatado = formataData(text);
        setData(dataFormatado);
    }

    return (
        <ScrollView>
            <View
                style={styles.container_header}>
                <Carregamento isCarregando={isCarregando} />
                <Text style={styles.titulo}>Atendimento para {nome}</Text>
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


                    <Text style={styles.titulo_caixa_texto}>
                        Data:
                    </Text>
                    <TextInput style={styles.caixa_texto}
                        onChangeText={ajustarData}
                        placeholder="00/00/00"
                        keyboardType="numeric"
                        maxLength={10}
                        value={data}>

                    </TextInput>

                    <Text style={styles.titulo_caixa_texto}>
                        Hora:
                    </Text>
                    <TextInput style={styles.caixa_texto}
                        onChangeText={ajustarHora}
                        placeholder="00:00"
                        keyboardType="numeric"
                        maxLength={5}
                        value={hora}>

                    </TextInput>

                    <Text style={styles.titulo_caixa_texto}>
                        Descrição:
                    </Text>
                    <TextInput style={styles.caixa_texto}
                        multiline
                        value={descricao}
                        numberOfLines={8}
                        maxLength={200}
                        onChangeText={(text) => { setDescricao(text) }}>

                    </TextInput>

                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                        onPress={() => cadastrar()}
                        disabled={isCarregando}>
                        <Text style={styles.desc_botao}>Cadastrar atendimento</Text>
                    </Pressable>
                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                        onPress={() => { navigation.goBack() }}
                        disabled={isCarregando}>
                        <Text style={styles.desc_botao}>Voltar</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView >
    );
}

export default TelaCadAtend;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 30,
        flex: 1,
        backgroundColor: '#1c62be',
    },
    caixas: {
        flex: 2,
        alignItems: 'center'
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
        paddingTop: 30,
        fontSize: 35,
        color: 'white',
        textAlign: 'center',
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 25,
        borderRadius: 10
    },
    desc_botao: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    },
    titulo_caixa_texto: {
        paddingTop: 15,
        fontSize: 25,
        color: 'black',
        paddingBottom: 5,
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white',
        fontSize: 20,
    },
});
