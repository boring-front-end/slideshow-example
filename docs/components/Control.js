import {createNode, injectStyles} from '../utils/index.js';
const STYLE_PATH = './components/Control.css';

injectStyles(STYLE_PATH);
class Control {
  static create(root, title, onClick) {
    return (new Control(root, title, onClick)).render();
  }
  constructor(root, title, onClick) {
    this._root = root;
    this._title = title;
    this._clickHandler = onClick;
  }

  init() {
    injectStyles(STYLE_PATH);
  }

  render() {
    this._control = createNode('button', ['control', 'control__default'], undefined, `<span>${this._title}</span>`);
    if (this._clickHandler) {
      this._control.addEventListener('click', (e) => this._clickHandler(e))
    }
    this._root.appendChild(this._control);
    return this;
  }
}

export {Control};