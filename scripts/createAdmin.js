import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://smyhrdeqkikqeifpndyo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNteWhyZGVxa2lrcWVpZnBuZHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NzUwOTksImV4cCI6MjA3MzQ1MTA5OX0.QnGx-a8Jp4OtFLIacZjb_KU3L_tL_5OTVPCi2sPDNAY'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdminAccount() {
  console.log('🔄 Création du compte administrateur...')
  
  try {
    // Créer l'utilisateur avec email et mot de passe
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'balinber@gmail.com',
      password: 'badbad',
      options: {
        emailRedirectTo: 'http://localhost:5173/auth/callback' // URL fixe pour Node.js
      }
    })

    if (authError) {
      console.error('❌ Erreur lors de la création du compte:', authError.message)
      return
    }

    console.log('✅ Compte créé avec succès:', authData.user.email)

    // Attendre un court instant pour que l'utilisateur soit disponible dans la table profiles
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mettre à jour le profil pour attribuer le rôle admin
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', authData.user.id)

    if (profileError) {
      console.error('❌ Erreur lors de la mise à jour du profil:', profileError.message)
    } else {
      console.log('✅ Rôle administrateur attribué avec succès!')
      console.log('📋 Identifiants:')
      console.log('   Email: balinber@gmail.com')
      console.log('   Mot de passe: badbad')
      console.log('   ID utilisateur:', authData.user.id)
    }

  } catch (error) {
    console.error('❌ Erreur inattendue:', error.message)
  }
}

// Exécuter la création du compte
createAdminAccount()
