import Alpine from 'alpinejs';

const modeChangeHandlers: ((mode: string) => void)[] = [];
const detailChangeHandlers: ((detail: string) => void)[] = [];

document.addEventListener('alpine:init', () => {
  Alpine.data('mode', () => ({
    mode: 'text',
    currentDetail: 'blocks',
    details: [
      'blocks',
      'paragraphs',
      'words',
      'symbols',
    ],
    changeMode(mode: string) {
      this.mode = mode;
      this.currentDetail = 'blocks';

      modeChangeHandlers.forEach((handler) => handler(mode));
      detailChangeHandlers.forEach((handler) => handler('blocks'));
    },
    changeDetail(detail: string) {
      this.currentDetail = detail;
      detailChangeHandlers.forEach((handler) => handler(detail));
    },
    cap(text: string) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
  }));
});

export const alpine = {
  start() {
    Alpine.start();
  },
  onChangeMode(handler: (mode: string) => void) {
    modeChangeHandlers.push(handler);
  },
  onChangeDetail(handler: (detail: string) => void) {
    detailChangeHandlers.push(handler);
  },
};