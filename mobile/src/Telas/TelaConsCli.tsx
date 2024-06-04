import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Cliente } from "../Model/Cliente";
import { ConsCliProps } from "../navigation/HomeNavigator";
import Carregamento from "../navigation/Carregamento";

type ClienteProps = {
    numero: number;
    cliente: Cliente;
    onAlterar: (cpf: string) => void;
    onDeletar: (cpf: string) => void;
}

const ItemNota = (props: ClienteProps) => {

    return (
        <ScrollView>
            <View style={styles.card}>
                <View style={styles.dados_card}>
                    <Text style={{ fontSize: 35 }}>
                        {props.numero + 1 + ' - ' + props.cliente.nome}
                    </Text>
                    <Text style={{ fontSize: 20 }}>{props.cliente.cpf}</Text>
                </View>

                <View style={styles.botao_alterar}>
                    <Pressable
                        onPress={() => props.onAlterar(props.cliente.id!)}>
                        <Text style={styles.texto_botao_card}>
                            A
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.botao_deletar}>

                    <Pressable
                        onPress={() => props.onDeletar(props.cliente.id!)}>
                        <Text style={styles.texto_botao_card}>
                            X
                        </Text>
                    </Pressable>
                </View>

            </View>
        </ScrollView>
    );
}

const TelaConsCli = ({ navigation, route }: ConsCliProps) => {
    const [cliente, setCliente] = useState([] as Cliente[]);
    const [isCarregando, setIsCarregando] = useState(false);

    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
            .collection('cliente')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {

                    return {
                        id: doc.id,
                        ...doc.data()
                    }

                }) as Cliente[];

                setCliente(data);
                setIsCarregando(false);
            });

        return () => subscribe();
    }, []);

    function alterarCliente(cpf: string) {
        navigation.navigate("TelaAltCli", { id: cpf })
    }

    function deletarCliente(cpf: string) {
        setIsCarregando(true);

        firestore()
            .collection('cliente')
            .doc(cpf)
            .delete()
            .then(() => {
                Alert.alert("Cliente removido com sucesso")
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));
    }

    return (
        <View style={styles.container}>
            <Carregamento isCarregando={isCarregando} />

            <Text style={styles.titulo}>Listagem de clientes</Text>
            <FlatList
                data={cliente}
                renderItem={(info) =>
                    <ItemNota
                        numero={info.index}
                        cliente={info.item}
                        onAlterar={alterarCliente}
                        onDeletar={deletarCliente} />}>

            </FlatList>
        </View>
    );
}

export default TelaConsCli;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c62be'
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
    botao_alterar: {
        backgroundColor: 'green',
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
