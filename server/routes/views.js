const express = require('express');
const path = require('path');
const viewRoutes = express.Router();
const dbo = require('../db/conn');
const getColors = require('get-image-colors')

viewRoutes.route('/').get((req, res) => {
    res.render(path.join(__dirname, '..', '..', '/public/views/index.ejs'))
});

viewRoutes.route('/login').post((req, res) => {
    req.session.user = req.body.username;
    res.redirect(`/colorction`);
});

viewRoutes.route('/colorction').get((req, res) => {

    const dbConnect = dbo.getDb();
    const id = req.session.user;
    if(!id) {
        res.redirect('/');
        return;
    }
    dbConnect
    .collection(`${id}`)
    .find({})
    .limit(50)
    .toArray(function (err, result) {
        if (err) {
            res.status(400).send('Error fetching listings!');
        } else {
            res.render(path.join(__dirname, '..', '..', '/public/views/colorction.ejs'), {
                id: id,
                cores: result,
                qtde: result.length
            });
        }
    });

});

viewRoutes.route('/').post(async (req, res) => {
    const file = req.files.file;
    let caminho = path.join(__dirname, '..', 'tmp', file.name);
    await file.mv(caminho);
    const options = {count: 1}
    const dbConnect = dbo.getDb();
    const id = req.session.user;
    if(!id) {
        res.redirect('/');
        return;
    }
    await getColors(caminho, options).then(async colors => {
        const hexColor = colors.map(color => color.hex())[0]
        const blobno = getRandomIntInclusive(1, 6);
        await dbConnect
            .collection(`${id}`)
            .insertOne({
                blobno: blobno,
                _id: hexColor
            }).catch((e) => {
                console.log("Cor ja identificada");
            })
    });
    res.redirect(`/colorction`)
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}



module.exports = viewRoutes;
