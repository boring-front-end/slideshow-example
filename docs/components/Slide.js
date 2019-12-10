import {createNode, injectStyles} from '../utils/index.js';
const STYLE_PATH = './components/Slide.css';

injectStyles(STYLE_PATH);

export class Slide {
  constructor({root, isActive, src, style, description, rating}) {
    this.root = root;
    this.src = src;
    this.desc = description;
    this.rating = rating;
    this.style = style;
    this.isActive = isActive;
    this.render();
  }

  render() {
    this.renderContainer();
    this.renderImg();
    this.renderBadge()
    this.root.appendChild(this.container);
  }

  renderContainer() {
    this.container = document.createElement('li');
    this.container.classList.add('slide');
    this.addStyle()
  }

  setActive() {
    this.isActive = true;
    this.container.classList.add('active');
  }

  removeActive() {
    this.isActive = false;
    this.container.classList.remove('active');
  }

  addStyle() {
    for(let style in this.style) {
      this.container.style[style] = this.style[style];
    }
  }

  renderImg() {
    const img = document.createElement('img');
    img.classList.add('slide__img');
    img.src = this.src
    this.container.appendChild(img);
  }

  renderBadge() {
    const badge = createNode('div', ['slide__badge'], undefined, this.rating);
    this.container.appendChild(badge);
  }
}