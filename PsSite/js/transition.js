// transition.js
// Handles smooth fade transitions between pages when image cards are clicked.

document.addEventListener('DOMContentLoaded', ()=>{
  const links = document.querySelectorAll('.card, .profile-wrap, .title.clickable');
  links.forEach(el=>{
    el.addEventListener('click', (e)=>{
      const target = el.getAttribute('data-target');
      if(!target) return;
      e.preventDefault();
      const app = document.getElementById('app');
      if(app){
        app.classList.remove('fade-in');
        app.classList.add('fade-out');
        // wait for animation then navigate
        setTimeout(()=> window.location.href = target, 480);
      } else {
        window.location.href = target;
      }
    });
  });

  // Ensure audio continues on single-page navigation and attempts autoplay when the page opens.
  function playBackgroundAudio(){
    const audios = document.querySelectorAll('#bg-music');
    audios.forEach(a=>{
      a.loop = true;
      a.volume = 0.6;
      a.style.display = 'none';
      a.load();
      const playPromise = a.play();
      if(playPromise && typeof playPromise.catch === 'function'){
        playPromise.catch(()=>{});
      }
    });
  }

  function resumeAudioOnInteraction(){
    const audios = document.querySelectorAll('#bg-music');
    if(!audios.length) return;
    const handler = ()=>{
      audios.forEach(a=>{ a.play().catch(()=>{}); });
      window.removeEventListener('click', handler);
      window.removeEventListener('touchstart', handler);
      window.removeEventListener('keydown', handler);
    };
    window.addEventListener('click', handler, { once: true });
    window.addEventListener('touchstart', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
  }

  try{
    playBackgroundAudio();
    resumeAudioOnInteraction();
  }catch(e){}
});
