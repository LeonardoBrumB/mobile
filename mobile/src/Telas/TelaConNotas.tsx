import { useEffect, useState } from "react"
import { Alert, Pressable, View, Text, FlatList, StyleSheet } from "react-native"
import firestore from '@react-native-firebase/firestore';
import { INotas } from '../Model/INotas';
import { ConNotasProps } from '../navigation/HomeNavigator';
import Carregamento from "../navigation/Carregamento";

type ItemNotaProps = {
    numero: number,
    nota: INotas;
}

const ItemNota = (props: ItemNotaProps) => {
    function deletarNota(id: string) {
        //
    }
    function alterarNota(id: string) {
        //
    }

    return (
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={{ fontSize: 35 }}>
                    {props.numero + 1 + ' ' + props.nota.titulo}
                </Text>
                <Text style={{ fontSize: 20 }}>{props.nota.descricao}</Text>
            </View>

            <View style={styles.botao_alterar}>
                <Pressable onPress={() => alterarNota(props.nota.id)}>
                    <Text style={styles.texto_botao_card}>
                        A
                    </Text>
                </Pressable>
            </View>

            <View style={styles.botao_deletar}>
                <Pressable onPress={() => deletarNota(props.nota.id)}>
                    <Text style={styles.texto_botao_card}>
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
}

