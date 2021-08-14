//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require('./src/app.js');
const {Genre, conn } = require('./src/db.js');
const axios = require('axios');
// const { UUIDV4 } = require('sequelize/types');
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { API_GENRES, API_KEY, PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT || 3001, async () => {  
                                                     //ACA PRECARGAR LOS GENEROS Y PONER CONDICION Q CHEQUEE SI YA NO ESTAN CARGADOS!!!
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const dbGenres = await Genre.findAll()
    // console.log(dbGenres)
    if(dbGenres.length === 0){
      try {
    const api = await axios.get(`${API_GENRES}?key=${API_KEY}`);
    const genres = api.data.results;
    // console.log(genres);
    if(genres.length > 0){
       genres.forEach( g => {
         Genre.findOrCreate({
        where: { id: uuidv4(), name: g.name },
      });
    });
    }   
    } catch (error) {
      console.error(error)
    }
    
    }

    
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err)})