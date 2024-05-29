import { useEffect, useState } from "react"
import { Alert, Pressable, View, Text, FlatList, StyleSheet } from "react-native"
import firestore from '@react-native-firebase/firestore';
import { INotas } from '../Model/INotas';
import { ConNotasProps } from '../navigation/HomeNavigator';
import Carregamento from "../navigation/Carregamento";

type ItemNotaProps = {
    numero: number,
    nota: INotas;
    onAlterar: (id: string) => void;
    onDeletar: (id: string) => void;
}

const ItemNota = (props: ItemNotaProps) => {


    return (
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={{ fontSize: 35 }}>
                    {props.numero + 1 + ' ' + props.nota.titulo}
                </Text>
                <Text style={{ fontSize: 20 }}>{props.nota.descricao}</Text>
            </View>

            <View style={styles.botao_alt}>
                <Pressable onPress={() => props.onAlterar(props.nota.id)}>
                    <Text style={styles.desc_botao}>
                        A
                    </Text>
                </Pressable>
            </View>

            <View style={styles.botao_del}>
                <Pressable onPress={() => props.onDeletar(props.nota.id)}>
                    <Text style={styles.desc_botao}>
                        X
                    </Text>
                </Pressable>
            </View>

        </View>
    )
}
const TelaConNotas = ({ navigation, route }: ConNotasProps) => {
    const [notas, setNotas] = useState([] as INotas[]);
    const [isCarregando, setIsCarregando] = useState(false);


    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
            .collection('notas')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,

                    }
                }) as INotas[];
                setNotas(data);
                setIsCarregando(false);

            })
        return () => subscribe();


    }, []);

    function deletarNota(id: string) {
        setIsCarregando(true);

        firestore()
            .collection('notas')
            .doc(id)
            .delete()
            .then(() => {
                Alert.alert('nota', 'Removido com sucesso')
            })
    }
    function alterarNota(id: string) {
        navigation.navigate('TelaAltNotas', { id: id });
    }

    return (
        <View style={styles.container}>
            <Carregamento isCarregando={isCarregando} />

            <Text style={styles.titulo_caixa_texto}>Listagem de Notas</Text>
            <FlatList
                data={notas}
                renderItem={(info) =>
                    <ItemNota
                        numero={info.index}
                        nota={info.item}
                        onAlterar={alterarNota}
                        onDeletar={deletarNota} />}
            ></FlatList>


        </View >
    );
}

export default TelaConNotas;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: 537,
    },
    titulo_caixa_texto: {
        paddingTop: 20,
        paddingBottom: 30,
        fontSize: 45,
        color: 'black',
        textAlign: 'center',
    },
    card: {
        borderWidth: 2,
        borderColor: 'grey',
        margin: 5,
        borderRadius: 10,
        padding: 3,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    dados_card: {
        flex: 1,
    },
    botao_alt: {
        backgroundColor: 'yellow',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botao_del: {
        backgroundColor: 'yellow',
        paddingVertical: 20,
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 70,
    },
    desc_botao: {
        fontWeight: 'bold',
        fontSize: 40,
        color: 'black',
    },
});


