const contenedor = document.getElementById('contenedor');
const formData = document.getElementById('formulario-datos');

document.addEventListener('DOMContentLoaded', () => {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

  tareas.forEach(({ title, description }) => {
    createCard(title, description);
  });
});


function createCard(title, description) {
  const nuevoDiv = document.createElement('div');
  nuevoDiv.className =
    'flex items-start lg:items-center bg-white rounded-lg p-3 shadow-sm';
  nuevoDiv.innerHTML = `
    <span class="text-red-400 text-xl mr-3 lg:text-3xl">🕒</span>
    <div>
      <h1 class="font-mono font-bold text-base lg:text-xl text-gray-800">${title}</h1>
      <p class="text-gray-600 mt-1 text-sm font-mono">${description}</p>
    </div>
  `;

  contenedor.appendChild(nuevoDiv);
}


formData.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title-area').value.trim();
  const description = document.getElementById('description-area').value.trim();


  if (!title || !description) {
    alert('Por favor completa ambos campos.');
    return;
  }

  createCard(title, description);


  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas.push({ title, description });
  localStorage.setItem('tareas', JSON.stringify(tareas));


  formData.reset();
});
