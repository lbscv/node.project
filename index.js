import express from 'express';
import mongoose from 'mongoose';
import categoryRoutes from "./routes/categories.js";


mongoose
  .connect("mongodb://127.0.0.1:27017/naamVanDb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

const app = express();

app.use(express.json());

app.use("/api/categories", categoryRoutes);


app.get('/', (req, res) => {
  res.send('API is running'); //dit is een test
});

app.listen(3000, () => {
  console.log('Server runt op http://localhost:3000');
});
