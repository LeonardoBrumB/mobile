import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaPrincipal from "../Telas/TelaPrincipal";
import TelaLogin from "../login/TelaLogin";
import TelaCadastro from "../login/TelaCadastro";
import TelaConsCli from "../Telas/TelaConsCli";
import TelaAltCli from "../Telas/TelaAltCli";
import TelaCadCli from "../Telas/TelaCadCli";
import TelaInfoCli from "../Telas/TelaInfoCli";
import TelaConsCliToAtend from "../Telas/TelaConsCliToAtend";
import TelaCadAtend from "../Telas/TelaCadAtend";
import TelaConsAtend from "../Telas/TelaConsAtend";


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
    TelaInfoCli: undefined;
    TelaConsCliToAtend: undefined;
    TelaConsAtend: undefined;
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

            <Stack.Screen name="TelaCadCli" component={TelaCadCli} />
            <Stack.Screen name="TelaConsCli" component={TelaConsCli} />
            <Stack.Screen name="TelaAltCli" component={TelaAltCli} />
            <Stack.Screen name="TelaInfoCli" component={TelaInfoCli} />
            <Stack.Screen name="TelaConsCliToAtend" component={TelaConsCliToAtend} />
            <Stack.Screen name="TelaCadAtend" component={TelaCadAtend} />
            <Stack.Screen name="TelaConsAtend" component={TelaConsAtend} />

        </Stack.Navigator>
    );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;
type CadProps = NativeStackScreenProps<RootStackParamList, 'TelaCadastro'>;
type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;
type CadCliProps = NativeStackScreenProps<RootStackParamList, 'TelaCadCli'>;
type CadAtendProps = NativeStackScreenProps<RootStackParamList, 'TelaCadAtend'>;
type ConsCliProps = NativeStackScreenProps<RootStackParamList, 'TelaConsCli'>;
type ConsAtendProps = NativeStackScreenProps<RootStackParamList, 'TelaConsAtend'>;
type AltCliProps = NativeStackScreenProps<RootStackParamList, 'TelaAltCli'>;
type InfoCliProps = NativeStackScreenProps<RootStackParamList, 'TelaInfoCli'>;
type ConsCliToAtendProps = NativeStackScreenProps<RootStackParamList, 'TelaConsCliToAtend'>;

export default HomeNavigator;
export type { PrincipalProps, LoginProps, CadProps, CadAtendProps, CadCliProps, ConsCliProps, AltCliProps, InfoCliProps, ConsCliToAtendProps, ConsAtendProps };