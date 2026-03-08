console.log("Hello, World! This is a simple JavaScript file.");
const loadNavbar = () => {
  const navbarHTML = `
    <nav class="navbar bg-green-400 shadow-sm">
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

loadNavbar();
