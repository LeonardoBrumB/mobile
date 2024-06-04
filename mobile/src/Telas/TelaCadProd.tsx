import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { CadProdProps } from '../navigation/HomeNavigator';

const TelaCadProd = ({ navigation, route }: CadProdProps) => {
    const [codBarras, setBarras] = useState('');
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);

    const salvarProduto = () => {
        if (verificaCampos()) {
            firestore()
                .collection('produtos')
                .add({
                    codBarras,
                    nome,
                    preco
                })
                .then(() => {
                    Alert.alert('Cadastrado com sucesso!')
                    setBarras('');
                    setNome('');
                    setPreco(0);
                })
                .catch((error) => {
                    Alert.alert('Erro ao cadastrar ' + error);
                });
        }
    };

    function verificaCampos() {

        if (nome == '') {
            Alert.alert("Nome em branco", "Digite um nome")
            return false;
        }
        if (codBarras == '') {
            Alert.alert("código de barras em branco", "Digite um código")
            return false;
        }
        if (preco == 0) {
            Alert.alert("Preço em branco!",
                "Digite o preço"
            )
            return false;
        }

        return true;
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titulo_caixa_texto}>
                    Nome:
                </Text>
                <View style={styles.caixa_texto_container}>
                    <TextInput style={styles.caixa_texto}
                        onChangeText={(text) => { setNome(text) }}>
                    </TextInput>
                </View>

                <Text style={styles.titulo_caixa_texto}>
                    Código de barras:
                </Text>
                <View style={styles.caixa_texto_container}>
                    <TextInput keyboardType='numeric'
                        style={styles.caixa_texto}
                        onChangeText={(text) => { setBarras(text) }}>
                    </TextInput>
                </View>

                <Text style={styles.titulo_caixa_texto}>
                    preço:
                </Text>
                <View style={styles.caixa_texto_container}>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.caixa_texto}
                        onChangeText={(text) => { setPreco(Number.parseFloat(text)) }}>
                    </TextInput>
                </View>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { salvarProduto() }}>
                    <Text style={styles.desc_botao}> Cadastrar</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.goBack() }}>
                    <Text style={styles.desc_botao}> Voltar</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default TelaCadProd;

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: 500,
    },
    titulo_caixa_texto: {
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
    },
    caixa_texto_container: {
        alignItems: 'center',
    },
    caixa_texto: {
        width: '80%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white',
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
