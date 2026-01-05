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
        <title>API Documentatie</title>
      </head>
      <body>
        <h1>Node Project Lars Biczysko API</h1>
        <p>Gebaseerd op een supermarkt</p>

        <h2>Categories</h2>
        <ul>
          <li>GET /api/categories</li>
          <li>GET /api/categories/:id</li>
          <li>POST /api/categories</li>
          <li>PUT /api/categories/:id</li>
          <li>DELETE /api/categories/:id</li>
        </ul>

        <h2>Products</h2>
        <ul>
          <li>GET /api/products?limit=20&offset=0</li>
          <li>GET /api/products/search?q=cola</li>
          <li>GET /api/products/:id</li>
          <li>POST /api/products</li>
          <li>PUT /api/products/:id</li>
          <li>DELETE /api/products/:id</li>
        </ul>

        <h3>Voorbeeld requests</h3>
        <pre>
POST /api/categories
{ "name": "Drinks" }

POST /api/products
{ "name": "Cola", "price": 1.5, "categoryId": "..." }
        </pre>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server runt op http://localhost:3000');
});
