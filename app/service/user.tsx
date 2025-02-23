import axios from 'axios';


const register =  async (name: string, password: string): Promise<any> => {
  let data = null;  
  try {
    // 发起 POST 请求
    const response = await axios.post('http://127.0.0.1:8080/ttsoup/api/v1/user/register', {
      name: name,
      password: password,
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

const login = async (name: string, password: string): Promise<any> => {
  let data = null;  
  try {
      // 发起 POST 请求
      const response = await axios.post('http://192.168.1.8:8080/ttsoup/api/v1/user/login', {
        name: name,
        password: password,
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

export { login, register };