import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const ExampleScreen = () => {
  const [contador, setContador] = useState(0);
 

  useEffect(() => {
    const titulo = `Você clicou ${contador} vezes`;
    Alert.alert('Atualização', titulo); 
  }, [contador]);


  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Você clicou {contador} vezes</Text>
        <Button title="Clique aqui" onPress={() => setContador(contador + 1)} />
      </View>
     
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
  section: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default ExampleScreen;
