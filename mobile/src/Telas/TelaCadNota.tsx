import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import Carregamento from "../navigation/Carregamento";
import { CadNotaProps } from "../navigation/HomeNavigator";
import { INotas } from "../Model/Cliente";

const TelaCadNota = ({ navigation, route }: CadNotaProps) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    function cadastrar() {
        setIsCarregando(true);

        if(verificaCampos()){
            let nota = {
                titulo: titulo,
                descricao: descricao,
                created_at: firestore.FieldValue.serverTimestamp()
            } as INotas;

            firestore()
                .collection('notas')
                .add(nota)
                .then(() => {
                    Alert.alert("Nota", "Cadastrada com sucesso")
                    navigation.navigate('TelaPrincipal')
                })
                .catch((error) => console.log(error))
                .finally(() => setIsCarregando(false));
        }
        setIsCarregando(false);
    }

    function verificaCampos(){
        if (titulo == ''){
            Alert.alert("Título em branco", 
                "Digite um título")
            return false;
        }
        if (descricao == ''){
            Alert.alert("Descrição em branco", 
                "Digite uma descrição da nota")
            return false;
        }

        return true;
    }

    return (
        <View>
            <Carregamento isCarregando={isCarregando} />

            <Text>Título</Text>
            <TextInput
                style={styles.caixa_texto}
                onChangeText={(text) => { setTitulo(text) }} />
            
            <Text>Descrição</Text>
            <TextInput
                multiline
                numberOfLines={4}
                maxLength={100}
                style={styles.caixa_texto}
                onChangeText={(text) => { setDescricao(text) }} />

            <Pressable
                style={styles.botao}
                onPress={() => cadastrar()}
                disabled={isCarregando}>
                <Text style={styles.desc_botao}>Cadastrar</Text>
            </Pressable>
        </View>
    );
}

export default TelaCadNota;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    desc_botao: {
        fontSize: 20
    },
    text_area: {
        borderWidth: 1,
        borderColor: 'grey'
    }
});
