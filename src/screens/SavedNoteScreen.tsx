import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedNoteScreen = () => {
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const savedNote = await AsyncStorage.getItem('note');
        if (savedNote) {
          setNote(savedNote);
        } else {
          setNote('No saved notes.');
        }
      } catch (error) {
        console.error('Failed to load note:', error);
        setNote('Failed to load note.');
      }
    };

    loadNote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{note}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
  },
});

export default SavedNoteScreen;
