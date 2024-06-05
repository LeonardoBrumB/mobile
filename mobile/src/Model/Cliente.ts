import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type Cliente = {
    id: string | undefined,
    nome: string,
    cpf: string,   
    rua: string,
    numero: string,
    bairro: string,
    complemento: string,
    cidade: string,
    estado: string,
    dataNascimento: string,
    created_at: FirebaseFirestoreTypes.FieldValue
}

export type {Cliente};

