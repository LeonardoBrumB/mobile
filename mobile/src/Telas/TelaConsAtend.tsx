import { useState, useEffect } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { Atendimento } from "../model/Atendimento";
import Carregamento from "../navigation/Carregamento";
import { ConsAtendProps } from "../navigation/HomeNavigator";

const ItemAtendimento = ({ atendimento }: { atendimento: Atendimento }) => {
    return (
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={styles.titulo}>
                    {' Nome do cliente: ' + atendimento.cliente}
                </Text>
                <Text style={styles.texto}>
                    {'Data: ' + atendimento.data}
                </Text>
                <Text style={styles.texto}>
                    {'Hora: ' + atendimento.hora}
                </Text>
                <Text style={styles.texto}>
                    {'Descrição: ' + atendimento.descricao}
                </Text>
            </View>
        </View>
    );
}

const TelaConAtend = ({ navigation, route }: ConsAtendProps) => {
    const [atendimentos, setAtendimentos] = useState([] as Atendimento[]);
    const [isCarregando, setIsCarregando] = useState(false);

    useEffect(() => {
        setIsCarregando(true);
        const subscribe = firestore()
            .collection('atendimentos')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data() as Atendimento
                    }
                }) as Atendimento[];
                setAtendimentos(data);
                setIsCarregando(false);
            });
        return () => subscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Carregamento isCarregando={isCarregando} />
            <View style={styles.container_header}>
                <Text style={styles.titulo_T}>Lista de Atendimentos</Text>
            </View>

            <FlatList
                data={atendimentos}
                renderItem={({ item }) =>
                    <ItemAtendimento
                        atendimento={item}
                    />}
            />
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

export default TelaConAtend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(20,0,300,0.5)',
    },
    container_header: {
        backgroundColor: 'rgba(20,0,300,0.5)',
        padding: 30,
    },
    container_body: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    titulo: {
        fontSize: 23,
        textAlign: 'center',
        color: 'white',
        marginBottom: 10
    },
    titulo_T: {
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
        marginHorizontal: 5,
        flexDirection: 'row',
        backgroundColor: 'rgba(20,100,300,0.5)'
    },
    dados_card: {
        flex: 1
    },
    texto: {
        fontSize: 18,
        color: 'white',
        marginBottom: 5
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
    desc_botao: {
        fontSize: 18,
        color: '#FFFFFF',
    },
});
