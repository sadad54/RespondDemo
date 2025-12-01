// src/store/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware';

// We don't need to initialize anything with 'new' here.
// AsyncStorage is a singleton object ready to use.

// Create an adapter that matches Zustand's expected interface
export const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    return await AsyncStorage.setItem(name, value);
  },
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  removeItem: async (name) => {
    return await AsyncStorage.removeItem(name);
  },
};