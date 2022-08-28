const express = require("express");
const router = express.Router();
const Equipo = require("../models/equipo");

//Verbos para equipos
//Post de un equipo
router.post("/equipo/post", async (req, res) => {
  const data = new Equipo({
    clase: req.body.clase,
    descripcion: req.body.descripcion,
    stock: req.body.stock,
    unidadMedida: req.body.unidadMedida,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get All
router.get("/equipo/getAll", async (req, res) => {
  try {
    const data = await Equipo.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get por id
router.get("/equipo/getOne/:id", async (req, res) => {
  try {
    const data = await Equipo.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update por id
router.patch("/equipo/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Equipo.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete por id
router.delete("/equipo/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Equipo.findByIdAndDelete(id);
    res.send(
      `Equipo con descripcion ${data.descripcion} y id ${id} fue eliminado correctamente`
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
