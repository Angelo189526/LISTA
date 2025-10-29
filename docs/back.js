// ----------------------
// Seleccionar elementos del DOM
// ----------------------
const contenedor = document.getElementById('contenedor');
const fechaActual = document.getElementById('fecha-actual');
const formData = document.getElementById('formulario-datos');


//-----------------------
// Configurar fecha actual
// ----------------------
const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();

fechaActual.textContent = `${dia}/${mes}/${anio}`;


// ---------------------
// Funciones auxiliares (datos / localStorage)
//---------------------
function eliminarTarea(title) {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  const tareasActualizadas = tareas.filter(tarea => tarea.title !== title);
  localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
}


// ----------------------
// Funciones de UI Cards y demás
// ----------------------
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
    <div class="ml-auto flex lg:items-center">
      <button class="delete-btn mr-3">❌</button>
    </div>
  `;

  nuevoDiv.querySelector('.delete-btn').addEventListener('click', () => {
    nuevoDiv.remove();
    eliminarTarea(title);
  });

  contenedor.appendChild(nuevoDiv);
}


// ------------------
// Eventos
// ------------------

// Cargar tareas al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas.forEach(({ title, description }) => createCard(title, description));
});

// Guardar tarea
formData.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title-area').value.trim();
  const description = document.getElementById('description-area').value.trim();

  if (!title || !description) {
    alert('Por favor completa ambos campos.');
    return;
  }
  if (title.length <= 3) {
    alert('El título debe tener más de 3 caracteres.');
    return;
  }

  createCard(title, description);

  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas.push({ title, description });
  localStorage.setItem('tareas', JSON.stringify(tareas));

  formData.reset();
});
