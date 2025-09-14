import React, { useState } from 'react'
import { ShoppingCart, ChefHat, Tag, History } from 'lucide-react'
import { ListManager } from '../components/ShoppingList/ListManager'
import { RecipeSuggestions } from '../components/Features/RecipeSuggestions'
import { Promotions } from '../components/Features/Promotions'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('lists')

  const tabs = [
    { id: 'lists', label: 'Mes Listes', icon: ShoppingCart },
    { id: 'recipes', label: 'Recettes', icon: ChefHat },
    { id: 'promotions', label: 'Promotions', icon: Tag },
    { id: 'history', label: 'Historique', icon: History }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'lists':
        return <ListManager />
      case 'recipes':
        return <RecipeSuggestions />
      case 'promotions':
        return <Promotions />
      case 'history':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Historique des courses
            </h2>
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <History className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Historique vide
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Votre historique de courses s'affichera ici
              </p>
            </div>
          </div>
        )
      default:
        return <ListManager />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                      : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
