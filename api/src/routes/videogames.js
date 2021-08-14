const { Router, response } = require("express");
require("dotenv").config();
const { API_GAMES, API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { Sequelize, Op } = require("sequelize");
// const Genre = require('../models/Genre');

const router = Router();

// [ ] GET /videogames: ------------> NO ESTA PAGINADO DE A 15 DESDE EL BACK AUN!!!!
// Obtener un listado de los primeras 15 videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
//------------------------------------------------------------------------------------
//TRAYENDO BASE DATOS, API(LOS 100) Y UNIENDO TODO CON UUID FUNCIONANDO
router.get("/", async (req, res, next) => {
  const name = req.query.name;
  //   console.log(name);

  //Si no viene algo por query, traigo todo de la DB y API
  if (!name) {
    try {
      //Traigo todo lo de la database, y lo mapeo para acomodar los datos que llegan con las props del modelo que voy
      //a necesitar luego para mostrar en front
      const dbAllGames = await Videogame.findAll({ include: [Genre] });
      const dataGames = dbAllGames.map((e) => {
        return {
          id: e.id,
          name: e.name,
          image: e.image,
          description: e.description,
          released: e.released,
          rating: e.rating,
          platforms: e.platforms,
          genres: e.genres.map((g) => g.name).join(", "),
        };
      });
      //Traigo todo lo de la API, y lo mapeo para acomodar los datos que llegan con las props del modelo que voy
      //a necesitar luego para mostrar en front

      let apiAllPages = [];
      let next, games, apiGames;

      for (let i = 1; i <= 5; i++) {
        if (i === 1) {
          games = await axios.get(`${API_GAMES}?key=${API_KEY}`);
          next = games.data.next;
          // console.log(next)
        } else {
          games = await axios.get(`${next}`);
          next = games.data.next;
        }

        apiGames = games.data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            rating: game.rating,
            released: game.released,
            platforms: game.platforms
              ? game.platforms.map((p) => p.platform.name).join(", ")
              : "No info",
            genres: game.genres
              ? game.genres.map((g) => g.name).join(", ")
              : "No info",
          };
        });
        apiAllPages = apiAllPages.concat(apiGames);
      }
      //uno en un arreglo cuando envio la res con la info de ambos arrays unida!!
      res.send([...dataGames, ...apiAllPages]);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      let datbase = await Videogame.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
      });

      let apiAllPages = [];
      let next, games, apiGames;

      for (let i = 1; i <= 5; i++) {
        if (i === 1) {
          games = await axios.get(`${API_GAMES}?key=${API_KEY}&search=${name}`);
          next = games.data.next;
          // console.log(next)
        } else {
          games = await axios.get(`${next}`);
          next = games.data.next;
        }
        let apiGames = games.data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            rating: game.rating,
            released: game.released,
            platforms: game.platforms
              ? game.platforms.map((p) => p.platform.name).join(", ")
              : "No info",
            genres: game.genres
              ? game.genres.map((g) => g.name).join(", ")
              : "No info",
          };
        });

        apiAllPages = apiAllPages.concat(apiGames);
      }

      res.send([...datbase, ...apiAllPages]);
    } catch (error) {
      next(error);
    }
  }
});

// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    //   console.log(id)
    const bd = await Videogame.findOne({
      where: { id: id },
      atributes: ["name", "description", "rating", "released", "platforms"],
      include: {
        model: Genre,
        atributes: {
          exclude: ["createdAt", "updatedAt", "videogame_genre", "id"], //REVISAR CAMPO DE GENRES!!!!
        },
        through: { attributes: [] },
      },
    });
    if (!bd) {
      const api2 = await axios.get(`${API_GAMES}/${id}?key=${API_KEY}`);
      // console.log(api2)
      const detail = {
        image: api2.data.background_image,
        name: api2.data.name,
        genres: api2?.data.genres.map((g) => g.name).join(", "),
        description: api2.data.description,
        rating: api2.data.rating,
        released: api2.data.released,
        platforms: api2?.data.platforms.map((p) => p.platform.name).join(", "),
      };
      // console.log(detail)
      return res.send(detail);
    } else {
      return res.send(bd);
    }
  } catch (error) {
    next(error);
  }
});

// [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos
// [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos
// [ ] Un formulario controlado con los siguientes campos
// Nombre
// Descripción
// Fecha de lanzamiento
// Rating
// [ ] Posibilidad de seleccionar/agregar varios géneros
// [ ] Posibilidad de seleccionar/agregar varias plataformas
// [ ] Botón/Opción para crear un nuevo videojuego
router.post("/", async (req, res, next) => {
  //CARGAR LA BASE DE DATOS CON VIDEOGAME FUNCIONANDO
  try {
    const { name, image, description, released, rating, genres, platforms, genreNew,platformNew } =
      req.body;
    // const videogame = req.body;
    console.log(genres);
    {platformNew?(platforms.push(platformNew)):(platforms)} 
    {genreNew?(genres.push(genreNew)):(genres)}  //CON ESTO AGREGO GENERO NUEVO QUE VIENE DEL FRONT
    

    const gameCreated = await Videogame.create({
      // where:{name:name},
      id: uuidv4(),
      name: name,
      image: image,
      description: description,
      released: released,
      rating: rating,
      platforms: platforms?.map(p => (p)).join(', '),
    });
    // let genresArray = genres.split(",");

    //  console.log(genresArray)
    const genreIdMap = genres.map(async (genre) => {
      const newGamePost = await Genre.findOrCreate({
        where: { name: genre },
        defaults: {
          id: uuidv4(),
        },
      });
    });
    const gender = await Genre.findAll({
      where: { name: genres },
    });
    // console.log(gender,'generooo')

    await gameCreated.setGenres(gender);

    // console.log(gameCreated)
    res.status(200).json(gameCreated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
