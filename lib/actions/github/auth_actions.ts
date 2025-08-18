'use server';
import { signIn, signOut} from '@/auth'

export const login = async ()=>{
  await signIn('github', {redirectTo : '/api/auth/oauth/github'})
}

export const signout = async ()=>{
  await signOut( {redirectTo : '/login'})
}