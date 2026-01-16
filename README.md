## Dialog-Stack

Vue 的组件并不像 React 的组件那样灵活，在脚手架里，组件通常用一个 `.vue` 文件表示

但 `plugin-vue-jsx` 的出现让我们可以在 `.vue` 中直接编写可读性更高的标签结构，而不是用 `h()` 函数进行编写，这让复杂的命令式组件管理成为可能

## Features

- 🚀 **堆栈式管理** - 支持多个对话框的堆栈式管理，自动处理对话框的层级关系
- 📦 **响应式** - 基于 Vue 3 响应式系统，对话框状态自动同步
- 🎨 **灵活的组件传入** - 支持 TSX 和 `h()` 函数两种方式传入对话框内容
- 🔧 **简洁的 API** - 提供 `push`、`pop` 等直观的堆栈操作方法
- 🎯 **作用域隔离** - 支持按作用域管理和清理对话框实例

## Installation

拉取 `dialog-stack`

```bash
pnpm add dialog-stack
```

JSX 支持，如果你需要使用 JSX 语法

```bash
pnpm add @vitejs/plugin-vue-jsx -D
```

并在 `vite.config.ts` 中进行配置

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```

## Get Started

1. 在 `App.vue` 中添加 `<DialogContainer />`

```vue
<script setup lang="ts">
import { DialogContainer } from "dialog-stack";
</script>

<template>
  <DialogContainer />
</template>
```

2. 使用 `useDialog` 管理对话框

`useDialog()` 必须在组件的 `setup` 内被调用，调用 `useDialog()` 所在的组件被卸载时，会自动清理由调用 `useDialog()` 解构出来的 `push()` 所创建的所有弹窗

```vue
<script setup lang="tsx">
import { DialogContainer, useDialog } from "dialog-stack";
import { h } from "vue";

const { push, pop } = useDialog();

push(<h1 style={{ background: "#fff" }}>Hello World!</h1>);
</script>
```

如果你不希望使用 JSX 语法，也可以使用 `h()` 函数创建组件

> 使用 [h()](https://vuejs.org/api/render-function.html#h) 需要对 Vue.js 的实现原理有所了解

```vue
<script setup lang="ts">
import { useDialog } from "dialog-stack";
import { h } from "vue";

const { push, pop } = useDialog();

push(h("h2", { style: "background: #fff" }, "Use it!"));
</script>
```

3. 使用 `push()` 创建一个新的弹窗

弹窗默认会显示在视口的水平与垂直的居中位置，没有任何附加样式，弹窗的样式与动画都需要在 `push()` 传入时自行编写

```vue
<script setup lang="tsx">
import { DialogContainer, useDialog } from "dialog-stack";
import { Transition } from "vue";

const { push, pop } = useDialog();

push(
  <Transition name="fade" appear>
    <h1 style={{ background: "#fff" }}>Hello World!</h1>
  </Transition>
);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
```

4. `pop()` 会摧毁顶层的弹窗

```vue
<script setup lang="tsx">
import { DialogContainer, useDialog } from "dialog-stack";

const { push, pop } = useDialog();

push(<h1 style={{ background: "#fff" }}>Hello World!</h1>);

setTimeout(() => {
  pop();
}, 1000);
</script>
```
