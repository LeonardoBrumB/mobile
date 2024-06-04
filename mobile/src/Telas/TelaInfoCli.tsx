import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { InfoCliProps } from '../navigation/HomeNavigator';
import Carregamento from '../navigation/Carregamento';
import { Cliente } from '../Model/Cliente';
import firestore from "@react-native-firebase/firestore";

type ClienteProps = {
    numero: number;
    cliente: Cliente;
    onAlterar: (id: string) => void;
}

const TelaInfoCli = ({ navigation, route }: InfoCliProps) => {
    const [id,] = useState('');
    const [nome,] = useState('');
    const [cpf,] = useState('');
    const [rua,] = useState('');
    const [numero,] = useState('');
    const [bairro,] = useState('');
    const [complemento,] = useState('');
    const [cidade,] = useState('');
    const [estado,] = useState('');
    const [dataNasc,] = useState('');
    const [isCarregando,] = useState(false);

    function alterarCliente(cpf: string) {
        navigation.navigate("TelaAltCli", { id: cpf })
    }

    return (
        <ScrollView>
            <View style={styles.container_header}>
                <Text style={styles.titulo}>
                    Cadastro de cliente
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

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Cpf:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {cpf}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Rua:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {rua}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Número:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {numero}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Bairro:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {bairro}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Complemento:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {complemento}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Cidade:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {cidade}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Estado:
                    </Text>
                    <Text style={styles.caixa_texto}>
                        {estado}
                    </Text>

                    //////////

                    <Text style={styles.titulo_caixa_texto}>
                        Data de nascimento:
                    </Text>
                    <TextInput style={styles.caixa_texto}>
                        {dataNasc}
                    </TextInput>

                </View>
                <View style={styles.caixa_botao}>
                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                        onPress={() => props.onAlterar(props.cliente.id!)}}
                    disabled={isCarregando}
                    onAlterar={alterarCliente}>
                    <Text style={styles.desc_botao}>Alterar</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { navigation.navigate('TelaConsCli') }}>
                    <Text style={styles.desc_botao}>voltar</Text>
                </Pressable>
            </View>
        </View>
        </ScrollView >
    );
}

export default TelaInfoCli;

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
