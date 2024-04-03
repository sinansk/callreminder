import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, Modal, Button, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import useAsyncStorage from '../hooks/useAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
    // Ayarlar için durumları tut
    const [startAfter, setStartAfter] = useState(5);
    const [period, setPeriod] = useState(1);
    const [soundReminder, setSoundReminder] = useState(true);
    const [visualReminder, setVisualReminder] = useState(false);
    const [autoCancel, setAutoCancel] = useState(10);
    const [voiceReminder, setVoiceReminder] = useState(true);
    const [selectedSound, setSelectedSound] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [silentHours, setSilentHours] = useState({ startHour: 22, endHour: 7 });
    const [storedSettings, saveSettings] = useAsyncStorage('@user_settings', {
        startAfter,
        period,
        soundReminder,
        visualReminder,
        autoCancel,
        voiceReminder,
        selectedSound,
        selectedImage,
        silentHours
    });
    console.log(storedSettings, "STOREDSETTINGS")
    const handleSaveSettings = () => {
        // Ayarları bir nesne olarak sakla
        const settings = {
            startAfter,
            period,
            soundReminder,
            visualReminder,
            autoCancel,
            voiceReminder,
            selectedSound,
            selectedImage,
            silentHours
        };
        // AsyncStorage üzerine kaydet
        saveSettings(settings);
    };
    useEffect(() => {
        const loadStoredSettings = () => {
            try {
                // AsyncStorage'den ayarları yükle
                AsyncStorage.getItem('@user_settings')
                    .then((jsonValue) => {
                        const storedSettings = JSON.parse(jsonValue);
                        if (storedSettings) {
                            console.log(storedSettings, "SETTINGS")
                            setStartAfter(storedSettings.startAfter);
                            setPeriod(storedSettings.period);
                            setSoundReminder(storedSettings.soundReminder);
                            setVisualReminder(storedSettings.visualReminder);
                            setAutoCancel(storedSettings.autoCancel);
                            setVoiceReminder(storedSettings.voiceReminder);
                            setSelectedSound(storedSettings.selectedSound);
                            setSelectedImage(storedSettings.selectedImage);
                            setSilentHours(storedSettings.silentHours || { startHour: 22, endHour: 7 });
                        } else {
                            setStartAfter(5);
                            setPeriod(1);
                            setSoundReminder(true);
                            setVisualReminder(false);
                            setAutoCancel(10);
                            setVoiceReminder(true);
                            setSelectedSound('');
                            setSelectedImage('');
                            setSilentHours({ startHour: 22, endHour: 7 })
                        }
                    })
                    .catch((error) => {
                        console.error('Error loading settings:', error);
                    });
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        loadStoredSettings();
    }, []);

    const toggleVoiceReminder = () => {
        setVoiceReminder(previousState => !previousState);
    };

    const handleSoundSelection = (sound) => {
        setSelectedSound(sound);
    };

    const [isImageModalVisible, setImageModalVisible] = useState(false);

    // Resim seçim modalını açmak için bir fonksiyon
    const openImageModal = () => {
        setImageModalVisible(true);
    };

    // Resim seçim modalını kapatmak için bir fonksiyon
    const closeImageModal = () => {
        setImageModalVisible(false);
    };

    const generateHours = () => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            const label = i < 10 ? `0${i}:00` : `${i}:00`;
            hours.push({ label: label, value: i });
        }
        return hours;
    };

    // Saatlerin oluşturulması
    const hours = generateHours();

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>

            <View style={styles.settingItemContainer}>
                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Başlangıçtan Sonra</Text>
                    <RNPickerSelect
                        value={startAfter}
                        onValueChange={(value) => setStartAfter(value)}
                        items={[
                            { label: '30 saniye', value: 0.5 },
                            { label: '1 dakika', value: 1 },
                            { label: '2 dakika', value: 2 },
                            { label: '5 dakika', value: 5 },
                            { label: '10 dakika', value: 10 },
                        ]}
                    />
                </View>
            </View>
            <View style={styles.settingItemContainer}>
                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Hatırlatma Periyodu</Text>
                    <RNPickerSelect
                        value={period}
                        onValueChange={(value) => setPeriod(value)}
                        items={[
                            { label: '1 dakika', value: 1 },
                            { label: '5 dakika', value: 5 },
                            { label: '10 dakika', value: 10 },
                            { label: '15 dakika', value: 15 }
                        ]}
                    />
                </View>
            </View>
            <View style={styles.settingItemContainer}>
                <Text style={styles.settingLabel}>Sesli Hatırlatmalar</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={voiceReminder ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleVoiceReminder}
                    value={voiceReminder}
                />
            </View>
            {voiceReminder && (
                <View style={styles.settingItemContainer}>
                    <View style={styles.settingItem}>
                        <Text style={styles.settingLabel}>Ses Dosyası Seç</Text>
                        <RNPickerSelect
                            value={selectedSound}
                            onValueChange={(value) => setSelectedSound(value)}
                            items={[
                                { label: "Ses Dosyası 1", value: "sound1.mp3" },
                                { label: "Ses Dosyası 2", value: "sound2.mp3" }
                                // Diğer ses dosyaları buraya eklenebilir
                            ]}
                        />
                    </View>
                </View>
            )}
            <View style={styles.settingItemContainer}>
                <Text style={styles.settingLabel}>Görsel Hatırlatma</Text>
                <Switch value={visualReminder} onValueChange={setVisualReminder} />
            </View>
            {visualReminder && (
                <View style={styles.settingItemContainer}>
                    <Button title="Resim Seç" onPress={openImageModal} />
                </View>
            )}

            {/* Resim seçim modalı */}
            <Modal
                visible={isImageModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.imageModalContainer}>
                    {/* Resim seçimi arayüzü burada olacak */}
                    <Button title="Kapat" onPress={closeImageModal} />
                </View>
            </Modal>
            <View style={styles.settingItemContainer}>
                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Otomatik İptal Süresi</Text>
                    <RNPickerSelect
                        value={autoCancel}
                        onValueChange={(value) => setAutoCancel(value)}
                        items={[
                            { label: '1 dakika', value: 1 },
                            { label: '5 dakika', value: 5 },
                            { label: '10 dakika', value: 10 },
                            { label: '15 dakika', value: 15 }
                            // Diğer otomatik iptal süreleri buraya eklenebilir
                        ]}
                    />
                </View>
            </View>
            <View style={styles.settingItemContainer}>
                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Sessiz Saatler</Text>
                    <RNPickerSelect
                        value={silentHours.startHour}
                        onValueChange={(value) => setSilentHours({ ...silentHours, startHour: value })}
                        items={hours}
                    />
                    <RNPickerSelect
                        value={silentHours.endHour}
                        onValueChange={(value) => setSilentHours({ ...silentHours, endHour: value })}
                        items={hours}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
                <Text style={styles.saveButtonText}>KAYDET</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    settingItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 5,
    },
    settingLabel: {
        fontSize: 18,
    },
    saveButton: {
        width: '95%',
        backgroundColor: '#b4d455',
        padding: 10,
        borderRadius: 5,

    },
    saveButtonText: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    }
});

export default SettingsScreen;


