'use strict';

const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render('celebrities/index', { celebrities });
  } catch (error) {
    next(error);
  }
});

router.get('/details/:celebrityId', async (req, res, next) => {
  const { celebrityId } = req.params;
  try {
    const celebrity = await Celebrity.findById(celebrityId);
    res.render('celebrities/show', celebrity);
  } catch (error) {
    next(error);
  }
});

router.get('/new', (req, res, next) => {
  try {
    res.render('celebrities/new');
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = {
    name,
    occupation,
    catchPhrase
  };
  try {
    const celebrity = new Celebrity(newCelebrity);
    await celebrity.save();
    res.redirect('/celebrities');
  } catch (error) {
    res.redirect('celebrities/new');
  }
});

router.post('/:celebrityId/delete', async (req, res, next) => {
  const celebrityId = req.params.celebrityId;
  console.log('peee');
  try {
    await Celebrity.findByIdAndRemove(celebrityId);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

router.get('/:celebrityId', async (req, res, next) => {
  const { celebrityId } = req.params;
  try {
    const celebrity = await Celebrity.findById(celebrityId);
    res.render('celebrities/edit', celebrity);
  } catch (error) {
    next(error);
  }
});

router.post('/:celebrityId', async (req, res, next) => {
  const celebrityId = req.params.celebrityId;
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = {
    name,
    occupation,
    catchPhrase
  };
  try {
    await Celebrity.findByIdAndUpdate(celebrityId, newCelebrity);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
