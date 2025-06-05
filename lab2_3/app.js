const loading = document.getElementById('loading');
const container = document.getElementById('data-container');

function loadData(api) {
  container.innerHTML = '';
  loading.style.display = 'block';

  if (api === 'nasa') {
    fetchSimpleNASA();
  } else if (api === 'spacex') {
    fetchSimpleSpaceX();
  } else if (api === 'randomuser') {
    fetchRandomUser();
  }
}

async function fetchSimpleNASA() {
  try {
    const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    const data = await res.json();

    container.innerHTML = `
      <h2>NASA Фото дня 🌌</h2>
      <p><strong>Назва:</strong> ${data.title}</p>
      <p><strong>Дата:</strong> ${data.date}</p>
      <img src="${data.url}" alt="${data.title}" style="max-width:100%; margin-top:10px;" />
    `;
  } catch {
    container.textContent = 'Не вдалося завантажити дані NASA.';
  } finally {
    loading.style.display = 'none';
  }
}

async function fetchSimpleSpaceX() {
  try {
    const res = await fetch('https://api.spacexdata.com/v4/launches/latest');
    const data = await res.json();
    const launchDate = new Date(data.date_utc).toLocaleString();

    container.innerHTML = `
      <h2>Останній запуск SpaceX 🚀</h2>
      <p><strong>Місія:</strong> ${data.name}</p>
      <p><strong>Дата запуску:</strong> ${launchDate}</p>
      ${data.links.patch.small ? `<img src="${data.links.patch.small}" alt="patch" style="max-height:100px;" />` : ''}
    `;
  } catch {
    container.textContent = 'Не вдалося завантажити дані SpaceX.';
  } finally {
    loading.style.display = 'none';
  }
}

async function fetchRandomUser() {
  try {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];

    container.innerHTML = `
      <h2>Випадкова людина 👤</h2>
      <img src="${user.picture.large}" alt="person" style="border-radius: 10px;" />
      <p>${user.name.first} ${user.name.last}</p>
      <p>Країна: ${user.location.country}</p>
    `;
  } catch {
    container.textContent = 'Не вдалося завантажити користувача.';
  } finally {
    loading.style.display = 'none';
  }
}
