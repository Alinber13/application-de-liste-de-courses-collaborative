import React from 'react'
import { ShoppingCart, Users, ChefHat, TrendingUp } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { LoginForm } from '../components/Auth/LoginForm'
import { SignupForm } from '../components/Auth/SignupForm'

export function Home() {
  const [isLogin, setIsLogin] = React.useState(true)
  const { user } = useAuth()

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Bienvenue sur <span className="text-primary-600 dark:text-primary-400">Bring!</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              L'application collaborative qui simplifie vos courses et transforme 
              votre façon de faire les achats en famille
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Listes intelligentes
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Créez et organisez vos listes par catégories avec suggestions automatiques
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Collaboration en temps réel
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Partagez vos listes avec votre famille et synchronisez vos achats
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Recettes & Suggestions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez des recettes et ajoutez les ingrédients en un clic
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Promotions ciblées
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Bénéficiez des meilleures offres près de chez vous
              </p>
            </div>
          </div>

          <div className="text-center">
            <button className="btn-primary text-lg px-8 py-4">
              Commencer maintenant
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {isLogin ? (
        <LoginForm onToggleMode={() => setIsLogin(false)} />
      ) : (
        <SignupForm onToggleMode={() => setIsLogin(true)} />
      )}
    </div>
  )
}
