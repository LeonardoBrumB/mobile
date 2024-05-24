import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from '@react-native-firebase/firestore';
import Carregamento from "../navigation/Carregamento";
import { CadNotaProps } from "../navigation/HomeNavigator";
import { INotas } from "../Model/INotas";


const TelaCadNota = {{ navigation, route }: CadNotaProps} => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState('');

    function cadastrar() {
        setIsCarregando(true);

        if (verificarCampos()) {
            let nota = {
                titulo: titulo,
                descricao: descricao,
                created_at: firestore.FieldValue.serverTimestamp()
            } as INotas;

            firestore()
                .collection('notas')
                .add(nota)
                .then(() => {
                    Alert.alert('nota', 'Cadastrada com sucesso!')
                    navigation.navigate('TelaPrincipal')
                })
                .catch((error) => console.log(error))
                .finally(() => setIsCarregando(false));
        }
        setIsCarregando(false);
    }

    function verificarCampos() {
        if (titulo == '') {
            Alert.alert('Título em branco!',
                'Digite um título'
            )
            return false;
        }
        if (descricao == '') {
            Alert.alert('Descrição em branco',
                "Digite uma descrição da nota"
            )
            return false;

        }
        return true;
    }

    return (
        <View>
            <Carregamento isCarregando = {isCarregando}/>

            <Text>Título</Text>
            <TextInput
            style ={styles.caixa_texto}

        </View>
    )
}