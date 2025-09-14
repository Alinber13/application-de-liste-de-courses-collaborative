import React from 'react'
import { Plus, Clock, Users } from 'lucide-react'
import { RECIPES } from '../../config/constants'
import { useStore } from '../../store/useStore'

export function RecipeSuggestions() {
  const { currentList, updateListItems } = useStore()

  const addRecipeIngredients = (recipe) => {
    if (!currentList) return

    const newItems = [
      ...(currentList.items || []),
      ...recipe.ingredients.map(ing => ({
        id: Date.now() + Math.random(),
        name: ing.name,
        category: ing.category,
        completed: false,
        addedAt: new Date().toISOString(),
        fromRecipe: recipe.name
      }))
    ]

    updateListItems(currentList.id, newItems)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Suggestions de recettes
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Ajoutez les ingrédients directement à votre liste
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RECIPES.map(recipe => (
          <div key={recipe.id} className="card group hover:shadow-lg transition-shadow">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {recipe.name}
            </h3>
            
            <div className="space-y-2 mb-4">
              {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-2"></div>
                  {ingredient.name}
                </div>
              ))}
              {recipe.ingredients.length > 3 && (
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  +{recipe.ingredients.length - 3} autres ingrédients...
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>30min</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>4 pers.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => addRecipeIngredients(recipe)}
              className="w-full btn-secondary flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter à la liste</span>
            </button>
          </div>
        ))}
      </div>

      {RECIPES.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Clock className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Aucune recette disponible
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Les suggestions de recettes seront bientôt disponibles
          </p>
        </div>
      )}
    </div>
  )
}
