const db = require('../db/db');
const formatTemplate = require('../utils/formatTemplate');

// GET /api/templates
exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await db('templates').select();
    res.json(templates.map(formatTemplate));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/templates/:id
exports.getTemplateById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid template id' });
    }

    const template = await db('templates').where({ id }).first();
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json(formatTemplate(template));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
