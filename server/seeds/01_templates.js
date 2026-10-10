exports.seed = async function (knex) {
  // Clear old data so running the seed twice doesn't create duplicates
  await knex('favorites').del();
  await knex('templates').del();

  await knex('templates').insert([
    {
      name: 'Modern Portfolio',
      description: 'A clean one-page portfolio template for designers and developers.',
      thumbnail_url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
      category: 'Portfolio',
      price: 29,
      features: JSON.stringify([
        'Fully responsive layout',
        'Project gallery with lightbox',
        'Dark and light mode',
        'Contact form section',
      ]),
    },
    {
      name: 'SaaS Landing Page',
      description: 'High-converting landing page with pricing and feature sections.',
      thumbnail_url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
      category: 'Landing Page',
      price: 49,
      features: JSON.stringify([
        'Hero section with call to action',
        'Pricing table with plan toggle',
        'Feature grid and testimonials',
        'FAQ accordion',
      ]),
    },
    {
      name: 'Admin Dashboard',
      description: 'Responsive dashboard with charts, tables, and sidebar navigation.',
      thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      category: 'Dashboard',
      price: 59,
      features: JSON.stringify([
        'Interactive charts and stat cards',
        'Sortable data tables',
        'Collapsible sidebar navigation',
        'Ready-made settings pages',
      ]),
    },
    {
      name: 'Online Store',
      description: 'E-commerce template with product grid, cart, and checkout pages.',
      thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      category: 'E-commerce',
      price: 69,
      features: JSON.stringify([
        'Product grid with filters',
        'Shopping cart and checkout flow',
        'Product detail pages',
        'Order summary emails layout',
      ]),
    },
    {
      name: 'Personal Blog',
      description: 'Minimal blog layout with featured posts and a clean reading view.',
      thumbnail_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
      category: 'Blog',
      price: 19,
      features: JSON.stringify([
        'Featured posts section',
        'Distraction-free reading view',
        'Tags and category pages',
        'Newsletter sign-up block',
      ]),
    },
    {
      name: 'Startup Pitch Deck',
      description: 'Slide-style template to present your startup idea to investors.',
      thumbnail_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
      category: 'Landing Page',
      price: 24,
      features: JSON.stringify([
        '12 ready-made slide layouts',
        'Problem, solution and market slides',
        'Team and roadmap sections',
        'Keyboard slide navigation',
      ]),
    },
  ]);
};
