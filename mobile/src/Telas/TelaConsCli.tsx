import React, { useEffect, useState } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Cliente } from "../model/Cliente";
import { ConCliProps } from "../navigation/HomeNavigator";
import Carregamento from "../navigation/Carregamento";

type ClientesProps = {
    numero: number;
    clientes: Cliente;
    onAlterar: (id: string) => void;
    onDeletar: (id: string) => void;
}

const ItemCliente = (props: ClientesProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={styles.titulo}>
                    {' Nome: ' + props.clientes.nome}
                </Text>
                <Text style={styles.cpf}>
                    {'CPF: ' + props.clientes.cpf}
                </Text>
                <Text style={styles.cpf}>
                    {'Data de nascimento: ' + props.clientes.dataNascimento}
                </Text>
            </View>
            <View style={styles.botoes}>
                <Pressable
                    style={styles.botao_alt}
                    onPress={() => props.onAlterar(props.clientes.id!)}>
                    <Text style={styles.texto_botao_card}>
                        A
                    </Text>
                </Pressable>
                <Pressable
                    style={styles.botao_del}
                    onPress={() => props.onDeletar(props.clientes.id!)}>
                    <Text style={styles.texto_botao_card}>
                        X
                    </Text>
                </Pressable>

            </View>
        </View>
    );
}

const TelaConClientes = ({ navigation, route }: ConCliProps) => {
    const [clientes, setClientes] = useState([] as Cliente[]);
    const [isCarregando, setIsCarregando] = useState(false);

    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
            .collection('clientes')
            .onSnapshot(querySnapshot => {
                if (querySnapshot) {
                    const data = querySnapshot.docs.map(doc => {

                        return {
                            id: doc.id,
                            ...doc.data()
                        }

                    }) as Cliente[];

                    setClientes(data);
                }
                setIsCarregando(false);
            });

        return () => subscribe();
    }, []);

    function alterarCliente(id: string) {
        navigation.navigate("TelaAltCli", { id: id })
    }

    function deletarCliente(id: string) {
        setIsCarregando(true);

        firestore()
            .collection('clientes')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert("Cliente", "Removido com sucesso")
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));
    }

    return (
            <View style={styles.container}>
                <Carregamento isCarregando={isCarregando} />
                <View style={styles.container_header}>
                    <Text style={styles.titulo}>Lista de Clientes</Text>
                </View>
                <FlatList
                    data={clientes}
                    renderItem={(info) =>
                        <ItemCliente
                            numero={info.index}
                            clientes={info.item}
                            onAlterar={alterarCliente}
                            onDeletar={deletarCliente} />}>

                </FlatList>
                <View style={styles.container_body}>
                    <Pressable
                        style={styles.botao}
                        onPress={() => { navigation.goBack() }}>
                        <Text style={styles.desc_botao}>Voltar</Text>
                    </Pressable>
                </View>
            </View>
    );
}

export default TelaConClientes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(20,0,300,0.5)',
    },
    container_header: {
        backgroundColor: 'rgba(20,0,300,0.5)',
        padding: 20
    },
    container_body: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        marginBottom: 10
    },
    card: {
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 5,
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: 'rgba(20,100,300,0.5)'
    },
    dados_card: {
        flex: 1
    },
    cpf: {
        fontSize: 15,
        color: 'white'
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 80
    },
    botao: {
        backgroundColor: 'indigo',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },
    botao_alt: {
        backgroundColor: 'green',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 60
    },
    botao_del: {
        backgroundColor: 'red',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 60,
    },
    texto_botao_card: {
        fontWeight: "bold",
        fontSize: 25,
        color: 'white'
    },
    desc_botao: {
        fontSize: 18,
        color: '#FFFFFF',
    },
});
