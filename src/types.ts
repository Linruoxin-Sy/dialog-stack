import { VNode } from "vue";

export interface DialogInstance {
  id: string; // 唯一标识
  scopeId: string; // 作用域标识
  component: VNode; // 渲染的组件内容
  visible: boolean; // 用于控制动画显隐
}
