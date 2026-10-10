const db = require('../db/db');
const formatTemplate = require('../utils/formatTemplate');

// POST /api/favorites/:templateId
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const templateId = Number(req.params.templateId);

    if (!Number.isInteger(templateId)) {
      return res.status(400).json({ message: 'Invalid template id' });
    }

    const template = await db('templates').where({ id: templateId }).first();
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const existing = await db('favorites')
      .where({ user_id: userId, template_id: templateId })
      .first();
    if (existing) {
      return res.status(409).json({ message: 'Template is already in favorites' });
    }

    await db('favorites').insert({ user_id: userId, template_id: templateId });
    res.status(201).json({ message: 'Added to favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/favorites
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await db('favorites')
      .join('templates', 'favorites.template_id', 'templates.id')
      .where('favorites.user_id', req.user.id)
      .select('templates.*');

    res.json(favorites.map(formatTemplate));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/favorites/:templateId  (extra: lets users un-favorite)
exports.removeFavorite = async (req, res) => {
  try {
    const templateId = Number(req.params.templateId);
    if (!Number.isInteger(templateId)) {
      return res.status(400).json({ message: 'Invalid template id' });
    }

    const deleted = await db('favorites')
      .where({ user_id: req.user.id, template_id: templateId })
      .del();

    if (!deleted) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};