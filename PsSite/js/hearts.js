// hearts.js
// Creates floating hearts in the background with randomized properties.

(function(){
  const HEART_COUNT = 18;
  const container = document.createElement('div');
  container.className = 'hearts';
  document.body.appendChild(container);

  function rand(min, max){ return Math.random() * (max - min) + min }

  for(let i=0;i<HEART_COUNT;i++){
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';

    // randomize size
    const size = Math.round(rand(24,72));
    heart.style.fontSize = size + 'px';

    // position horizontally
    heart.style.left = Math.floor(rand(0,100)) + 'vw';

    // random animation duration and delay
    const duration = rand(8,24);
    const delay = rand(-8,0);
    heart.style.animation = `rise ${duration}s linear ${delay}s infinite`;

    // slight opacity variation
    heart.style.opacity = rand(0.35,0.95).toFixed(2);

    // create color variance
    const color = (Math.random() > 0.5) ? 'var(--accent)' : 'var(--accent-2)';
    heart.style.setProperty('--heart-color', color);

    // make sure hearts don't block content
    heart.style.pointerEvents = 'none';
    heart.style.whiteSpace = 'nowrap';

    // random horizontal drift using CSS variable on creation
    const drift = rand(-8,8);
    heart.style.left = `calc(${heart.style.left} + ${drift}vw)`;

    container.appendChild(heart);
  }

  // Allow hearts to inherit color variable for pseudo elements
  const style = document.createElement('style');
  style.innerHTML = `.heart:before,.heart:after{background:var(--heart-color, var(--accent));}`;
  document.head.appendChild(style);

})();
