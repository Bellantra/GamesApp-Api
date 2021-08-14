const { Router } = require("express");
require("dotenv").config();
const { API_GENRES, API_KEY } = process.env;
const { Genre } = require("../db");
const axios = require("axios");
const { Sequelize, Op } = require("sequelize");

const router = Router();

// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de
//datos y luego ya utilizarlos desde allí
router.get("/", async (req, res, next) => {
  // res.send('Soy la ruta a generos');
  try {
    const dbGenres = await Genre.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.send(dbGenres);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
