import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, FlatList, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons'; // Certifique-se de ter o pacote @expo/vector-icons instalado

const NoteScreen = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };

    loadNotes();
  }, []);

  const saveNote = async () => {
    if (!note.trim()) {
      Alert.alert('Error', 'Note cannot be empty!');
      return;
    }

    try {
      let newNotes;
      if (editingIndex !== null) {
        newNotes = notes.map((item, index) => (index === editingIndex ? note : item));
        setEditingIndex(null);
      } else {
        newNotes = [...notes, note];
      }
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setNotes(newNotes);
      setNote('');
      Alert.alert('Success', 'Note saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save the note.');
    }
  };

  const deleteNote = async (index: number) => {
    try {
      const updatedNotes = notes.filter((_, i) => i !== index);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      Alert.alert('Success', 'Note deleted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete the note.');
    }
  };

  const editNote = (index: number) => {
    setNote(notes[index]);
    setEditingIndex(index);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write your note here..."
        value={note}
        onChangeText={setNote}
      />
      <Button title={editingIndex !== null ? "Update Note" : "Save Note"} onPress={saveNote} />
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => editNote(index)}>
                <FontAwesome name="edit" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(index)}>
                <FontAwesome name="trash" size={24}  />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  noteText: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
});

export default NoteScreen;
