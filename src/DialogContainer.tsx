import { defineComponent, onBeforeUnmount } from "vue";
import { dialogStore } from "./store";

interface DialogContainerProps {
  shadowClose?: boolean;
}
export const DialogContainer = defineComponent<DialogContainerProps>({
  name: "DialogContainer",
  setup(props) {
    // onBeforeUnmount(() => {
    //   console.log("DialogContainer unmounted, clearing dialog store.");
    //   dialogStore.clear();
    // });
    return () => (
      <div
        v-show={dialogStore.size() > 0}
        style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;"
      >
        {/* 遮罩 */}
        {!props.shadowClose && (
          <div style="position: absolute; inset: 0; background: rgba(0, 0, 0, 0.5); pointer-events: none;"></div>
        )}
        {dialogStore.map((dialog) => (
          <div
            key={dialog.id}
            v-show={dialog.visible}
            style="position: absolute; inset: 0; display: flex; justify-content: center; align-items: center;"
          >
            {/* 渲染缓存的组件实例 */}
            {dialog.component}
          </div>
        ))}
      </div>
    );
  },
});
