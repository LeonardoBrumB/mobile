import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    nome: string;
    sobrenome: string;
}

const NomePersonalizado = (props: Props) => {
    return (
        <Text style={{ color: 'black', fontSize: 25 }}>
            {props.nome+ ' ' + props.sobrenome}
        </Text>
    )
};


export default NomePersonalizado;