/*
 * @Author: XiaoYu
 * @Date: 2023-02-07 16:30:38
 */
export interface ITodoItem {//接口类型
	id: number;
	name: string;
	done: boolean;
}

export type TActive = 'All' | 'Active' | 'Completed';//联合类型别名