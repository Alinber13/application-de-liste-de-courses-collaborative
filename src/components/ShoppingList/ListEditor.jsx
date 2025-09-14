import React, { useState } from 'react'
import { Plus, Check, Trash2, Search, Clock } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { CATEGORIES } from '../../config/constants'

export function ListEditor({ list }) {
  const [newItem, setNewItem] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { updateListItems } = useStore()

  const handleAddItem = () => {
    if (!newItem.trim()) return

    const newItems = [
      ...(list.items || []),
      {
        id: Date.now(),
        name: newItem.trim(),
        category: selectedCategory || 'divers',
        completed: false,
        addedAt: new Date().toISOString()
      }
    ]

    updateListItems(list.id, newItems)
    setNewItem('')
    setSelectedCategory('')
  }

  const handleToggleItem = (itemId) => {
    const updatedItems = list.items.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    )
    updateListItems(list.id, updatedItems)
  }

  const handleDeleteItem = (itemId) => {
    const updatedItems = list.items.filter(item => item.id !== itemId)
    updateListItems(list.id, updatedItems)
  }

  const filteredItems = list.items?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const itemsByCategory = filteredItems.reduce((acc, item) => {
    const category = item.category || 'divers'
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {list.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Modifié le {new Date(list.updated_at).toLocaleDateString()}
        </p>
      </div>

      {/* Add Item Form */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Ajouter un article
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="input-field flex-1"
            placeholder="Nom de l'article"
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field w-full sm:w-48"
          >
            <option value="">Choisir une catégorie</option>
            {CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddItem}
            className="btn-primary whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
            placeholder="Rechercher un article..."
          />
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-6">
        {Object.entries(itemsByCategory).map(([categoryId, items]) => {
          const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES.find(c => c.id === 'divers')
          return (
            <div key={categoryId} className="card">
              <h3 className={`text-lg font-semibold mb-4 ${category.color} inline-flex items-center px-3 py-1 rounded-full`}>
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </h3>
              
              <div className="space-y-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <button
                        onClick={() => handleToggleItem(item.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          item.completed
                            ? 'bg-primary-600 border-primary-600 text-white'
                            : 'border-gray-300 dark:border-gray-600 hover:border-primary-600'
                        }`}
                      >
                        {item.completed && <Check className="w-3 h-3" />}
                      </button>
                      <span className={`flex-1 ${item.completed ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                        {item.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(item.addedAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Aucun résultat' : 'Liste vide'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm 
                ? `Aucun article ne correspond à "${searchTerm}"`
                : 'Commencez par ajouter des articles à votre liste'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
