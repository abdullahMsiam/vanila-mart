console.log("Hello, World! This is a simple JavaScript file.");
let allProducts = [];

const loadNavbar = () => {
  const navbarHTML = `
    <nav class="navbar bg-red-50 shadow-sm">
      <div class="navbar md:w-4/5 md:mx-auto">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabindex="-1"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li class="font-bold"><a href="index.html">Home</a></li>
              <li class="font-bold"><a href="products.html">products</a></li>
              <li class="font-bold"><a href="about.html">About</a></li>
              <li class="font-bold"><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <a class="btn btn-ghost text-xl font-bold">Vanila Mart</a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            <li class="font-bold"><a href="index.html">Home</a></li>
            <li class="font-bold"><a href="products.html">products</a></li>
            <li class="font-bold"><a href="about.html">About</a></li>
            <li class="font-bold"><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="navbar-end md:text-end">
          <button class="btn btn-outline text-black">
            <i class="fa-solid fa-cart-arrow-down"></i>
          </button>
        </div>
      </div>
    </nav>
    `;

  const container = document.getElementById("navbar-container");
  if (container) {
    container.innerHTML = navbarHTML;
    const currentPath =
      window.location.pathname.split("/").pop() || "index.html";
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("btn", "btn-sm", "btn-active", "btn-primary");
      }
    });
  }
};

const loadFooter = () => {
  const footerHTML = `
    <footer class="footer sm:footer-horizontal bg-red-50 text-base-content p-10">
  <nav>
    <h6 class="footer-title">Services</h6>
    <a class="link link-hover">Branding</a>
    <a class="link link-hover">Cloths</a>
    <a class="link link-hover">Devices</a>
    <a class="link link-hover">Accessories</a>
  </nav>
  <nav>
    <h6 class="footer-title">Company</h6>
    <a class="link link-hover">About us</a>
    <a class="link link-hover">Contact</a>
    <a class="link link-hover">Products</a>
  </nav>
  <nav>
    <h6 class="footer-title">Legal</h6>
    <a class="link link-hover">Terms of use</a>
    <a class="link link-hover">Privacy policy</a>
    <a class="link link-hover">Cookie policy</a>
  </nav>
  <form>
    <h6 class="footer-title">Newsletter</h6>
    <fieldset class="w-80">
      <label>Enter your email address</label>
      <div class="join">
        <input
          type="text"
          placeholder="username@site.com"
          class="input input-bordered join-item" />
        <button class="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
  `;

  const container = document.getElementById("footer-container");
  if (container) {
    container.innerHTML = footerHTML;
  }
};

const fetchProducts = async () => {
  const apiUrl = "https://fakestoreapi.com/products";
  const response = await fetch(apiUrl);
  const data = await response.json();
  allProducts = data;
  loadProducts(data);
  loadProductsPage(data);
  loadCategoryProducts(data);
};

// product card html
const productHtml = (product) => `
  <div class="card bg-base-100 shadow-xl">
    <figure>
      <img src="${product.image}" alt="${product.title}" class="h-36 object-contain" />
    </figure>
    <div class="card-body">
    <div class="flex items-center justify-between mb-2">
    <p class="font-bold btn btn-xs btn-info rounded-full btn-active uppercase w-11">${product.category}</p>
    <p class="font-bold btn btn-xs bg-none uppercase w-11"><i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate}</p>
    </div>
      <h2 class="card-title">${product.title}</h2>
      <p class="hidden md:block">${product.description.slice(0, 100)}...</p>
      <p class="font-bold text-xl">$${product.price.toFixed(2)}</p>
      <div class="card-actions flex justify-between mt-4">
      <button class="btn btn-sm btn-outline" onclick="openModal(${JSON.stringify(product).replace(/"/g, "&quot;")})"><i class="fa-solid fa-eye"></i> View Details</button>
        <button class="btn btn-sm btn-primary"> <i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
      </div>
    </div>
  </div>
`;

// modal open function
window.openModal = (product) => {
  //   alert("this is a modal");
  const modalHolder = document.getElementById("trending-product");
  const modalContainer = document.createElement("div");

  modalContainer.classList.add(
    "fixed",
    "inset-0",
    "bg-black",
    "bg-opacity-50",
    "flex",
    "items-center",
    "justify-center",
  );
  modalContainer.innerHTML = `
    <div class="bg-red-50 p-5 rounded-lg w-11/12 md:w-1/4 flex flex-col">
      <h2 class="text-2xl font-bold mb-4"><i class="fa-solid fa-box-open"></i>Details</h2>
      <p>${product.description}</p>
      <button class="btn btn-sm btn-outline btn-error mt-4 text-end" onclick="closeModal()"> <i class="fa-solid fa-xmark"></i> Close</button>
    </div>
  `;
  modalHolder.appendChild(modalContainer);
};

window.closeModal = () => {
  const modalHolder = document.getElementById(
    "trending-product" || "products-container",
  );
  const modalContainer = modalHolder.querySelector("div.fixed");
  if (modalContainer) {
    modalHolder.removeChild(modalContainer);
  }
};

// load products based on the rating and with the help of the API
const loadProducts = (products) => {
  const trendingContainer = document.getElementById(
    "trending-product" || "products-container",
  );

  if (trendingContainer) {
    const sortedProducts = products.sort(
      (a, b) => b.rating.rate - a.rating.rate,
    );
    const topProducts = sortedProducts.slice(0, 3);
    const productHTML = topProducts
      .map((product) => productHtml(product))
      .join("");
    trendingContainer.innerHTML = `
            <h2 class="text-3xl font-bold text-center mb-10">Trending Products</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                ${productHTML}
            </div>
        `;
  }
};

window.categoryProducts = (category = "All") => {
  console.log(category);

  if (category === "All") {
    loadProductsPage(allProducts);
  } else {
    const filteredProducts = allProducts.filter(
      (product) => product.category === category,
    );
    loadProductsPage(filteredProducts, category);
  }
};

// load category
const loadCategoryProducts = (products) => {
  const categoriessContainer = document.getElementById("categories-container");
  categoriessContainer.innerHTML = "";

  const categories = [...new Set(products.map((product) => product.category))];
  categories.push("All");

  categoriessContainer.innerHTML = categories
    .map(
      (category) =>
        `<button class="btn btn-sm btn-info btn-outline" onclick="categoryProducts(\`${category}\`)">${category}</button>`,
    )
    .join("");
};

const loadProductsPage = (products, category = "All") => {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";

  const productHTML = products.map((product) => productHtml(product)).join("");

  productsContainer.innerHTML = `
            <h2 class="text-3xl font-bold text-center mb-10 uppercase">${category === "All" ? "All" : category} Products</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                ${productHTML}
            </div>
        `;
};

loadNavbar();
loadFooter();
fetchProducts();
