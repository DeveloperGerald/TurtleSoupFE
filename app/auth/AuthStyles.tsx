import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5', // 背景色浅灰
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#6A4E23', // 主色调：深棕色
      marginBottom: 40,
    },
    input: {
      width: '80%',  // 限制输入框宽度为屏幕宽度的 80%
      height: 50,
      borderColor: '#D3B9A8', // 浅棕色
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 15,
      paddingHorizontal: 15,
      fontSize: 16,
      color: '#3C2A21', // 深棕色
      backgroundColor: '#FFF',
    },
    inputError: {
      borderColor: '#F44336', // 错误时边框为红色
    },
    error: {
      color: '#F44336',
      fontSize: 14,
      marginBottom: 10,
      textAlign: 'left',
      width: '80%', // 错误提示文本的宽度调整为 80% 跟输入框一致
    },
    button: {
      backgroundColor: '#4CAF50', // 更新按钮背景色为深绿色
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    registerLink: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 10,
      },
  });

  export default styles;