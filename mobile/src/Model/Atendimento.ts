import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

interface Atendimento {
    id: string | undefined;
    cliente: string;
    data: string;
    hora: string;
    descricao: string;
    created_at: FirebaseFirestoreTypes.FieldValue;
}

export type { Atendimento };
