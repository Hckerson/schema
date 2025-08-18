'use server';
import { signIn, signOut} from '@/auth'

export const login = async ()=>{
  await signIn('linkedin', {redirectTo : '/api/auth/oauth/linkedin'})
}

export const signout = async ()=>{
  await signOut( {redirectTo : '/login'})
}