// script.js
(() => {
  const textarea       = document.getElementById('log');
  const pageIndicator  = document.getElementById('pageIndicator');
  const nextBtn        = document.getElementById('nextBtn');
  const prevBtn        = document.getElementById('prevBtn');
  const WS_URL         = 'ws://localhost:8000/ws/audio';

  // Load or initialize pages array from sessionStorage
  let pages = JSON.parse(sessionStorage.getItem('pages') || '[]');
  if (!pages.length) pages = [['']];  // start with one page (an array of lines)

  let idx = Number(sessionStorage.getItem('currentPage')) || 0;

  // Render the current page
  function renderPage() {
    pageIndicator.textContent = `Trang ${idx + 1}`;
    textarea.value = pages[idx].join('\n');
    sessionStorage.setItem('currentPage', idx);
    sessionStorage.setItem('pages', JSON.stringify(pages));
  }

  // Handle navigation
  function goNext() {
    if (idx === pages.length - 1) {
      pages.push(['']);  // create new blank page
    }
    idx++;
    renderPage();
  }
  function goPrev() {
    if (idx > 0) {
      idx--;
      renderPage();
    }
  }
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  // WebSocket setup
  const socket = new WebSocket(WS_URL);
  socket.addEventListener('open', () => console.log('WS connected'));
  socket.addEventListener('close', () => console.log('WS closed'));

  socket.addEventListener('message', ({ data }) => {
    const msg = data.trim().toLowerCase();
    if (msg === 'trang tiếp') {
      goNext();
    } else if (msg === 'trang sau') {
      goPrev();
    } else {
      // Append to current page
      pages[idx].push(data);
      renderPage();
      // auto‑scroll
      textarea.scrollTop = textarea.scrollHeight;
    }
  });

  // Initial render
  renderPage();
})();
