import { useEffect, useState } from "react";
import MainScreen from "./main/MainScreen";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 在根布局加载后执行导航
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      router.replace('/main/MainScreen');
    }
  }, [isReady]);

  console.log('return index');
  return null;
}