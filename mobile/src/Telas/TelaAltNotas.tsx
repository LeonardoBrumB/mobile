import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { INotas } from "../Model/INotas";
import Carregamento from "../navigation/Carregamento";
import { AltNotasProps } from "../navigation/HomeNavigator";
import { createTestScheduler } from "jest";

const TelaAltNota = ({ navigation, route }: AltNotaProps) => {
    const [id,] = useState(route.params.id);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function carregar() {
        setIsCarregando(true);
        const resultado = await firestore()
            .collection('notas')
            .doc(id)
            .get();

        const nota = {
            id: resultado.id,
            ...resultado.data()
        } as INotas;

        setTitulo(nota.titulo);
        setDescricao(nota.descricao);
        setIsCarregando(false);
    };

    function alterar() {
        setIsCarregando(true);

        firestore()
            .collection('notas')
            .doc(id)
            .update({
                titulo, descricao, created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert('nota', 'Alterada com sucesso')
                navigation.goBack();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsCarregando(false));
    }

    return (
        <view style={styles.container}>
            <Carregamento isCarregando={isCarregando} />

            <Text style={styles.desc_caixa_texto}>
                Título
            </Text>
            <TextInput style={styles.caixa_texto}
                value={titulo}
                onChangeText={(text) => { setTitulo(text) }} />
            <Text style={styles.desc_caixa_texto}>
                Descricao
            </Text>
            <TextInput multiline
                numberOfLines={4}
                maxLength={100}
                style={styles.caixa_texto}
                value={descricao}
                onChangeText={(text) => { setDescricao(text) }} />
            <Pressable style={styles.botao}
                onPress={() => alterar()}
                disabled={isCarregando}
            >Alterar
            </Pressable>

        </view>
    );

}

export default TelaAltNota;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#FFFACD',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 40,
        textAlign: 'center',
        color: 'black',
        marginBottom: 10,
    },
    caixa_texto: {
        width: '80%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white',
    },
    desc_caixa_texto: {
        fontSize: 18,
    },
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30,
        margin: 10,
    },
    desc_botao: {
        fontSize: 25,
        color: 'white',
    }
})