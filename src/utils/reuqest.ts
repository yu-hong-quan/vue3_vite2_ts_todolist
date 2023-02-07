/*
 * @Author: XiaoYu
 * @Date: 2023-02-07 16:15:33
 */
import axios from 'axios';

const request = axios.create({
  baseURL:'http://localhost:8888/todos',
})

export default request;