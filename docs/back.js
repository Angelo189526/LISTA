const contenedor = document.getElementById('contenedor');
const formData = document.getElementById('formulario-datos');

formData.addEventListener('submit', function(event) {
  event.preventDefault(); 


  const title = document.getElementById('title-area').value.trim();
  const description = document.getElementById('description-area').value.trim();


  const nuevoDiv = document.createElement('div');
  nuevoDiv.className = 'flex items-start lg:items-center bg-white rounded-lg p-3 shadow-sm';
  nuevoDiv.innerHTML = `
    <span class="text-red-400 text-xl mr-3 lg:text-3xl">🕒</span>
    <div>
      <h1 class="font-mono font-bold text-base lg:text-xl text-gray-800">${title}</h1>
      <p class="text-gray-600 mt-1 text-sm font-mono">${description}</p>
    </div>
  `;

  contenedor.appendChild(nuevoDiv);

  formData.reset();
});
