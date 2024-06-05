import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Cliente } from "../Model/Cliente";
import { ConsCliProps } from "../navigation/HomeNavigator";
import Carregamento from "../navigation/Carregamento";


type ClienteProps = {
    numero: number;
    cliente: Cliente;
    onAlterar: (id: string) => void;
    onDeletar: (id: string) => void;
    onInform: (id: string) => void;
}

const ItemCliente = (props: ClienteProps) => {

    return (
        <ScrollView>
            <View style={styles.card}>
                <View style={styles.dados_card}>
                    <Text style={{ fontSize: 35 }}>
                        {props.numero + 1 + ' - ' + props.cliente.nome}
                    </Text>
                    <Text style={{ fontSize: 20 }}>{props.cliente.cpf}</Text>
                </View>

                <View style={styles.botao_info}>
                    <Pressable
                        onPress={() => props.onInform(props.cliente.id!)}>
                        <Text style={styles.texto_botao_card}>
                            i
                        </Text>
                    </Pressable>
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

    function alterarCliente(id: string) {
        navigation.navigate("TelaAltCli", { id: id })
    }
    function infoCliente(id: string) {
        navigation.navigate("TelaInfoCli", { id: id })
    }

    function deletarCliente(id: string) {

        setIsCarregando(true);

        firestore()
            .collection('cliente')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("Cliente removido com sucesso")
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Carregamento isCarregando={isCarregando} />
                <View style={styles.container_header}>
                    <Text style={styles.titulo}>Listagem de clientes</Text>
                </View>
                <FlatList
                    data={cliente}
                    renderItem={(info) =>
                        <ItemCliente
                            numero={info.index}
                            cliente={info.item}
                            onAlterar={alterarCliente}
                            onDeletar={deletarCliente}
                            onInform={infoCliente} />}>

                </FlatList>
                <Pressable
                    style={styles.botao}
                    onPress={() => { navigation.navigate('TelaPrincipal') }}>
                    <Text style={styles.desc_botao}>
                        voltar
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default TelaConsCli;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: '100%',
    },
    container_header: {
        flex: 1,
        backgroundColor: '#164d96',
        paddingBottom: 50,
    },
    titulo: {
        paddingTop: 55,
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
        fontSize: 40,
        color: 'black'
    },
    botao: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 10,
        marginHorizontal: 80,
    },
    desc_botao: {
        textAlign: 'center',
        fontSize: 35,
        color: 'white'
    },
});
