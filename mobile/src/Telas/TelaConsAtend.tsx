import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Cliente } from "../Model/Cliente";
import { ConsAtendProps, ConsCliProps } from "../navigation/HomeNavigator";
import Carregamento from "../navigation/Carregamento";
import { Atendimento } from "../Model/Atendimento";


type AtendProps = {
    numero: number;
    atendimento: Atendimento;
    onDeletar: (id: string) => void;
    onInform: (id: string) => void;
}

const ItemAtendimento = (props: AtendProps) => {

    return (
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={{ fontSize: 25 }}>
                    {props.numero + 1 + ' - ' + props.atendimento.nome}
                </Text>
                <Text style={{ fontSize: 15 }}>{props.atendimento.cpf}</Text>
            </View>

            <View style={styles.botao_info}>
                <Pressable
                    onPress={() => props.onInform(props.atendimento.id!)}>
                    <Text style={styles.texto_botao_card}>
                        i
                    </Text>
                </Pressable>
            </View>

            <View style={styles.botao_deletar}>

                <Pressable
                    onPress={() => props.onDeletar(props.atendimento.id!)}>
                    <Text style={styles.texto_botao_card}>
                        X
                    </Text>
                </Pressable>
            </View>


        </View>
    );
}

const TelaConsAtend = ({ navigation, route }: ConsAtendProps) => {
    const [cliente, setCliente] = useState([] as Cliente[]);
    const [atendimento, setAtendimento] = useState([] as Atendimento[]);
    const [isCarregando, setIsCarregando] = useState(false);

    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
            .collection('Atendimento')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {

                    return {
                        id: doc.id,
                        ...doc.data()
                    }

                }) as Atendimento[];

                setAtendimento(data);
                setIsCarregando(false);
            });

        return () => subscribe();
    }, []);

    function infoAtendimento(id: string) {
        navigation.navigate("TelaInfoAtend", { id: id })
    }

    function deletarAtendimento(id: string) {

        setIsCarregando(true);

        firestore()
            .collection('Atendimento')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("Atendimento", " removido com sucesso")
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Carregamento isCarregando={isCarregando} />
                <View style={styles.container_header}>
                    <Text style={styles.titulo}>Lista de Atendimentos</Text>
                </View>
                <FlatList
                    data={atendimento}
                    renderItem={(info) =>
                        <ItemAtendimento
                            numero={info.index}
                            atendimento={info.item}
                            onDeletar={deletarAtendimento}
                            onInform={infoAtendimento} />}>

                </FlatList>
                <Pressable
                    style={styles.botao}
                    onPress={() => { navigation.goBack() }}>
                    <Text style={styles.desc_botao}>
                        voltar
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default TelaConsAtend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: '110%',
    },
    container_header: {
        flex: 1,
        backgroundColor: '#164d96',
        paddingBottom: 30,
    },
    titulo: {
        paddingTop: 35,
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
    },
    card: {
        borderWidth: 2,
        borderColor: 'grey',
        margin: 5,
        marginTop: 20,
        borderRadius: 10,
        padding: 3,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    dados_card: {
        flex: 1
    },
    botao_deletar: {
        backgroundColor: 'red',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao_alterar: {
        backgroundColor: 'green',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao_info: {
        backgroundColor: 'yellow',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto_botao_card: {
        fontWeight: "bold",
        fontSize: 30,
        color: 'black'
    },
    botao: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 10,
        marginHorizontal: 100,
    },
    desc_botao: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    },
});
