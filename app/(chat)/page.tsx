import React from 'react';
import { nanoid } from '@/lib/utils';
import { Chat } from '@/components/chat';
import { AI } from '@/lib/chat/actions';
import { auth } from '@/auth';
import { Session } from '@/lib/types';
import { getMissingKeys } from '@/app/actions';
import { getNoOfAttempts } from '../actions/serverActions';
import { redirect } from 'next/navigation';
import SecurityPolicy from '@/components/ui/Security-modal';

export default async function IndexPage() {
  const id = nanoid();
  const session = (await auth()) as Session;
  const missingKeys = await getMissingKeys();
  const attempts = await getNoOfAttempts();

  if (!session?.user?.email && attempts >3) {
    redirect('/login');
  }

  return (
    <>
      {!session?.user && attempts == 0 && <SecurityPolicy />}
      <AI initialAIState={{ chatId: id, messages: [] }}>
        <Chat id={id} session={session} missingKeys={missingKeys} />
      </AI>
    </>
  );
}
