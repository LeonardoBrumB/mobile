import { Button, StyleSheet } from 'react-native';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import Cadastro from '../login/TelaCadastro';
import TelaLogin from '../login/TelaLogin';
import TelaPrincipal from '../Telas/TelaPrincipal';
import TelaCadCli from '../Telas/TelaCadCli';
import TelaConCli from '../Telas/TelaConsCli';
import TelaAltCli from '../Telas/TelaAltCli';
import TelaCadAtend from '../Telas/TelaCadAtend';
import TelaConsAtend from '../Telas/TelaConsAtend';



type RootStackParamList = {
  TelaLogin: undefined;
  Cadastro: undefined;
  TelaPrincipal: undefined;
  TelaCadCli: undefined;
  TelaConCli: undefined;
  TelaAltCli: {id: string};
  TelaCadAtend: undefined;
  TelaConsAtend: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName= "TelaLogin" screenOptions={{headerShown:false}}>
        <Stack.Screen name="TelaLogin" component={TelaLogin}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal}/>
        <Stack.Screen name="TelaCadCli" component={TelaCadCli}/>
        <Stack.Screen name="TelaConCli" component={TelaConCli}/>
        <Stack.Screen name="TelaAltCli" component={TelaAltCli}/>
        <Stack.Screen name="TelaCadAtend" component={TelaCadAtend}/>
        <Stack.Screen name="TelaConsAtend" component={TelaConsAtend}/>
      </Stack.Navigator>
  );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;

type CadUsuarioProps = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;

type CadCliProps = NativeStackScreenProps<RootStackParamList, 'TelaCadCli'>;

type ConCliProps = NativeStackScreenProps<RootStackParamList, 'TelaConCli'>;

type AltCliProps = NativeStackScreenProps<RootStackParamList, 'TelaAltCli'>;

type CadAtendProps = NativeStackScreenProps<RootStackParamList, 'TelaCadAtend'>;

type ConsAtendProps = NativeStackScreenProps<RootStackParamList, 'TelaConsAtend'>;

export default HomeNavigator;
export type {LoginProps, CadUsuarioProps, PrincipalProps, CadCliProps, ConCliProps, AltCliProps, CadAtendProps, ConsAtendProps};