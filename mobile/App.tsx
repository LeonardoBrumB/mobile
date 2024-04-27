import React from 'react';
import { Text, TextInput, View } from 'react-native';

import HelloWorld from './src/HelloWorld'
import Gato from './src/Exemplo2';
import NomePersonalizado from './src/ExemploParametro';
import Aprovado from './src/CalcularMedia';

function App(): React.JSX.Element {
  return(
    <View style={{backgroundColor: 'white', borderRadius: 10}}>
      <Text style={{color: 'black', fontSize: 25}}> Hello World!</Text>
      <TextInput/>

      <HelloWorld/>
      <Gato/>
      <NomePersonalizado nome='jalan' sobrenome='bitco'/>
      <Aprovado nome='' nota1={0} nota2={0}/>
    </View>
  );
}

export default App;