import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaLogin from "../login/TelaLogin";
import TelaCadastro from "../login/TelaCadastro";
import TelaPrincipal from "../Telas/TelaPrincipal";
import Aprovado from "../Telas/Aprovado";
import TelaCadNota from "../Telas/TelaCadNota";
import TelaConNotas from "../Telas/TelaConNotas";
import TelaAltNotas from "../Telas/TelaAltNotas";

type RootStackParamList = {
    TelaLogin: undefined;
    TelaCadastro: undefined;
    TelaPrincipal: undefined;
    Aprovado: undefined;
    CadMedia: undefined;
    TelaCadNota: undefined,
    TelaConNotas: undefined,
    TelaAltNotas: { id: string },
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
            <Stack.Screen name="Aprovado" component={Aprovado} />
            <Stack.Screen name="TelaCadNota" component={TelaCadNota} />
            <Stack.Screen name="TelaConNotas" component={TelaConNotas} />
            <Stack.Screen name="TelaAltNotas" component={TelaAltNotas} />

        </Stack.Navigator>
    );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;
type CadUsuarioProps = NativeStackScreenProps<RootStackParamList, 'TelaCadastro'>;
type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;
type AprovadoProps = NativeStackScreenProps<RootStackParamList, 'Aprovado'>;
type CadNotaProps = NativeStackScreenProps<RootStackParamList, 'TelaCadNota'>;
type ConNotasProps = NativeStackScreenProps<RootStackParamList, 'TelaConNotas'>;
type AltNotasProps = NativeStackScreenProps<RootStackParamList, 'TelaAltNotas'>;

export default HomeNavigator;
export type { LoginProps, CadUsuarioProps, PrincipalProps, AprovadoProps, CadNotaProps, ConNotasProps, AltNotasProps };