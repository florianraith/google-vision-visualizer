import Alpine from 'alpinejs';

const modeChangeHandlers: ((mode: string) => void)[] = [];

document.addEventListener('alpine:init', () => {
  Alpine.data('mode', () => ({
    mode: 'text',
    changeMode(mode: string) {
      this.mode = mode;
      modeChangeHandlers.forEach((handler) => handler(mode));
    }
  }));
});

export const alpine = {
  start() {
    Alpine.start();
  },
  onChangeMode(handler: (mode: string) => void) {
    modeChangeHandlers.push(handler);
  },
};