import { reactive, watch } from "vue";
import { DialogInstance } from "./types";

export type DialogStore = ReturnType<typeof createDialogStore>;

export const dialogStore = createDialogStore();

export function createDialogStore() {
  const dialogStack = reactive<DialogInstance[]>([]);
  const dialogMap = new Map<DialogInstance["id"], DialogInstance>();

  const push = (dialog: DialogInstance) => {
    dialogStack.push(dialog);
    dialogMap.set(dialog.id, dialog);
  };

  const pop = () => {
    if (dialogStack.length === 0) return null;
    const dialog = dialogStack.pop()!;
    dialogMap.delete(dialog.id);
    return dialog;
  };

  const peek = () => {
    if (dialogStack.length === 0) return null;
    return dialogStack[dialogStack.length - 1];
  };

  const map = <T>(callback: (dialog: DialogInstance, index: number) => T) => {
    return dialogStack.map(callback);
  };

  const isEmpty = () => {
    return dialogStack.length === 0;
  };

  const size = () => {
    return dialogStack.length;
  };

  const clear = () => {
    dialogStack.length = 0;
    dialogMap.clear();
  };

  const isExisted = (id: DialogInstance["id"]) => {
    return dialogMap.has(id);
  };

  const getDialog = (id: DialogInstance["id"]) => {
    return dialogMap.get(id) || null;
  };

  // 按作用域移除对话框实例
  const removeByScope = (scopeId: string) => {
    for (let i = dialogStack.length - 1; i >= 0; i--) {
      if (dialogStack[i].scopeId === scopeId) {
        dialogMap.delete(dialogStack[i].id);
        dialogStack.splice(i, 1);
      }
    }
  };

  return {
    push,
    pop,
    peek,
    map,
    isEmpty,
    size,
    clear,
    isExisted,
    getDialog,
    removeByScope,
  };
}
