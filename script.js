// Theme toggle
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('on');
  document.body.classList.toggle('light');
});

// Click an image slot to preview a local file (drag-and-drop also supported)
function wireImageSlot(slotId) {
  const slot = document.getElementById(slotId);
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.style.display = 'none';
  document.body.appendChild(input);

  const loadFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      slot.innerHTML = `<img src="${e.target.result}" alt="">`;
    };
    reader.readAsDataURL(file);
  };

  slot.addEventListener('click', () => input.click());
  input.addEventListener('change', () => loadFile(input.files[0]));

  slot.addEventListener('dragover', (e) => {
    e.preventDefault();
    slot.style.borderColor = 'rgba(255,255,255,0.6)';
  });
  slot.addEventListener('dragleave', () => {
    slot.style.borderColor = '';
  });
  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    slot.style.borderColor = '';
    loadFile(e.dataTransfer.files[0]);
  });
}

wireImageSlot('slot1');
wireImageSlot('slot2');
