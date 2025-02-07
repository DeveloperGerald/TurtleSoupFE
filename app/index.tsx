import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true); // 页面加载时的loading状态
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      // 尝试从本地存储中获取用户的登录信息（例如：token）
      const token = await AsyncStorage.getItem('userToken');

      if (true) {
        // 如果有 token，说明用户已登录，跳转到主页面
        router.replace('/main/MainScreen');  // 跳转到主页
      } else {
        // 如果没有 token，跳转到登录页面
        router.push('/auth/LoginScreen');  // 跳转到登录页面
      }

      setLoading(false); // 加载完成，设置 loading 为 false
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; // 在用户登录状态检查完成之前显示loading
  }

  return null; // 这里可以返回null，页面跳转后不会再渲染此组件
}