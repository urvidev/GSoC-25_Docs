// Small UX touches
(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });

  // Robust multi-source image fallback: tries sources sequentially until one loads
  function loadWithFallback(img){
    const list = (img.getAttribute('data-srcs') || '').split(',').map(s => s.trim()).filter(Boolean);
    if (list.length === 0) return;
    let i = 0;
    const tryNext = () => {
      if (i >= list.length) return; // give up silently
      const src = list[i++];
      const test = new Image();
      test.onload = () => { img.src = src; };
      test.onerror = tryNext;
      test.src = src;
    };
    tryNext();
  }
  document.querySelectorAll('img.img-fallback').forEach(loadWithFallback);
})();
