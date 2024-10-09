'use server'
import { signIn } from '@/auth';
import { cookies } from 'next/headers';
export async function signInWithGoogle(){
    signIn('google')
}

export async function signInWithGithub(){
    signIn('github');
}

export async function getNoOfAttempts(): Promise<number> {
  const currAttempts = cookies().get('attempts')?.value;
  return currAttempts ? parseInt(currAttempts, 10) : 0;
}

export async function setCookie(): Promise<boolean> {
  const cookieCount: number = await getNoOfAttempts();
  if (cookieCount === 0) {
    cookies().set('attempts', '1');
  } else {
    const currAttempts: number= await getNoOfAttempts();

    if (currAttempts) {
      if (currAttempts < 3) {
        cookies().set('attempts', (currAttempts + 1).toString());
      } else {
        return false
      }
    }
  }
  return true;
}



