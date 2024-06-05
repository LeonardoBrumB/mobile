import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Cliente } from "../Model/Cliente";
import { ConsAtendProps } from "../navigation/HomeNavigator";
import Carregamento from "../navigation/Carregamento";
import { Atendimento } from "../Model/Atendimento";

type AtendimentoProps = {
    numero: number;
    atendimento: Atendimento;
    onDeletar: (id: string) => void;
    onInform: (id: string) => void;
}

const ItemAtendimento = (props: AtendimentoProps) => {

    return (
        <ScrollView>
            <View style={styles.card}>
                <View style={styles.dados_card}>
                    <Text style={{ fontSize: 35 }}>
                        {props.numero + 1 + ' - ' + props.atendimento.nome}
                    </Text>
                    <Text style={{ fontSize: 20 }}>{props.atendimento.cpf}</Text>
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
        </ScrollView>
    );
}

const TelaConsCli = ({ navigation, route }: ConsAtendProps) => {
    const [atendimento, setAtendimento] = useState([] as Atendimento[]);
    const [isCarregando, setIsCarregando] = useState(false);



    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
            .collection('atendimento')
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

    function infoAtendimeto(id: string) {
        navigation.navigate("TelaInfoAtend", { id: id })
    }

    function deletarAtendimento(id: string) {

        setIsCarregando(true);

        firestore()
            .collection('atendimento')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("atendimento removido com sucesso")
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));

    }

    return (
        <ScrollView>
            <Carregamento isCarregando={isCarregando} />

            <View style={styles.container_header}>
                <Text style={styles.titulo}>Listagem de Atendimentos</Text>
            </View><View style={styles.container}>
                <FlatList
                    data={atendimento}
                    renderItem={(info) =>
                        <ItemAtendimento
                            numero={info.index}
                            atendimento={info.item}
                            onDeletar={deletarAtendimento}
                            onInform={infoAtendimeto} />}>

                </FlatList>
            </View>
        </ScrollView>
    );
}

export default TelaConsCli;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c62be'
    },
    container_header: {
        flex: 1,
        backgroundColor: '#164d96',
        paddingBottom: 50,
    },
    titulo: {
        fontSize: 40,
        textAlign: 'center',
        color: 'black'
    },
    card: {
        borderWidth: 2,
        borderColor: 'grey',
        margin: 5,
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
    botao_info: {
        backgroundColor: 'yellow',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto_botao_card: {
        fontWeight: "bold",
        fontSize: 40,
        color: 'black'
    }
});
