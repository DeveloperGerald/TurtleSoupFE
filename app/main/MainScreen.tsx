import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MainScreen({ navigation }: any) {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>欢迎来到主页面</Text>
      <Button title="登出" onPress={() => router.replace('/auth/LoginScreen')} />
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