import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type INotas = {
    id: string, 
    titulo: string,
    descricao: string,
    created_at: FirebaseFirestoreTypes.FieldValue
}

export type {
    INotas
};