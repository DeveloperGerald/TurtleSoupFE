// app/_layout.tsx
import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFFFFF', // 激活的Tab颜色
          tabBarInactiveTintColor: '#B0B0B0', // 未激活的Tab颜色
          tabBarStyle: {
            backgroundColor: 'linear-gradient(45deg, #6a11cb, #2575fc)', // 渐变背景
            borderTopWidth: 0, // 去除Tab条的边框
            paddingBottom: 10,
            height: 60,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5, // Android的阴影
          },
          headerShown: true, // 隐藏顶部标题栏
        }}
      >
        <Tabs.Screen
          name="MainScreen"
          options={{
            title: '主页',
            tabBarIcon: ({ color }) => <Icon size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="UserScreen"
          options={{
            title: '个人',
            tabBarIcon: ({ color }) => <Icon size={28} name="user" color={color} />,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
