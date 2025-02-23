import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import {getRandomStory, giveAnswer} from '../service/gameMaster';

const fetchHostResponse = async (userMessage: string) => {
  // 这里替换为实际的 API 调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`主持人回复：你刚刚说了 "${userMessage}"，这是一个有趣的回答！`);
    }, 1000);
  });
};

export default function MainScreen() {
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [story, setStory] = useState({id: '', title: '', riddle: '', full_story: ''});

  // 点击“快速开始”后的逻辑
  const handleStartChat = async () => {
    console.log('开始聊天');
    setChatMode(true);
    setIsLoading(true);

    // 调用接口获取故事
    let story = await getRandomStory();
    console.log('story:', story);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: story.riddle, user: '主持人' },
    ]);
    setStory(story);

    setIsLoading(false);
  };

  // 用户发送消息后的逻辑
  const handleUserMessage = async () => {
    if (userInput.trim()) {
      console.log('用户发送消息：', userInput);
      // 添加用户消息
      const newMessage = { id: Date.now(), text: userInput, user: '用户' };
      setMessages((prev) => [...prev, newMessage]);
      setUserInput('');

      setIsLoading(true);

      // 调用接口获取主持人回复
      console.log('story:', story);
      const hostResponse = await giveAnswer(story.id, userInput);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: hostResponse.answer, user: '主持人' },
      ]);

      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!chatMode ? (
        <Button title="快速开始" onPress={handleStartChat} />
      ) : (
        <View style={styles.chatContainer}>
          <ScrollView style={styles.chatBox}>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageContainer,
                  msg.user === '用户' ? styles.userMessage : styles.hostMessage,
                ]}
              >
                <Avatar.Text
                  label={msg.user === '用户' ? 'U' : 'H'}
                  size={40}
                  style={msg.user === '用户' ? styles.userAvatar : styles.hostAvatar}
                />
                <View style={styles.bubble}>
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              </View>
            ))}
            {isLoading && (
              <View style={styles.hostMessage}>
                <Avatar.Text label="H" size={40} style={styles.hostAvatar} />
                <View style={styles.bubble}>
                  <Text style={styles.messageText}>主持人正在思考...</Text>
                </View>
              </View>
            )}
          </ScrollView>
          <TextInput
            style={styles.input}
            placeholder="请输入你的回答"
            value={userInput}
            onChangeText={setUserInput}
            editable={!isLoading} // 加载时禁用输入框
          />
          <Button
            title="发送"
            onPress={handleUserMessage}
            disabled={isLoading} // 加载时禁用按钮
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chatBox: {
    flex: 1,
    marginBottom: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  hostMessage: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    backgroundColor: '#e1ffc7',
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  userAvatar: {
    backgroundColor: '#4caf50',
  },
  hostAvatar: {
    backgroundColor: '#2196f3',
  },
});