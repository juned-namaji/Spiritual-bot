import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { SignInButtons } from '@/components/sign-in-buttons';


export const metadata = {
  title: 'Login',
  description: 'Login to Gita-gpt'
};

export default async function Home() {
  const session = await auth();
  
  if (session?.user) {
    redirect('/');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white dark:bg-black p-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-6">
          Free Prompts Exhausted
        </h1>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          You have used all your free prompts. Please log in using one of the following methods to get free access to the app.
        </p>
        <SignInButtons />
      </div>
    </main>
  );
}
