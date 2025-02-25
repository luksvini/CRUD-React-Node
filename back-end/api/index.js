import express, { request, response } from 'express';
import cors from 'cors'
import clientRoutes from "./routes/clientRoute.js"
import path from 'path';

const __dirname = path.resolve()

const app = express();

const PORT = 3001;

app.use(cors())
app.use(express.json());


app.use('/api', clientRoutes)

app.get("/api/", async (request, response) => {
    response.send("<h1>Hello world</h1>")
})


app.use(express.static(path.join(__dirname, '../front-end/dist')))

app.get("*", async (request, response) => {
    response.sendFile(path.join(__dirname, '../front-end/dist/index.html'))
})

app.listen(PORT, () => {
    console.log(`Escutando na porta ${PORT}`)
})

