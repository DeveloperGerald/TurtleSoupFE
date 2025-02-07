// app/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import styles from './AuthStyles';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const router = useRouter();

  useEffect(() => {
    // 实时校验用户名是否符合规则：字母、数字和简单字符
    const usernameRegex = /^[a-zA-Z0-9_]{1,20}$/;
    setIsUsernameValid(usernameRegex.test(username));
  }, [username]);

  useEffect(() => {
    // 实时校验密码是否符合规则：至少8个字符，包含字母和数字
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    setIsPasswordValid(passwordRegex.test(password));
  }, [password]);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('请填写用户名和密码');
      return;
    }

    if (!isUsernameValid || !isPasswordValid) {
      setError('请输入有效的用户名和密码');
      return;
    }

    try {
      // 发送登录请求
      const response = await axios.post('https://your-api-url/login', {
        username,
        password,
      });
      console.log('登录成功:', response.data);
      // 登录成功后，跳转到主页面
      navigation.navigate('Main');
    } catch (err) {
      console.error('登录失败', err);
      setError('用户名或密码错误');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={[styles.input, !isUsernameValid && styles.inputError]}
        placeholder="请输入用户名"
        value={username}
        onChangeText={setUsername}
      />
      {!isUsernameValid && <Text style={styles.error}>用户名只支持字母、数字和下划线</Text>}

      <TextInput
        style={[styles.input, !isPasswordValid && styles.inputError]}
        placeholder="请输入密码"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {!isPasswordValid && (
        <Text style={styles.error}>
          密码必须至少8个字符，包含字母和数字
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>登录</Text>
      </TouchableOpacity>
      <Text
        style={styles.registerLink}
        onPress={() => router.replace('/auth/RegisterScreen')}
      >
        没有账号？点击这里注册
      </Text>
    </View>
  );
};