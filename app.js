const express = require('express');
const app = express();
const PORT = 3000;

const { insertar, consultar, editar} = require("./consultas");

app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto ${PORT}`)
});

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post("/post", async (req, res) => {
    try {
        const datos = Object.values(req.body);
        const respuesta = await insertar(datos);
        res.json(respuesta);
    }
    catch {
        res.status(500).send("Algo salió mal")
    }
});

app.get("/posts", async (req, res) => {
    try {
        const respuesta = await consultar();
        res.json(respuesta);
    }
    catch {
        res.status(500).send("Algo salió mal")
    }
})
app.put("/post", async (req, res) => {
    try {
        const { id } = req.query;
        const respuesta = await editar(id);
        res.json(respuesta);
    }
    catch {
        res.status(500).send("Algo salió mal")
    }
});
