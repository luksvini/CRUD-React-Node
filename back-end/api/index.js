import express from 'express';
import cors from 'cors'
import clientRoutes from "./routes/clientRoute.js"

const app = express();

const PORT = 3001;

app.use(cors())
app.use(express.json());


app.use('/api', clientRoutes)

app.get("/", (request, response) => {
    response.send("<h1>Hello world</h1>")
})

app.listen(PORT, () => {
    console.log(`Escutando na porta ${PORT}`)
})

