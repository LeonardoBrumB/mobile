import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaPrincipal from "../Telas/TelaPrincipal";
import TelaNumeros from "../Telas/TelaNumeros";
import TelaCadProd from "../Telas/TelaCadProd";
import TelaLogin from "../login/TelaLogin";
import TelaCadastro from "../login/TelaCadastro";
import TelaConsCli from "../Telas/TelaConsCli";
import TelaAltCli from "../Telas/TelaAltCli";
import TelaCadCli from "../Telas/TelaCadCli";

type RootStackParamList = {
    TelaLogin: undefined;
    TelaCadastro: undefined;
    TelaPrincipal: undefined;
    TelaNumeros: undefined;
    TelaCadProd: undefined;
    TelaCadCli: undefined;
    TelaCadAtend: undefined;
    TelaConsCli: undefined;
    TelaAltCli: { id: string };
}


const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="TelaLogin"
            screenOptions={{ headerShown: false }}>

            <Stack.Screen name="TelaLogin" component={TelaLogin} />
            <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
            <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />

            <Stack.Screen name="TelaNumeros" component={TelaNumeros} />
            <Stack.Screen name="TelaCadProd" component={TelaCadProd} />
            <Stack.Screen name="TelaCadCli" component={TelaCadCli} />
            <Stack.Screen name="TelaConsCli" component={TelaConsCli} />
            <Stack.Screen name="TelaAltCli" component={TelaAltCli} />

        </Stack.Navigator>
    );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;
type CadProps = NativeStackScreenProps<RootStackParamList, 'TelaCadastro'>;
type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;
type NumerosProps = NativeStackScreenProps<RootStackParamList, 'TelaNumeros'>;
type CadProdProps = NativeStackScreenProps<RootStackParamList, 'TelaCadProd'>;
type CadCliProps = NativeStackScreenProps<RootStackParamList, 'TelaCadCli'>;
type CadAtendProps = NativeStackScreenProps<RootStackParamList, 'TelaCadAtend'>;
type ConsCliProps = NativeStackScreenProps<RootStackParamList, 'TelaConsCli'>;
type AltCliProps = NativeStackScreenProps<RootStackParamList, 'TelaAltCli'>;

export default HomeNavigator;
export type { PrincipalProps, NumerosProps, CadProdProps, LoginProps, CadProps, CadAtendProps, CadCliProps, ConsCliProps, AltCliProps };