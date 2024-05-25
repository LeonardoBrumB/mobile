import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from '@react-native-firebase/firestore';
import Carregamento from "../navigation/Carregamento";
import { CadNotaProps } from "../navigation/HomeNavigator";
import { INotas } from "../Model/INotas";


const TelaCadNota = ({ navigation, route }: CadNotaProps) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

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
        <View style={styles.container}>
            <View style={styles.container_login}>
                <Carregamento isCarregando={isCarregando} />

                <Text>Título</Text>
                <TextInput
                    style={styles.caixa_texto}
                    onChangeText={(text) => { setTitulo(text) }} />

                <Text> Descrição </Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    maxLength={100}
                    style={styles.caixa_texto}
                    onChangeText={(text) => { setDescricao(text) }} />
                <Pressable
                    style={styles.botao}
                    onPress={() => cadastrar()}>
                    <Text style={styles.desc_botao}>Cadastrar notas</Text>
                </Pressable>
            </View>
        </View>
    )
}
export default TelaCadNota;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 30,
        flex: 1,
        backgroundColor: '#1c62be'
    },
    container_login: {
        marginTop: 200,
        flex: 2,
        alignItems: 'center'
    },
    titulo_caixa_texto: {
        paddingTop: 10,
        fontSize: 25,
        color: 'black',
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 10,
        margin: 90,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white'
    },
    painel_imagem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        width: 200,
        height: 200,
        resizeMode: "center"
    }
});
