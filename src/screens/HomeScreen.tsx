import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { RootStackParamList } from '../navigation/StackNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Icon name="note" size={100} color="#4CAF50" />

      <Text style={styles.title}>Bem-vindo ao NoteApp</Text>
      <Text style={styles.subtitle}>O que você gostaria de fazer hoje?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Note')}>
        <Icon name="note-add" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Criar Nova Nota</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('SavedNote')}>
        <Icon name="description" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Ver Notas Salvas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, // Espaço entre o ícone e o texto
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default HomeScreen;
