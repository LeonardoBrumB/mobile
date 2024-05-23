import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';

const Atividade2 = () => {
    const [titulo, setTitulo] = useState('');


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.painel_imagem}>
                    <Image
                        style={styles.imagem}
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
                </View>
                <View style={styles.painel_imagem}>
                    <Image
                        style={styles.imagem}
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
                </View>
                <View style={styles.painel_imagem}>
                    <Image
                        style={styles.imagem}
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
                </View>
                <View style={styles.painel_imagem}>
                    <Image
                        style={styles.imagem}
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
                </View>
                <View style={styles.painel_imagem}>
                    <Image
                        style={styles.imagem}
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
                </View>


            </View>
        </ScrollView>
    );
}

export default Atividade2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d7cd4'
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
