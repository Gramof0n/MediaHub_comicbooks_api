var express = require('express');
var router = express.Router();
var Comic = require('../models/comic');

const checkAuth = require('../middleware/checkAuth');


router.get('/', async (req,res) =>{ 
    try {
        const comics = await Comic.find();
        res.json(comics);
    } catch (error) {
        res.json({message: error});
    }
});


//POST A COMIC

router.post('/post', checkAuth, async (req, res) => {
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

router.get('/id/:comicId', async(req, res) => {
    try {
        const comicById = await Comic.findOne({'_id': req.params.comicId});
        res.json(comicById);
    } catch (error) {
        res.json({message:error});
    }
});

//GET BY TITLE

router.get('/title/:title', async (req,res) => {
    try {
        const comicByTitle = await Comic.find({'title':req.params.title});
        res.json(comicByTitle);
    } catch (error) {
        res.json({message:error});
    }
});

//GET BY PUBLISHER

router.get('/publisher/:publisher', async (req,res) => {
    try {
        const comicByPublisher = await Comic.find({'publisher':req.params.publisher});
        res.json(comicByPublisher);
    } catch (error) {
        res.json({message:error});
    }
});

//GET BY ISSUE

router.get('/issue/:issue', async (req,res) => {
    try {
        const comicByIssue = await Comic.find({'issue':req.params.issue});
        res.json(comicByIssue);
    } catch (error) {
        res.json({message:error});
    }
});


//GET BY GENRE

router.get('/genre/:genre', async (req,res) => {
    try {
        const comicByGenre = await Comic.find({'genre':req.params.genre});
        res.json(comicByGenre);
    } catch (error) {
        res.json({message:error});
    }
});

//REMOVE BY ID

router.delete('/delete/:comicId',checkAuth, async(req, res) => {
    try {
        const removedComic = await Comic.remove({_id: req.params.comicId});
        res.json(removedComic);
    } catch (error) {
        res.json({message:error});
    }
});

//EDIT BY ID

router.put('/edit/:comicId',checkAuth, async (req, res) => {
    try {
        const updatedComic = await Comic.findByIdAndUpdate(req.params.comicId, req.body);
        res.json(updatedComic);
    } catch (error) {
        res.json({message:error});
    }
});


module.exports = router;