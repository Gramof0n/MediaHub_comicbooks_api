var express = require('express');
var router = express.Router();
var Comic = require('../models/comic');

var swaggerJsDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');


//SWAGGER STVARI I CUDA I SRANJA

/**
 * @swagger
 * components:
 *      schemas:
 *          Comic:
 *              type: object
 *              properties:
 *                  _id: 
 *                      type: string
 *                      description: Comic ID
 *                      example: 5fcbff3843e97a0a5060663e
 *                  title: 
 *                       type: string
 *                       description: Comic title
 *                       example: Watchmen
 *                  genre:
 *                       type: string
 *                       example: Superhero
 *                  authors: 
 *                       type: object
 *                       properties:
 *                            name:
 *                              type: string
 *                              example: Alan
 *                            surname: 
 *                              type: string
 *                              example: Moore
 *                  publisher:
 *                       type: string
 *                       example: DC comics
 *                  noOfPages:
 *                       type: integer
 *                       example: 35
 *                  issue:
 *                       type: integer
 *                       example: 1
 *          ComicWithoutId:
 *              type: object
 *              properties:
 *                  title: 
 *                       type: string
 *                       description: Comic title
 *                       example: Watchmen
 *                  genre:
 *                       type: string
 *                       example: Superhero
 *                  authors: 
 *                       type: object
 *                       properties:
 *                            name:
 *                              type: string
 *                              example: Alan
 *                            surname: 
 *                              type: string
 *                              example: Moore
 *                  publisher:
 *                       type: string
 *                       example: DC comics
 *                  noOfPages:
 *                       type: integer
 *                       example: 35
 *                  issue:
 *                       type: integer
 *                       example: 1
 */

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.9',
        info:{
            title: "Comicbook API",
            description: "API for searching, inserting editing and inserting comics into a database",
            version: 1.0,
            licence: {
                name: "Licenca",
                url: "https://www.youtube.com/",
            },
            contact: {
                name: "Nikola Milovanovic",
                url: "https://www.youtube.com/",
            },  
        },
        servers:[
            {
                url: "http://studentdocker.informatika.uni-mb.si:55555",
                description: "Portainer",
            },
            {
                url: "http://localhost:3000",
                description: "Localhost",
            },
        ],
    },
    apis: ['./routes/comics.js']
  };
  
  
//ODKOMENTARISI OVO I GARANTOVANO RADI  
//   const swaggerDocs = swaggerJsDoc(swaggerOptions);
//   router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//DISPLAY ALL
/**
 * @swagger
 *  /comics:
 *      get:
 *          summary: Returns all comics.
 *          description: Use this to request all comics from the database
 *          responses:
 *               200:
 *                  description: Successful call
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Comic'
 *                  
 */
router.get('/', async (req,res) =>{ 
    try {
        const comics = await Comic.find();
        res.json(comics);
    } catch (error) {
        res.json({message: error});
    }
});


//POST A COMIC
/**
 * @swagger
 *  /comics/post:
 *      post:
 *          summary: Insert a comic.
 *          description: Use this to insert a comic into the database.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comic'
 *          responses:
 *               200:
 *                  description: Successful call
 *                  
 */
router.post('/post', async (req, res) => {
    const comic = new Comic({
        title: req.body.title,
        genre: req.body.genre,
        authors: req.body.authors,
        publisher: req.body.publisher,
        date: req.body.date,
        noOfPages: req.body.noOfPages,
        issue: req.body.issue
    });

    try {
        const savedComic = await comic.save();
        res.json(savedComic);
        res.send(savedComic);
        
    } catch (error) {
        res.json({message: error});
    }
});

//GET BY ID
/**
 * @swagger
 *  /comics/id/{id}:
 *      get:
 *          summary: Returns a comic with a specific ID.
 *          description: Use this to request a comics with a specific id from the database
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: String value of a comic id
 *                schema:
 *                  type: string
 *          responses:
 *               200:
 *                  description: Successful call
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Comic'
 */
router.get('/id/:comicId', async(req, res) => {
    try {
        const comicById = await Comic.findOne({'_id': req.params.comicId});
        res.json(comicById);
    } catch (error) {
        res.json({message:error});
    }
});

//GET BY TITLE
/**
 * @swagger
 * /comics/title/{comicTitle}:
 *      get:
 *          summary: Returns a comic with a specific title.
 *          description: Use this to request a comics with a specific title from the database
 *          parameters:
 *              - in: path
 *                name: comicTitle
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *               200:
 *                  description: Successful call
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Comic'
 */
router.get('/title/:title', async (req,res) => {
    try {
        const comicByTitle = await Comic.find({'title':req.params.title});
        res.json(comicByTitle);
    } catch (error) {
        res.json({message:error});
    }
});

//GET BY PUBLISHER
/**
 * @swagger
 * /comics/publisher/{publisher}:
 *      get:
 *          summary: Returns all comics by the selected publisher.
 *          description: Use this to request all comics from the specific publisher
 *          parameters:
 *              - in: path
 *                name: publisher
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *               200:
 *                  description: Successful call
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Comic'
 */
router.get('/publisher/:publisher', async (req,res) => {
    try {
        const comicByPublisher = await Comic.find({'publisher':req.params.publisher});
        res.json(comicByPublisher);
    } catch (error) {
        res.json({message:error});
    }
});

//GET BY ISSUE
/**
 * @swagger
 * /comics/issue/{noOfIssue}:
 *      get:
 *          summary: Returns all comics with requested issue.
 *          description: Use this to request all comics with the specific issue.
 *          parameters:
 *              - in: path
 *                name: noOfIssue
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *               200:
 *                  description: Successful call
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Comic'
 */
router.get('/issue/:issue', async (req,res) => {
    try {
        const comicByIssue = await Comic.find({'issue':req.params.issue});
        res.json(comicByIssue);
    } catch (error) {
        res.json({message:error});
    }
});


//GET BY GENRE
/**
 * @swagger
 * /comics/genre/{genre}:
 *      get:
 *          summary: Returns all comics of the selected genre.
 *          description: Use this to request all comics of the specific genre.
 *          parameters:
 *              - in: path
 *                name: genre
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *               200:
 *                  description: Successful call
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Comic'
 */
router.get('/genre/:genre', async (req,res) => {
    try {
        const comicByGenre = await Comic.find({'genre':req.params.genre});
        res.json(comicByGenre);
    } catch (error) {
        res.json({message:error});
    }
});

//REMOVE BY ID
/**
 * @swagger
 *  /comics/delete/{comicId}:
 *      delete:
 *          summary: Removes a comic by it's id.
 *          description: Use this to remove a comic with the specific ID.
 *          parameters:
 *              - in: path
 *                name: comicId
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *               200:
 *                  description: Successful call
 *                 
 */
router.delete('/delete/:comicId', async(req, res) => {
    try {
        const removedComic = await Comic.remove({_id: req.params.comicId});
        res.json(removedComic);
    } catch (error) {
        res.json({message:error});
    }
});

//EDIT BY ID
/**
 * @swagger
 *  /comics/edit/{comicId}:
 *      put:
 *          summary: Edits a comic by it's id.
 *          description: Use this to edit a comic with the specific ID.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ComicWithoutId'
 *          parameters: 
 *              - in: path
 *                name: comicId
 *                required: true
 *                schema:
 *                  type: string
 *          responses:
 *               200:
 *                  description: Successful call
 */
router.put('/edit/:comicId', async (req, res) => {
    try {
        const updatedComic = await Comic.findByIdAndUpdate(req.params.comicId, req.body);
        res.json(updatedComic);
    } catch (error) {
        res.json({message:error});
    }
});


module.exports = router;