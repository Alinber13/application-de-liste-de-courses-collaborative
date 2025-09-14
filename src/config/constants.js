export const CATEGORIES = [
  { id: 'fruits-legumes', name: 'Fruits & Légumes', icon: '🍎', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { id: 'produits-laitiers', name: 'Produits Laitiers', icon: '🥛', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { id: 'viandes-poissons', name: 'Viandes & Poissons', icon: '🍗', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  { id: 'epicerie', name: 'Épicerie', icon: '🍚', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  { id: 'boissons', name: 'Boissons', icon: '🥤', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' },
  { id: 'boulangerie', name: 'Boulangerie', icon: '🍞', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
  { id: 'surgeles', name: 'Surgelés', icon: '❄️', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200' },
  { id: 'hygiene', name: 'Hygiène', icon: '🧴', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  { id: 'divers', name: 'Divers', icon: '📦', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' }
]

export const RECIPES = [
  {
    id: 1,
    name: 'Pâtes Carbonara',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    ingredients: [
      { name: 'Pâtes', quantity: '400g', category: 'epicerie' },
      { name: 'Lardons', quantity: '200g', category: 'viandes-poissons' },
      { name: 'Œufs', quantity: '4', category: 'epicerie' },
      { name: 'Parmesan', quantity: '100g', category: 'produits-laitiers' },
      { name: 'Crème fraîche', quantity: '20cl', category: 'produits-laitiers' }
    ]
  },
  {
    id: 2,
    name: 'Salade César',
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
    ingredients: [
      { name: 'Laitue', quantity: '1', category: 'fruits-legumes' },
      { name: 'Poulet', quantity: '300g', category: 'viandes-poissons' },
      { name: 'Croûtons', quantity: '100g', category: 'boulangerie' },
      { name: 'Parmesan', quantity: '50g', category: 'produits-laitiers' },
      { name: 'Sauce César', quantity: '1 bouteille', category: 'epicerie' }
    ]
  }
]

export const PROMOTIONS = [
  {
    id: 1,
    title: 'Réduction sur les fruits',
    description: '20% de réduction sur tous les fruits cette semaine',
    category: 'fruits-legumes',
    discount: 20,
    validUntil: '2024-12-31'
  },
  {
    id: 2,
    title: 'Offre spéciale produits laitiers',
    description: 'Achetez 2 produits laitiers, le 3ème est gratuit',
    category: 'produits-laitiers',
    discount: 33,
    validUntil: '2024-12-25'
  }
]
