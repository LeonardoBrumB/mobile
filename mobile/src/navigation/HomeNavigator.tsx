import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaLogin from "../login/TelaLogin";
import TelaCadastro from "../login/TelaCadastro";

type RootStackParamList = {
    TelaLogin: undefined;
    TelaCadastro: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="TelaLogin"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TelaLogin" component={TelaLogin} />
            <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
        </Stack.Navigator>
    );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;
type CadUsuarioProps = NativeStackScreenProps<RootStackParamList, 'TelaCadastro'>;

export default HomeNavigator;
export type {LoginProps, CadUsuarioProps};