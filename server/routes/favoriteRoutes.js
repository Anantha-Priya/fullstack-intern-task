const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require('../controllers/favoriteController');

const router = express.Router();

// Every favorites route requires a logged-in user
router.use(auth);

router.get('/', getFavorites);
router.post('/:templateId', addFavorite);
router.delete('/:templateId', removeFavorite);

module.exports = router;