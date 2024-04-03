import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReminderCardComponent = ({ phoneNumber, time, onSendMessage, onCall }) => {
    return (
        <TouchableOpacity onPress={() => {/* Hatırlatma ekranını aç */ }}>
            <View style={styles.callItemContainer}>
                <Text style={styles.callItemText}>{phoneNumber}</Text>
                <Text style={styles.callItemText}>{time}</Text>
                <View style={styles.actionIcons}>
                    <TouchableOpacity onPress={onSendMessage}>
                        <Ionicons name="chatbubbles-outline" size={24} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onCall}>
                        <Ionicons name="call-outline" size={24} color="green" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    callItemContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '97%',
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        marginBottom: 5,
        marginStart: 'auto',
        marginEnd: 'auto'
    },
    callItemText: {
        fontSize: 16,
    },
    actionIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '20%'
    },
});

export default ReminderCardComponent;