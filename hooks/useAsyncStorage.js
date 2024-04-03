import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage için özel bir hook
const useAsyncStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(initialValue);

    useEffect(() => {
        const loadStoredValue = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(key);
                console.log("Loaded value:", jsonValue);
                if (jsonValue !== null) {
                    setStoredValue(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error('AsyncStorage error:', e);
            }
        };

        loadStoredValue();
    }, [key]);

    const setValue = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            setStoredValue(value);
        } catch (e) {
            console.error('AsyncStorage error:', e);
        }
    };

    return [storedValue, setValue];
};

export default useAsyncStorage;
