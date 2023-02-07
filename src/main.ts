/*
 * @Author: XiaoYu
 * @Date: 2023-02-07 15:22:44
 */
import { createApp } from 'vue'
import './styles/base.css'
import './styles/index.css'
import App from './App.vue'

import { createPinia } from 'pinia';

createApp(App).use(createPinia()).mount('#app')