import React from 'react'
import { Tag, Calendar } from 'lucide-react'
import { PROMOTIONS, CATEGORIES } from '../../config/constants'

export function Promotions() {
  const getCategoryIcon = (categoryId) => {
    const category = CATEGORIES.find(c => c.id === categoryId)
    return category ? category.icon : '📦'
  }

  const getCategoryName = (categoryId) => {
    const category = CATEGORIES.find(c => c.id === categoryId)
    return category ? category.name : 'Divers'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Promotions du moment
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Découvrez les offres spéciales près de chez vous
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROMOTIONS.map(promo => (
          <div key={promo.id} className="card group hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">{getCategoryIcon(promo.category)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {promo.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getCategoryName(promo.category)}
                  </p>
                </div>
              </div>
              
              <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                -{promo.discount}%
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              {promo.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Valide jusqu'au {new Date(promo.validUntil).toLocaleDateString()}</span>
              </div>
              
              <button className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                <Tag className="w-4 h-4 mr-1" />
                <span>Voir l'offre</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {PROMOTIONS.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Tag className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Aucune promotion disponible
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Les promotions seront bientôt disponibles
          </p>
        </div>
      )}
    </div>
  )
}
