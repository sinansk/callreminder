import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const SilentButton = () => {
    const [isSilent, setIsSilent] = useState(false);

    const toggleSilentMode = () => {
        setIsSilent(!isSilent);
        // Sessiz moda geçiş yapılırken gerekli işlemler buraya eklenebilir.
        if (!isSilent) {
            // Uygulamanın durdurulması veya diğer gerekli işlemler buraya eklenebilir.
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleSilentMode}>
                <Ionicons name={isSilent ? 'volume-mute' : 'volume-high'} size={32} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        alignSelf: 'center',
        zIndex: 999,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
});

export default SilentButton;