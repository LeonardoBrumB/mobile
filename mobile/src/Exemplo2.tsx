import React from 'react';
import { Text, View } from 'react-native';

const getNomeCompleto = (
    primeiroNome: string,
    nomeMeio: string,
    ultimoNome: string) => {

    return primeiroNome + ' ' + nomeMeio + ' ' + ultimoNome;
};

const Gato = () => {
    return (
        <Text style = {{color: 'black', fontSize: 20}}>
            MIAAAU! 
            {getNomeCompleto('  fulano', 'da silva', 'sauro')} !
        </Text>
    )
}

export default Gato;