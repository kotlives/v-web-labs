import './style.css'

// Данные товаров
const products = [
  {
    id: 1,
    title: "Худи с принтом",
    price: 999,
    oldPrice: 1180
  },
  {
    id: 2,
    title: "Худи без принта",
    price: 899,
    oldPrice: 1100
  },
  {
    id: 3,
    title: "Худи спортивный",
    price: 1199,
    oldPrice: 1400
  },
  {
    id: 4,
    title: "Худи оверсайз",
    price: 1299,
    oldPrice: 1500
  },
  {
    id: 5,
    title: "Худи детский",
    price: 799,
    oldPrice: 950
  },
  {
    id: 6,
    title: "Худи женский",
    price: 1099,
    oldPrice: 1300
  },
  {
    id: 7,
    title: "Худи классический",
    price: 1499
  },
  {
    id: 8,
    title: "Худи утепленный",
    price: 1799
  },
  {
    id: 9,
    title: "Худи летний",
    price: 699
  },
  {
    id: 10,
    title: "Худи премиум",
    price: 2499
  }
];

// Состояние приложения
const state = {
  products: [...products],
  searchQuery: '',
  activeNav: 'home'
};

// Функция для отображения цены (с учетом скидки или без)
function renderPrice(product) {
  if (product.oldPrice) {
    return `
      <div class="product-price">
        <span class="current-price">${product.price} ₽</span>
        <span class="old-price">${product.oldPrice} ₽</span>
      </div>
    `;
  } else {
    return `
      <div class="product-price">
        <span class="current-price">${product.price} ₽</span>
      </div>
    `;
  }
}

// Функция для отображения товаров
function renderProducts(container) {
  const filteredProducts = state.products.filter(product => 
    product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
  );
  
  if (filteredProducts.length === 0) {
    container.innerHTML = '<div class="no-results">Товары не найдены</div>';
    return;
  }
  
  const productsHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-image">Изображение товара</div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        ${renderPrice(product)}
        <button class="add-to-cart">
          В корзину
        </button>
      </div>
    </article>
  `).join('');
  
  container.innerHTML = productsHTML;
}

// Функция для обработки поиска
function handleSearch(event, container) {
  state.searchQuery = event.target.value;
  renderProducts(container);
}

// Функция для обработки навигации
function handleNavClick(navItem) {
  state.activeNav = navItem;
  
  // Обновляем активные состояния
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.dataset.nav === navItem) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Инициализация приложения
function init() {
  const app = document.querySelector('#app');
  
  app.innerHTML = `
    <!-- Верхняя навигация -->
    <header>
      <nav class="nav-container">
        <div class="logo">Магазин</div>
        <div class="search-container">
          <input type="text" class="search-input" placeholder="Поиск товаров...">
          <button class="search-button">Найти</button>
        </div>
      </nav>
    </header>

    <!-- Основной контент -->
    <main>
      <section class="products-grid">
        <!-- Товары будут добавлены через JavaScript -->
      </section>
    </main>

    <!-- Нижняя навигация для телефона -->
    <nav class="bottom-nav">
      <ul class="nav-items">
        <li class="nav-item active" data-nav="home">
          <div class="nav-icon">🏠</div>
          <div class="nav-text">Главная</div>
        </li>
        <li class="nav-item" data-nav="favorites">
          <div class="nav-icon">❤️</div>
          <div class="nav-text">Избранное</div>
        </li>
        <li class="nav-item" data-nav="cart">
          <div class="nav-icon">🛒</div>
          <div class="nav-text">Корзина</div>
        </li>
      </ul>
    </nav>
  `;
  
  const productsContainer = document.querySelector('.products-grid');
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  
  // Первоначальная отрисовка товаров
  renderProducts(productsContainer);
  
  // Обработчики событий для поиска
  searchInput.addEventListener('input', (e) => handleSearch(e, productsContainer));
  searchButton.addEventListener('click', () => {
    state.searchQuery = searchInput.value;
    renderProducts(productsContainer);
  });
  
  // Обработчики для навигации
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => handleNavClick(item.dataset.nav));
  });
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', init);