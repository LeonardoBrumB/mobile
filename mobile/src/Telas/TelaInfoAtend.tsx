import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput, Alert, FlatList } from 'react-native';
import { InfoAtendProps, InfoCliProps } from '../navigation/HomeNavigator';
import Carregamento from '../navigation/Carregamento';
import firestore from "@react-native-firebase/firestore";
import { Atendimento } from '../Model/Atendimento';

type AtendimentoProps = {
    numero: number;
    atendimento: Atendimento;
    onAlterar: (id: string) => void;
    onVoltar: (id: string) => void;
}

const ItemAtendimento = (props: AtendimentoProps) => {
    const [id,] = useState('');
    const [nome,] = useState('');
    const [cpf,] = useState('');
    const [data,] = useState('');
    const [hora,] = useState('');
    const [descricao,] = useState('');
    const [isCarregando,] = useState(false);


    return (
        <ScrollView>
            <View style={styles.container_header}>
                <Text style={styles.titulo}>
                    Informação do atendimento
                </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.caixas}>
                    <Text style={styles.titulo_caixa_texto}>
                        Nome:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {nome}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Cpf:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {cpf}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Data:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {data}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Hora:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {hora}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Descrição:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {descricao}
                    </Text>

                </View>
                <View style={styles.caixa_botao}>
                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                        onPress={() => props.onAlterar(props.atendimento.id!)}
                        disabled={isCarregando}>
                        <Text style={styles.desc_botao}>Alterar</Text>
                    </Pressable>

                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                        onPress={() => props.onVoltar(props.atendimento.id)}>
                        <Text style={styles.desc_botao}>voltar</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView >
    );

}


const TelaInfoAtend = ({ navigation, route }: InfoAtendProps) => {
    const [isCarregando,] = useState(false);
    const [cliente,] = useState([] as Atendimento[]);


    function alterarCliente(id: string) {
        navigation.navigate("TelaAltCli", { id: id })
    }
    function voltar() {
        navigation.navigate("TelaConsCli")
    }

    return (
        <View style={styles.container}>
            <Carregamento isCarregando={isCarregando} />
            <FlatList
                data={cliente}
                renderItem={(info) =>
                    <ItemAtendimento
                        numero={info.index}
                        atendimento={info.item}
                        onAlterar={alterarCliente}
                        onVoltar={voltar} />}>

            </FlatList>
        </View>
    );

}

export default TelaInfoAtend;

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
