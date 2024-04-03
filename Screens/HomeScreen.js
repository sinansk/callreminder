import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ReminderCardComponent from '../Components/ReminderCardComponent';


const HomeScreen = () => {
    // Kullanıcının cevapsız çağrıları ve zaman bilgisini içeren örnek veri
    const [calls, setCalls] = useState([
        { id: 1, phoneNumber: '5551234567', time: '10:30' },
        { id: 2, phoneNumber: '5559876543', time: '11:45' },
        // Diğer cevapsız çağrılar...
    ]);

    const handleSendMessage = () => {
        // Mesaj gönderme işlevi
    };

    const handleCall = () => {
        // Telefon etme işlevi
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={calls}
                renderItem={({ item }) => (
                    <ReminderCardComponent
                        phoneNumber={item.phoneNumber}
                        time={item.time}
                        onSendMessage={handleSendMessage}
                        onCall={handleCall}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
