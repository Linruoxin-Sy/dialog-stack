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

```vue
<script setup lang="tsx">
import { DialogContainer, useDialog } from "dialog-stack";
import { h } from "vue";

const { push, pop } = useDialog();

// 推荐：使用 TSX 语法传入组件
push(<h1 style="background: #fff">Hello World!</h1>);
</script>
```

如果你不希望使用 JSX 语法，也可以使用 `h()` 函数创建组件

```vue
<script setup lang="ts">
import { DialogContainer, useDialog } from "dialog-stack";
import { h } from "vue";

const { push, pop } = useDialog();

// 使用 h() 函数传入组件
push(h("h2", { style: "background: #fff" }, "Use it!"));
</script>
```
