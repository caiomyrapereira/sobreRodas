'use strict';

var express = require('express');
var router = express.Router();
var data = [];

router.get('/', function(req, res) {
    res.json(data);
});

router.post('/', function(req, res) {
    if (validateAll(req)) {
        dataPush(req)
        res.json({ message: 'success' });
    } else {
        res.json({ message: 'error' })
    }
});

router.delete('/', function(req, res) {
    data = data.filter(function(car) {
        return car.plate !== req.body.plate;
    });
    res.json({ message: 'success' });
});


function dataPush(req) {
    data.push({
        image: req.body.image,
        brandModel: req.body.brandModel,
        year: req.body.year,
        plate: req.body.plate,
        color: req.body.color
    });
}

function validatePlate(req) {
    return data.some((item) => item.plate === req.body.plate);
}

function validateInputs(req) {
    const input = [req.body.image, req.body.brandModel, req.body.year, req.body.plate, req.body.color];
    return input.every((item) => item !== '');
}

function validateAll(req) {
    return !validatePlate(req) && validateInputs(req);
}

module.exports = router;