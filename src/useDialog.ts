import { onBeforeUnmount, VNode } from "vue";
import { dialogStore, DialogStore } from "./store";
import { DialogInstance } from "./types";
import { generateUniqueId, log } from "./utils";

function createDialog(content: VNode, store: DialogStore, scopeId: string) {
  const dialogId = `__dialog_${generateUniqueId()}`;
  const dialog: DialogInstance = {
    id: dialogId,
    scopeId,
    component: content,
    visible: true,
  };
  store.push(dialog);

  const show = () => {
    dialog.visible = true;
  };

  const hide = () => {
    dialog.visible = false;
  };

  return { id: dialogId, dialog, show, hide };
}

export function useDialog() {
  const store = dialogStore;
  const scopeId = `__useDialog_scope_${generateUniqueId()}`;

  const push = (content: VNode) => {
    return createDialog(content, store, scopeId);
  };

  const pop = () => {
    const dialog = store.pop();
    if (dialog) {
      return dialog;
    }
  };

  const backTo = (id: DialogInstance["id"]) => {
    if (!store.isExisted(id)) {
      log.error(`Dialog with id ${id} does not exist.`);
      return;
    }
    while (store.peek()?.id !== id) {
      store.pop();
    }
  };

  const destroy = () => {
    store.clear();
  };

  onBeforeUnmount(() => {
    store.removeByScope(scopeId);
  });

  return { store, push, pop, backTo, destroy };
}
