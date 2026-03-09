console.log("Hello, World! This is a simple JavaScript file.");
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
        link.classList.add("btn", "btn-sm", "btn-active", "btn-success");
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

// load trending products based on the rating and with the help of the API
const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      const trendingProducts = data
        .filter((product) => product.rating.rate >= 4.0)
        .slice(0, 3);
      const container = document.getElementById("trending-product");
      const allProducts = document.getElementById("all-products");
      const categories = [...new Set(data.map((product) => product.category))];
      if (container) {
        let productsHTML = `
              <h2 class="text-3xl font-bold text-center mb-10">Trending Products</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                ${trendingProducts
                  .map(
                    (product) => `
                  <div class="card bg-base-100 shadow-xl">
                    <figure>
                      <img class="h-48 object-contain" src="${product.image}" alt="${product.title}" />
                    </figure>
                    <div class="card-body bg-red-50">
                      <div class="flex justify-between mb-2">
                      <div class="btn btn-xs btn-secondary rounded-full font-semibold uppercase">${product.category}</div>
                      <div class="rounded-full font-semibold uppercase"><i class="fa-solid fa-star text-amber-400"></i>${product.rating.rate}(${product.rating.count})</div>
                      </div>
                      <h2 class="card-title">${product.title}</h2>
                      <p>${product.description.slice(0, 100)}...</p>
                      <p class="text-xl font-bold">$${product.price.toFixed(2)}</p>
                      <div class="card-actions flex justify-between ">
                        <button class="flex-1 btn btn-outline btn-sm">Details <i class="fa-solid fa-info-circle"></i></button>
                        <button class="flex-1 btn btn-primary btn-sm">Cart <i class="fa-solid fa-shopping-cart"></i></button>
                      </div>
                    </div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `;
        container.innerHTML = productsHTML;
      } else if (allProducts) {
        let productsHTML = `
              <h2 class="text-3xl font-bold text-center mb-10">Our Products</h2>
             <div class="flex flex-wrap gap-4 justify-center mb-10">
              ${categories
                .map(
                  (category) => `
                    <h3 class="text-md font-semibold btn btn-outline btn-secondary btn-xs rounded-full uppercase">${category}</h3>
                  `,
                )
                .join("")}
             </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                ${data
                  .map(
                    (product) => `
                  <div class="card bg-base-100 shadow-xl">
                    <figure>
                      <img class="h-48 object-contain" src="${product.image}" alt="${product.title}" />
                    </figure>
                    <div class="card-body bg-red-50">
                      <div class="flex justify-between mb-2">
                      <div class="btn btn-xs btn-secondary rounded-full font-semibold uppercase">${product.category}</div>
                      <div class="rounded-full font-semibold uppercase"><i class="fa-solid fa-star text-amber-400"></i>${product.rating.rate}(${product.rating.count})</div>
                      </div>
                      <h2 class="card-title">${product.title}</h2>
                      <p>${product.description.slice(0, 100)}...</p>
                      <p class="text-xl font-bold">$${product.price.toFixed(2)}</p>
                      <div class="card-actions flex justify-between ">
                        <button class="flex-1 btn btn-outline btn-sm">Details <i class="fa-solid fa-info-circle"></i></button>
                        <button class="flex-1 btn btn-primary btn-sm">Cart <i class="fa-solid fa-shopping-cart"></i></button>
                      </div>
                    </div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `;
        allProducts.innerHTML = productsHTML;
      }
    });
};
loadNavbar();
loadProducts();
loadFooter();
