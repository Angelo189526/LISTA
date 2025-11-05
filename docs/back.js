// ----------------------
// Seleccionar elementos del DOM
// ----------------------
const contenedor = document.getElementById('contenedor');
const fechaActual = document.getElementById('fecha-actual');
const formData = document.getElementById('formulario-datos');
const formularioReminder = document.getElementById('formulario-reminder');
const addReminderBtn = document.getElementById('add-reminder-btn');
const popupReminder = document.getElementById('popup-reminder');
const cancelReminder = document.getElementById('cancelReminder');
const contenedorReminder = document.getElementById('contenedorReminder');

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
// ---------------------
function eliminarTarea(title) {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  const tareasActualizadas = tareas.filter(tarea => tarea.title !== title);
  localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
}

function eliminarReminder(title) {
  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  const actualizados = reminders.filter(r => r.title !== title);
  localStorage.setItem('reminders', JSON.stringify(actualizados));
}

// ----------------------
// Funciones de UI
// ----------------------
function pickColor() {
  const colores = [
    "bg-red-200", "bg-orange-200", "bg-teal-200",
    "bg-blue-100", "bg-green-100", "bg-purple-300", "bg-violet-300"
  ];
  const seleccionDeColor = Math.floor(Math.random() * colores.length);
  return colores[seleccionDeColor];
}

function createCard(title, description) {
  const nuevoDiv = document.createElement('div');
  nuevoDiv.className = 'flex items-start lg:items-center bg-white rounded-lg p-3 shadow-sm';

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

function createReminder(title, dateInput, hourInput, colorParam) {
  const color = colorParam || pickColor();

  const reminderCard = document.createElement('div');
  reminderCard.className =
    `flex items-center justify-between ${color} w-auto mt-4 rounded-2xl p-4 hover:scale-[1.02] transition-transform duration-200 cursor-pointer`;

  reminderCard.innerHTML = `
    <div class="flex items-center space-x-4">
      <div class="text-black font-bold text-lg md:text-xl text-center leading-tight">
        <p class="text-xs md:text-sm">MON</p>
        <div class="text-blue-500 text-lg font-bold">•</div>
      </div>
      <div>
        <p class="text-gray-800 font-semibold text-sm md:text-base">${title}</p>
        <p class="text-gray-800 text-xs md:text-sm">${hourInput}</p>
        <p class="text-gray-800 text-xs md:text-sm">${dateInput}</p>
      </div>
    </div>
    <div class="ml-auto flex lg:items-center">
      <button class="delete-btn-reminder mr-3">❌</button>
    </div>
  `;

  reminderCard.querySelector('.delete-btn-reminder').addEventListener('click', () => {
    reminderCard.remove();
    eliminarReminder(title);
  });

  contenedorReminder.appendChild(reminderCard);
}

// ----------------------
// Funciones popup
// ----------------------
function togglePopup(show) {
  if (show) popupReminder.classList.remove('hidden');
  else popupReminder.classList.add('hidden');
}

addReminderBtn.addEventListener('click', () => togglePopup(true));
cancelReminder.addEventListener('click', () => togglePopup(false));

// ----------------------
// Guardar nuevo reminder
// ----------------------
formularioReminder.addEventListener('submit', (event) => {
  event.preventDefault();

  const titleInput = document.getElementById('reminder-title').value.trim();
  const dateInput = document.getElementById('reminder-date').value;
  const hourInput = document.getElementById('reminder-time').value;

  if (!titleInput || !dateInput || !hourInput) {
    alert('Completa todos los campos.');
    return;
  }

  const color = pickColor();
  createReminder(titleInput, dateInput, hourInput, color);

  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  reminders.push({ title: titleInput, date: dateInput, hour: hourInput, color });
  localStorage.setItem('reminders', JSON.stringify(reminders));

  formularioReminder.reset();
  popupReminder.classList.add('hidden');
});

// ----------------------
// Cargar al iniciar
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas.forEach(({ title, description }) => createCard(title, description));

  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  reminders.forEach(({ title, date, hour, color }) =>
    createReminder(title, date, hour, color)
  );
});
