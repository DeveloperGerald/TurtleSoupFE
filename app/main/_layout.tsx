import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainLayout() {
  const [isLoading, setIsLoading] = useState(true); // 加载状态
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 登录状态
  const router = useRouter();
  const pathname = usePathname(); // 获取当前路由路径

  console.log('start main layout');

  useEffect(() => {
    const checkLoginStatus = async () => {
      // 尝试从本地存储中获取用户的登录信息（例如：token）
      const token = await AsyncStorage.getItem('userToken');
      console.log('token', token);

      if (false) {
        // 如果有 token，说明用户已登录，跳转到主页面
        setIsLoggedIn(true);
      } else {
        // 如果没有 token，跳转到登录页面
        setIsLoggedIn(false);
        if (pathname !== '/auth/LoginScreen' && pathname !== '/auth/RegisterScreen') {
          console.log('pathname', pathname);
          // router.replace('/auth/LoginScreen');
        }
      }

      setIsLoading(false); // 加载完成，设置 loading 为 false
    };

    checkLoginStatus();
  }, [pathname]);

  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
    if (!isLoading && !isLoggedIn && pathname !== '/auth/LoginScreen' && pathname !== '/auth/RegisterScreen') { // 如果未登录，跳转到登录页面
        router.replace('/auth/LoginScreen');
        }
  }, [isLoggedIn, isLoading]);

  // 根据是否显示选项卡渲染不同的布局
  return (
    <Tabs>
        <Tabs.Screen name="MainScreen" options={{ title: '主页' }} />
        <Tabs.Screen name="UserScreen" options={{ title: '我的' }} />
    </Tabs>
  );
}
