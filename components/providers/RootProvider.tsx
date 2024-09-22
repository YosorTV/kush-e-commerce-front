import { PropsWithChildren } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { getMessages } from 'next-intl/server';

export default async function RootProvider({ children }: PropsWithChildren) {
  const session = await auth();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </NextIntlClientProvider>
  );
}
