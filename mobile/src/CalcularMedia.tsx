import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    nome: string;
    nota1: number;
    nota2: number;

}

const Aprovado = (props: Props) => {
    const media = (props.nota1 + props.nota2) / 2;
    if (media < 7) {
        <Text style= {{color: 'green', fontSize: 20}}>
            {props.nome + ' Reprovado!'}
        </Text>
    } else {
        <Text style= {{color: 'green', fontSize: 20}}>
            {props.nome + ' Aprovado!'}
        </Text>
    }
}


export default Aprovado;