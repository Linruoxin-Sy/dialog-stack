export function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const log = {
  info: (...args: any[]) => {
    console.info("[DialogStack] ", ...args);
  },
  warn: (...args: any[]) => {
    console.warn("[DialogStack] ", ...args);
  },
  error: (...args: any[]) => {
    console.error("[DialogStack] ", ...args);
  },
};
