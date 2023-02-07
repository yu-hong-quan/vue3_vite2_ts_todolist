/*
 * @Author: XiaoYu
 * @Date: 2023-02-07 15:47:11
 */
import footerStore from "./modules/footerStore";
import mainStore from "./modules/mainStore";

export default function userStore(){
  return {
    main:mainStore(),
    footer:footerStore()
  }
}