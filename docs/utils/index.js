export const createNode = (type = 'div', classNames = [], styles = {}, children) => {
  const node = document.createElement(type);
  classNames.forEach((className) => node.classList.add(className));

  for(let style in styles) {
    node.style[style] = styles[style];
  }

  if (!children) {
    return node;
  }

  if(typeof children === 'string') {
    node.innerHTML = children;
  } else {
    node.appendChild(children);
  }

  return node
}

export const injectStyles = (path) => {
  const head = document.querySelector('head');
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', path);
  head.appendChild(link);
}