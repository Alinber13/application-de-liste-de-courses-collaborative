import React, { useState } from 'react'
import { Plus, Share2, Trash2, Edit3 } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { useAuth } from '../../hooks/useAuth'
import { CreateListModal } from './CreateListModal'
import { ShareListModal } from './ShareListModal'

export function ListManager() {
  const { lists, createList, fetchLists } = useStore()
  const { user } = useAuth()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedList, setSelectedList] = useState(null)

  React.useEffect(() => {
    if (user) {
      fetchLists(user.id)
    }
  }, [user, fetchLists])

  const handleCreateList = async (name) => {
    await createList(name, user.id)
    setShowCreateModal(false)
  }

  const handleShareList = (list) => {
    setSelectedList(list)
    setShowShareModal(true)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Mes listes de courses
        </h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvelle liste</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list) => (
          <div key={list.id} className="card group hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {list.name}
              </h3>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleShareList(list)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Partager"
                >
                  <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Modifier"
                >
                  <Edit3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {list.items?.length || 0} articles
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-500">
              <span>
                Modifié le {new Date(list.updated_at).toLocaleDateString()}
              </span>
              <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                Ouvrir
              </button>
            </div>
          </div>
        ))}
      </div>

      {lists.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Plus className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Aucune liste pour le moment
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Créez votre première liste de courses pour commencer
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            Créer une liste
          </button>
        </div>
      )}

      <CreateListModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateList}
      />

      <ShareListModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        list={selectedList}
      />
    </div>
  )
}
