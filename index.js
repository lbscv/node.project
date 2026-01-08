import express from 'express';
import mongoose from 'mongoose';
import categoryRoutes from "./routes/categories.js";
import productRoutes from "./routes/product.js";


mongoose
  .connect("mongodb://127.0.0.1:27017/naamVanDb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

const app = express();

app.use(express.json());

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.type("html").send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>API Documentatie</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        <div class="container mx-auto px-4 py-8 max-w-5xl">
          <!-- Header -->
          <div class="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-slate-200">
            <h1 class="text-4xl font-bold text-slate-800 mb-3">Node Project Lars Biczysko API</h1>
            <p class="text-slate-600 text-lg">Gebaseerd op een supermarkt waarbij de api de category van de producten kan opslaan met alle producten in deze categorieën.</p>
          </div>

          <!-- Categories Section -->
          <div class="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-slate-200">
            <h2 class="text-3xl font-bold text-slate-800 mb-4 flex items-center">
              <span class="bg-blue-500 text-white rounded-lg px-3 py-1 text-lg mr-3"></span>
              Categories
            </h2>
            
            <!-- Filter Buttons for Categories -->
            <div class="flex gap-2 mb-4 flex-wrap">
              <button onclick="filterCategories('ALL')" class="category-filter px-4 py-2 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow-md">Alle</button>
              <button onclick="filterCategories('GET')" class="category-filter px-4 py-2 rounded-lg font-semibold text-sm transition bg-slate-200 text-slate-700 hover:bg-slate-300">GET</button>
              <button onclick="filterCategories('POST')" class="category-filter px-4 py-2 rounded-lg font-semibold text-sm transition bg-slate-200 text-slate-700 hover:bg-slate-300">POST</button>
              <button onclick="filterCategories('PUT')" class="category-filter px-4 py-2 rounded-lg font-semibold text-sm transition bg-slate-200 text-slate-700 hover:bg-slate-300">PUT</button>
              <button onclick="filterCategories('DELETE')" class="category-filter px-4 py-2 rounded-lg font-semibold text-sm transition bg-slate-200 text-slate-700 hover:bg-slate-300">DELETE</button>
            </div>
            
            <ul class="space-y-3" id="categories-list">
              <li class="category-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="GET">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">GET</span>
                <code class="text-slate-700">/api/categories</code>
              </li>
              <li class="category-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="GET">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">GET</span>
                <code class="text-slate-700">/api/categories/:id</code>
              </li>
              <li class="category-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="POST">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">POST</span>
                <code class="text-slate-700">/api/categories</code>
              </li>
              <li class="category-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="PUT">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">PUT</span>
                <code class="text-slate-700">/api/categories/:id</code>
              </li>
              <li class="category-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="DELETE">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">DELETE</span>
                <code class="text-slate-700">/api/categories/:id</code>
              </li>
            </ul>
          </div>

         
          <div class="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-slate-200">
            <h2 class="text-3xl font-bold text-slate-800 mb-4 flex items-center">
              <span class="bg-purple-500 text-white rounded-lg px-3 py-1 text-lg mr-3"></span>
              Products
            </h2>
            
            <!-- Filter Buttons for Products -->
            <div class="flex gap-2 mb-4 flex-wrap">
              <button onclick="filterProducts('ALL')" class="product-filter px-4 py-2 rounded-lg font-semibold text-sm transition bg-blue-600 text-white shadow-md">Alle</button>
              <button onclick="filterProducts('GET')" class="product-filter px-4 py-2 rounded-lg font-semibold text-sm transition bg-slate-200 text-slate-700 hover:bg-slate-300">GET</button>
              <button onclick="filterProducts('POST')" class="product-filter px-4 py-2 rounded-lg font-semibold text-sm transition bg-slate-200 text-slate-700 hover:bg-slate-300">POST</button>
              <button onclick="filterProducts('PUT')" class="product-filter px-4 py-2 rounded-lg font-semibold text-sm transition bg-slate-200 text-slate-700 hover:bg-slate-300">PUT</button>
              <button onclick="filterProducts('DELETE')" class="product-filter px-4 py-2 rounded-lg font-semibold text-sm transition bg-slate-200 text-slate-700 hover:bg-slate-300">DELETE</button>
            </div>
            
            <ul class="space-y-3" id="products-list">
              <li class="product-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="GET">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">GET</span>
                <code class="text-slate-700">/api/products?limit=20&offset=0</code>
              </li>
              <li class="product-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="GET">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">GET</span>
                <code class="text-slate-700">/api/products/search?q=cola</code>
              </li>
              <li class="product-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="GET">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">GET</span>
                <code class="text-slate-700">/api/products/:id</code>
              </li>
              <li class="product-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="POST">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">POST</span>
                <code class="text-slate-700">/api/products</code>
              </li>
              <li class="product-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="PUT">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">PUT</span>
                <code class="text-slate-700">/api/products/:id</code>
              </li>
              <li class="product-item flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200" data-method="DELETE">
                <span class="bg-blue-500 text-white px-3 py-1 rounded-md font-semibold text-sm mr-3">DELETE</span>
                <code class="text-slate-700">/api/products/:id</code>
              </li>
            </ul>
          </div>

          <!-- Examples Section -->
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
              <span class="bg-teal-500 text-white rounded-lg px-3 py-1 text-lg mr-3"></span>
              Voorbeeld requests
            </h3>
            <div class="bg-slate-900 rounded-lg p-5 overflow-x-auto">
              <pre class="text-green-400 text-sm font-mono leading-relaxed"><span class="text-blue-400">POST</span> /api/categories
{ <span class="text-yellow-300">"name"</span>: <span class="text-green-300">"Drinks"</span> }

<span class="text-blue-400">POST</span> /api/products
{ 
  <span class="text-yellow-300">"name"</span>: <span class="text-green-300">"Cola"</span>, 
  <span class="text-yellow-300">"price"</span>: <span class="text-purple-300">1.5</span>, 
  <span class="text-yellow-300">"categoryId"</span>: <span class="text-green-300">"..."</span> 
}</pre>
            </div>
          </div>
        </div>
        
        <script>
          function filterCategories(method) {
            const items = document.querySelectorAll('.category-item');
            const buttons = document.querySelectorAll('.category-filter');
            
            // Update button styles
            buttons.forEach(btn => {
              btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
              btn.classList.add('bg-slate-200', 'text-slate-700');
            });
            event.target.classList.remove('bg-slate-200', 'text-slate-700');
            event.target.classList.add('bg-blue-600', 'text-white', 'shadow-md');
            
            // Filter items
            items.forEach(item => {
              if (method === 'ALL' || item.dataset.method === method) {
                item.style.display = 'flex';
              } else {
                item.style.display = 'none';
              }
            });
          }
          
          function filterProducts(method) {
            const items = document.querySelectorAll('.product-item');
            const buttons = document.querySelectorAll('.product-filter');
            
            // Update button styles
            buttons.forEach(btn => {
              btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
              btn.classList.add('bg-slate-200', 'text-slate-700');
            });
            event.target.classList.remove('bg-slate-200', 'text-slate-700');
            event.target.classList.add('bg-blue-600', 'text-white', 'shadow-md');
            
            // Filter items
            items.forEach(item => {
              if (method === 'ALL' || item.dataset.method === method) {
                item.style.display = 'flex';
              } else {
                item.style.display = 'none';
              }
            });
          }
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server runt op http://localhost:3000');
});
