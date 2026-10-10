exports.seed = async function (knex) {
  // Clear old data so running the seed twice doesn't create duplicates
  await knex('favorites').del();
  await knex('templates').del();

  await knex('templates').insert([
    {
      name: 'Modern Portfolio',
      description: 'A clean one-page portfolio template for designers and developers.',
      thumbnail_url: 'https://picsum.photos/seed/portfolio/400/250',
      category: 'Portfolio',
    },
    {
      name: 'SaaS Landing Page',
      description: 'High-converting landing page with pricing and feature sections.',
      thumbnail_url: 'https://picsum.photos/seed/saas/400/250',
      category: 'Landing Page',
    },
    {
      name: 'Admin Dashboard',
      description: 'Responsive dashboard with charts, tables, and sidebar navigation.',
      thumbnail_url: 'https://picsum.photos/seed/dashboard/400/250',
      category: 'Dashboard',
    },
    {
      name: 'Online Store',
      description: 'E-commerce template with product grid, cart, and checkout pages.',
      thumbnail_url: 'https://picsum.photos/seed/store/400/250',
      category: 'E-commerce',
    },
    {
      name: 'Personal Blog',
      description: 'Minimal blog layout with featured posts and a clean reading view.',
      thumbnail_url: 'https://picsum.photos/seed/blog/400/250',
      category: 'Blog',
    },
    {
      name: 'Startup Pitch Deck',
      description: 'Slide-style template to present your startup idea to investors.',
      thumbnail_url: 'https://picsum.photos/seed/pitch/400/250',
      category: 'Landing Page',
    },
  ]);
};