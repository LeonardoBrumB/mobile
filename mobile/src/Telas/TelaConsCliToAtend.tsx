import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View, ScrollView } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Cliente } from "../Model/Cliente";
import { ConsCliToAtendProps } from "../navigation/HomeNavigator";
import Carregamento from "../navigation/Carregamento";
import TelaPrincipal from "./TelaPrincipal";








///////////////////////// PESQUISAR CLIENTE ///////////////











type ClienteProps = {
    numero: number;
    cliente: Cliente;
    onAtend: (id: string) => void;
}

const ItemCliente = (props: ClienteProps) => {

    return (
        <ScrollView>
            <View style={styles.container_header}>
                <Text style={styles.titulo}>
                    Qual cliente deseja fazer o atendimento?
                </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.dados_card}>
                        <Text style={{ fontSize: 35 }}>
                            {props.numero + 1 + ' - ' + props.cliente.nome}
                        </Text>
                        <Text style={{ fontSize: 20 }}>{props.cliente.cpf}</Text>
                    </View>

                    <View style={styles.botao_atend}>
                        <Pressable
                            onPress={() => props.onAtend(props.cliente.id!)}>
                            <Text style={styles.texto_botao_card}>
                                A
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <Pressable style={styles.botao}
                    onPress={() => { Navigation.navigate('TelaPrincipal') }}>
                    <Text style={styles.desc_botao}>
                        voltar
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}



const TelaConsCliToAtend = ({ navigation, route }: ConsCliToAtendProps) => {
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

    function infoCliente(id: string) {
        navigation.navigate("TelaInfoAted", { id: id })
    }

    return (
        <View style={styles.container}>
            <Carregamento isCarregando={isCarregando} />

            <Text style={styles.titulo}>Listagem de clientes</Text>
            <FlatList
                data={cliente}
                renderItem={(info) =>
                    <ItemCliente
                        numero={info.index}
                        cliente={info.item}
                        onAtend={infoCliente} />

        </FlatList>
        </View >
    );
}

export default TelaConsCliToAtend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c62be'
    },
    container_header: {
        flex: 1,
        backgroundColor: '#164d96',
        paddingBottom: 80,
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
    botao_Atend: {
        backgroundColor: 'grey',
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
});
