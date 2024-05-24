import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import React from "react";

type CarregamentoProps = {
    isCarregando: boolean;
}

const Carregamento = (props: CarregamentoProps) => {
    return (
        <Modal
            visible={props.isCarregando}
            transparent={false}>
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        </Modal>
    );
}

export default Carregamento;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#1c62be'
    },
    container_cadastro: {
        flex: 2,
        alignItems: 'center'
    },
    titulo_caixa_texto: {
        paddingTop: 10,
        fontSize: 25,
        color: 'black',
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white'
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 30,
        borderRadius: 10
    },
    desc_botao: {
        fontSize: 20,
        color: 'white'
    },
    painel_imagem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        width: 200,
        height: 200,
        resizeMode: "center"
    }
});
