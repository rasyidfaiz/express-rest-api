const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT;

app.use(express.json()); // Express body parser

app.get("/api", (req, res) => {
  res.send("My First API");
});

app.get("/products", async (req, res) => {
  const getProducts = await prisma.product.findMany();
  res.send(getProducts);
});

app.post("/products", async (req, res) => {
  const product = req.body;
  const addProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    },
  });
  res.send({
    data: addProduct,
    message: "Product added successfully!",
  });
});

app.patch("/products/:id", async (req, res) => {
  const product = req.body;
  const productId = req.params.id;
  const updateProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    },
  });
  res.send({
    data: updateProduct,
    message: "Product updated successfully!",
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const deleteProduct = await prisma.product.delete({
    where: {
      id: productId,
    },
  });
  res.send({
    data: deleteProduct,
    message: "Product deleted successfully!",
  });
});

app.listen(port, () => {
  console.log(`Server Up and Running in Port ${port}!`);
});
