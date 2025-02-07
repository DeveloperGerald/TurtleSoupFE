// app/RegisterScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './AuthStyles';

export default function RegisterScreen({ navigation }: any){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

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

  useEffect(() => {
    // 实时校验确认密码是否与密码一致
    setIsConfirmPasswordValid(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      setError('请填写用户名和密码');
      return;
    }

    if (!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid) {
      setError('请输入有效的用户名和密码');
      return;
    }

    try {
      // 发送注册请求
      const response = await axios.post('https://your-api-url/register', {
        username,
        password,
      });
      console.log('注册成功:', response.data);
      // 注册成功后，跳转到登录页面
      navigation.navigate('Login');
    } catch (err) {
      console.error('注册失败', err);
      setError('注册失败，请稍后再试');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>注册</Text>
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

      <TextInput
        style={[styles.input, !isConfirmPasswordValid && styles.inputError]}
        placeholder="确认密码"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {!isConfirmPasswordValid && <Text style={styles.error}>密码与确认密码不一致</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>注册</Text>
      </TouchableOpacity>
    </View>
  );
};

