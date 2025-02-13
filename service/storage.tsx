
import AsyncStorage from './../node_modules/@react-native-async-storage/async-storage/lib/module/index';

export const setLocalStorage = async(key: any, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = async(key: any) => {
    const result = await AsyncStorage.getItem(key);
    return JSON.parse(result)
}

export const RemoveLocalStorage= async () => {
    await AsyncStorage.clear();
} 