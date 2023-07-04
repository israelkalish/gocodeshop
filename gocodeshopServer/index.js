import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
console.log('hi')

dotenv.config();
const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env

const app = express()
app.use(express.json());
app.use(cors())

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image:{
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    rating:{
        rate: {
            type: Number,
        },
        count: {
            type: Number,
        },
    }
});

const Product = mongoose.model("Product", productSchema);



app.get("/", async (req, res) => {
    const products = await Product.find({});
    res.status(200).send(products);
});


app.get("/product/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    res.status(200).send(product);
});

app.post("/products", async (req, res) => {
    console.log(req.body)
    try{
      const products = [...req.body]
      const newProducts = await Product.insertMany(products)
      res.send(newProducts)

    }catch(e){
      console.log(e)
      res.status(500).send({message:e})
  }
});

app.post("/", async (req, res) => {
    try{
      const obj = { ...req.body };
      console.log(obj);
      if (Object.keys(obj).length === 0) {
        res.send("failed");
        return  
      }
      const product = new Product(obj)
      await product.save()
      res.send(product)
  
    }catch(e){
      console.log(e)
      res.status(500).send({message:e})
  }
});

app.put("/product/:id", async (req, res) => {
    const userAllowedUpdates = ["price", "image", "rating", "description", "rate", "count"]
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
    userAllowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
        res.status(400).send({message: "Invalid updates"})
    }
    
    try {
        const id = req.params.id
        const product = await Product.findOne({_id:id})
      if (!product) {
        res.status(404).send({message: "product does not exist"})
      }
      updates.forEach((update) => (product[update] = req.body[update]));
      await product.save();
      res.status(200).send(product)
    } catch (e) {
        console.log(e)
        res.status(500).send({message:e})
    }
});

app.delete("/product/:id/", async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({_id:id})
  
    if (!deletedProduct) {
      res.status(404).send({message: "product does not exist"})
    }
  
    res.status(200).send(deletedProduct)
});

  app.get('/Hello', (req, res) => {
    res.send('Hello Worldddddd!')
});

async function main() {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`);
  }

main().catch((err) => console.log(err));

app.listen(8002, () => {
    console.log('Example app listening on port 8002!')
});
