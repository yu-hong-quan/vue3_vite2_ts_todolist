/*
 * @Author: XiaoYu
 * @Date: 2023-02-07 15:47:04
 */
import { defineStore } from 'pinia';
import userStore from '..';
import { ITodoItem } from '../../types/data';
import request from '../../utils/reuqest';
import footerStore from './footerStore';
const mainStore = defineStore('main', {
	state: () => {
		return {
			list: [] as ITodoItem[] //在ts中默认为never类型，需要指定数组内字段的类型
		};
	},
	actions: {
		/**
     * 获取数据
     */
		async getTodos() {
			const { data } = await request.get<ITodoItem[]>('/'); //<ITodoItem[]>：指定返回值类型是一个泛型
			this.list = data;
		},
		/**
     * 删除数据
     * @param id number 
     */
		async deleteTodo(id: number) {
			request.delete(`/${id}`); //删除接口中数据列表的某一项
			this.getTodos();
		},
		/**
     * 更新数据
     * @param id 根据id来更新
     * @param key 更新谁
     * @param value 更新成什么 
     */
		async updateTodo(id: number, key: string, value: boolean | string) {
			await request.patch(`/${id}`, {
				[key]: value
			});
			this.getTodos();
		},
		/**
     * 新增数据
     * @param name 数据名称 
     */
		async addTodo(name: string) {
			await request.post('/', {
				name,
				done: false
			});
			this.getTodos();
		},
		/**
     * 更新状态
     * @param done 状态
     */
		async updatedAllStatus(done: boolean) {
			const arrPromise = this.list.map((item) => {
				return this.updateTodo(item.id, 'done', done);
			});
			await Promise.all(arrPromise);
			this.getTodos();
		},
		/**
     * 清空已完成的数据
     */
		async clearCompleted() {
			const arrPromise = this.completed.map((item) => {
				return request.delete(`/${item.id}`);
			});
			await Promise.all(arrPromise);
			this.getTodos();
		}
	},
	getters: {
		// mainRadioStatus(): boolean {
		// 	return this.list.every((item) => item.done);
		// },
		mainRadioStatus(_self) {
			//配置该参数可以有利于类型推断，而不需要指定参数类型了
			return _self.list.every((item) => item.done);
		},
		/**
     * 统计已完成的数据
     * @param state 
     * @returns 
     */
		completed(_self) {
			return _self.list.filter((item) => item.done);
		},
		/**
     * 统计未完成的数据
     * @param state 
     * @returns 
     */
		unCompleted(_self) {
			return _self.list.filter((item) => !item.done);
		},
    /**
     * 根据 active 筛选出来的数据
     */
    renderList(_self){
      const active = footerStore().active
      if(active === 'Active'){
        return _self.list.filter((item)=>!item.done)
      }
      if(active === 'Completed'){
        return _self.list.filter((item)=>item.done)
      }
      return _self.list
    }
	}
});

export default mainStore;
