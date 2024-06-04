import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { CadAtendProps } from '../navigation/HomeNavigator';
import Carregamento from '../navigation/Carregamento';
import { Atendimento } from '../Model/Atendimento';
import firestore from "@react-native-firebase/firestore";



////////////// alterar atendimento, info atendimento //////////






const TelaCadAtend = ({ navigation, route }: CadAtendProps) => {
    const [id,] = useState('');
    const [nome,] = useState('');
    const [cpf,] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    function cadastrar() {
        setIsCarregando(true);

        if (verificaCampos()) {
            let atendimento = {
                id: id,
                nome: nome,
                cpf: cpf,
                data: data,
                hora: hora,
                descricao: descricao,
                created_at: firestore.FieldValue.serverTimestamp()
            } as Atendimento;

            firestore()
                .collection('atendimento')
                .add(atendimento)
                .then(() => {
                    Alert.alert("Atendimento", "Cadastrado com sucesso")
                    navigation.navigate('TelaPrincipal')
                })
                .catch((error) => console.log(error))
                .finally(() => setIsCarregando(false));
        }
        setIsCarregando(false);
    }

    function verificaCampos() {

        if (data == '') {
            Alert.alert("Data em branco",
                "Digite uma data")
            return false;
        }
        if (hora == '') {
            Alert.alert("Hora em branco",
                "Digite uma Hora")
            return false;
        }
        if (descricao == '') {
            Alert.alert("Descrição em branco",
                "Digite uma descrição")
            return false;
        }

        return true;
    }

    function formataData(data) {
        const dataAtual = data.value

        let dataAtualizada;

        dataAtualizada = dataAtual.replace(/(\d{2})(\d{2})(\d{4})/,
            function (regex, argumento1, argumento2, argumento3) {
                return argumento1 + '/' + argumento2 + '/' + argumento3;
            })
        data = dataAtualizada;
    }

    function formataHora(hora) {
        const horaAtual = hora.value

        let horaAtualizada;

        horaAtualizada = horaAtual.replace(/(\d{2})(\d{2})/,
            function (regex, argumento1, argumento2) {
                return argumento1 + ':' + argumento2;
            })
        hora = horaAtualizada;
    }


    return (
        <ScrollView>
            <View style={styles.container_header}>
                <Text style={styles.titulo}>
                    Cadastrar atendimento para {nome}
                </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.caixas}>
                    <Text style={styles.titulo_caixa_texto}>
                        Nome:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {nome}
                    </Text>

                    <Text style={styles.titulo_caixa_texto}>
                        Cpf:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {cpf}
                    </Text>

                    <Text style={styles.titulo_caixa_texto}>
                        Data:
                    </Text>
                    <TextInput style={styles.caixa_texto}
                        onChangeText={(text) => { setData(text) }}
                        keyboardType='numeric'>
                        {formataData(data)}

                    </TextInput>

                    <Text style={styles.titulo_caixa_texto}>
                        Hora:
                    </Text>
                    <TextInput style={styles.caixa_texto}
                        onChangeText={(text) => { setHora(text.toString()) }}
                        keyboardType='numeric'>
                        {formataHora(hora)}

                    </TextInput>

                    <Text style={styles.titulo_caixa_texto}>
                        Descrição:
                    </Text>
                    <TextInput style={styles.caixa_texto}
                        multiline
                        numberOfLines={8}
                        maxLength={200}
                        onChangeText={(text) => { setDescricao(text) }}>

                    </TextInput>

                </View>
                <View style={styles.caixa_botao}>
                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                        onPress={() => cadastrar()}
                        disabled={isCarregando}>
                        <Text style={styles.desc_botao}>Cadastrar Atendimento</Text>
                    </Pressable>

                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                        onPress={() => { navigation.navigate('TelaConsCliToAtend') }}>
                        <Text style={styles.desc_botao}>voltar</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView >
    );
}

export default TelaCadAtend;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: 100,
    },
    caixas: {
        alignItems: 'center',
    },
    caixa_botao: {
        paddingTop: 15,
    },
    container_header: {
        flex: 1,
        backgroundColor: '#164d96',
        paddingBottom: 60,
    },
    titulo: {
        paddingTop: 55,
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
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
    titulo_caixa_texto: {
        paddingTop: 10,
        fontSize: 25,
        color: 'black',
        paddingBottom: 10,
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white',
    },
});
