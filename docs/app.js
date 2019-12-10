// import {Slider} from '/components/Slider.js';
const loadSlider = async () => {
  const {Slider} = await import('./components/Slider.js');
  const slider = new Slider();
  slider.init();
}

loadBtn.addEventListener('click', () => {
  loadSlider();
}) 