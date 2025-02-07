import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function UserScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎来到用户页面</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});