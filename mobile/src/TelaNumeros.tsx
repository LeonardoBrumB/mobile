import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { NumerosProps } from '../navigation/HomeNavigator';

const TelaNumeros = ({ navigation, route }: NumerosProps) => {
    const [numero, setNumero] = useState(0);
    let numArray: number[] = [];

    function Calcular() {
        numArray = [];
        if (numero > 0) {
            let num = 1;
            while (num != numero + 1) {
                if (num % 3 == 0) {
                    numArray.push(num);

                }
                num++;

            }
        } else {
            Alert.alert('Numero inválido');
        }
        Alert.alert(numArray.toString());

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titulo_caixa_texto}>
                    Digite um número:
                </Text>
                <View style={styles.caixa_texto_container}>
                    <TextInput keyboardType='numeric' 
                    style={styles.caixa_texto}
                        onChangeText={(text) => { setNumero(Number.parseInt(text)) }}>
                    </TextInput>
                </View>
                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                    onPress={() => { Calcular(); }}>
                    <Text style={styles.desc_botao}> Ver multiplos de 3</Text>
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

export default TelaNumeros;

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        flex: 1,
        backgroundColor: '#1c62be',
        paddingBottom: 500,
    },
    titulo_caixa_texto: {
        paddingTop: 20,
        paddingBottom: 30,
        fontSize: 35,
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
