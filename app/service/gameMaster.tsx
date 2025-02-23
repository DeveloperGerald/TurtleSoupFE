import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const getRandomStory =  async (): Promise<any> => {
    let userToken
    await AsyncStorage.getItem('userToken').then((value) => { userToken = value;});
    let data
    
    try {
        // 发起 POST 请求
        const response = await axios.get('http://192.168.1.8:8080/ttsoup/api/v1/game-master/random-story', {
            headers: {
              'Authorization': 'Bearer ' + userToken, // 添加认证 token
              'Content-Type': 'application/json', // 设置内容类型
            },
          });
        data = response.data;
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw error;
        }
    }

    if (data.code !== 0) {
        throw new Error(data.message);
    }

    return data.data;
}

const giveAnswer = async (storyID:string, userAnswer:string): Promise<any> => {
    console.log('giveAnswer', storyID, userAnswer);
    let userToken
    await AsyncStorage.getItem('userToken').then((value) => { userToken = value;});
    console.log('userToken', userToken);
    let data

    try {
        // 发起 POST 请求
        const response = await axios.post('http://192.168.1.8:8080/ttsoup/api/v1/game-master/answer', 
        {
            story_id: storyID,
            user_answer: userAnswer
        }, 
        {
            headers: {
              'Authorization': 'Bearer ' + userToken, // 添加认证 token
              'Content-Type': 'application/json', // 设置内容类型
            }
        });
        data = response.data;
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw error;
        }
    }

    if (data.code !== 0) {
        throw new Error(data.message);
    }

    return data.data;
}

export { getRandomStory, giveAnswer };