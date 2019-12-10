import {Slide} from './Slide.js';
import {Control} from './Control.js';
import {createNode, injectStyles} from '../utils/index.js';

const URL = 'https://my-json-server.typicode.com/ilyalytvynov/ads-box-server/movies';
const SLIDER_CLASS_NAME = 'slider';

const getBlockClassName = (name) => `${SLIDER_CLASS_NAME}__${name}`;
injectStyles('./components/Slider.css');
class Slider {
  constructor(root = document.querySelector('body')) {
    this.root = root;
    this.activeSlide = 0;
    this._slides = [];
  }

  async init() {
    this.renderStatic()
    await this.fetchData();
    this.renderSlides();
  }

  async fetchData() {
    const response = await fetch(URL);
    const {list} = await response.json();
    this._slides= list;
  }

  renderSlides() {
    const root = document.createDocumentFragment();

    this._slidesNodes = this._slides.map((dataItem, i) => {
      const {title, preview: {high:src}, description, rating} = dataItem;
      const style = {transform: `translateX(${-100*i}%)`};
      return new Slide({root, title, src, description, rating, style})
    });
    this.setActive();
    this.slidesWrapper.innerHTML  = '';
    this.slidesWrapper.appendChild(root);
  }

  nextSlide() {
    this.removeActive();
    if(this.activeSlide < this._slidesNodes.length - 1) {
      this.activeSlide += 1;
    } else {
      this.activeSlide = 0;
    }
    this.setActive();
  }

  prevSlide() {
    this.removeActive();
    if(this.activeSlide > 0) {
      this.activeSlide -= 1;
    } else {
      this.activeSlide = this._slidesNodes.length - 1;
    }
    this.setActive();
  }

  goToFirst() {
    this.removeActive();
    this.activeSlide = 0;
    this.setActive();
  }

  goToLast() {
    this.removeActive();
    this.activeSlide = this._slidesNodes.length - 1;
    this.setActive();
  }

  setActive() {
    this._slidesNodes[this.activeSlide].setActive();
  }

  removeActive() {
    this._slidesNodes[this.activeSlide].removeActive();
  }

  renderStatic() {
    this.renderContainer();
    this.renderSlidesWrapper();
    this.renderControls();
  }

  renderContainer() {
    this.container = document.createElement('div');
    this.container.classList.add(SLIDER_CLASS_NAME);
    this.root.appendChild(this.container);
  }

  renderSlidesWrapper() {
    this.slidesWrapper = document.createElement('ul');
    this.slidesWrapper.classList.add(getBlockClassName('slides'));
    this.slidesWrapper.innerHTML = 'loading...';
    this.container.appendChild(this.slidesWrapper);
  }

  renderControls() {
    const fragment = document.createDocumentFragment();
    Control.create(fragment, '<<<', () => this.goToFirst());
    Control.create(fragment, '<', () => this.prevSlide());
    Control.create(fragment, '>', () => this.nextSlide());
    Control.create(fragment, '>>>', () => this.goToLast());
    const container = createNode('div', ['slider__controls'], undefined, fragment);
    this.container.appendChild(container);
  }
}

export {Slider};