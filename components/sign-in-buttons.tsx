import { Button } from "./ui/button";
import { signIn } from '@/auth';

export function SignInButtons() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
        className="w-full"
      >
        <Button
          type="submit"
          className="w-full bg-[#DB4437] hover:bg-[#c53a30] text-white py-1.5 rounded-md transition-all"
        >
          Log in With Google
        </Button>
      </form>

      <form
        action={async () => {
          'use server';
          await signIn('facebook');
        }}
        className="w-full"
      >
        <Button
          type="submit"
          variant="outline"
          className="w-full border-[#1877F2] text-[#1877F2] dark:text-[#1877F2] hover:bg-[#E7F3FF] dark:hover:bg-[#2d4473] py-1.5 rounded-md transition-all"
        >
          Log in With Facebook
        </Button>
      </form>

      <form
        action={async () => {
          'use server';
          await signIn('twitter');
        }}
        className="w-full"
      >
        <Button
          type="submit"
          className="w-full bg-[#1DA1F2] hover:bg-[#1991d0] text-white py-1.5 rounded-md transition-all"
        >
          Log in With Twitter
        </Button>
      </form>
      <form
        action={async () => {
          'use server';
          await signIn('instagram');
        }}
        className="w-full"
      >
        <Button
          type="submit"
          className="w-full bg-[#E4405F] hover:bg-[#d63454] text-white py-1.5 rounded-md transition-all"
        >
          Log in With Instagram
        </Button>
      </form>
    </div>
  );
}
