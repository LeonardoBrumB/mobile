import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type Cliente = {
    id: string | undefined,
    nome: string, 
    cpf: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    complemento: string,
    dataNasc: string,
    created_at: FirebaseFirestoreTypes.FieldValue
}

export type {
    Cliente
};