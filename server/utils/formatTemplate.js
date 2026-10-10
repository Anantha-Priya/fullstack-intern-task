// features is stored as a JSON string in the DB; the API returns it as an array
module.exports = (template) => ({
  ...template,
  features: template.features ? JSON.parse(template.features) : [],
});
