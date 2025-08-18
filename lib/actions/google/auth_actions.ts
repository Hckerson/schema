'use server';
import { signIn, signOut} from '@/auth'

export const login = async ()=>{
  await signIn('google', {redirectTo : '/api/auth/oauth/google'})
}

export const signout = async ()=>{
  await signOut( {redirectTo : '/login'})
}