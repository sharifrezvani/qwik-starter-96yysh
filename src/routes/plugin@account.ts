// @ts-nocheck

import { serverAuth$ } from '@builder.io/qwik-auth';
import type { Provider } from '@auth/core/providers';
import Keycloak from '@auth/core/providers/keycloak';

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get('AUTH_SECRET'),
    trustHost: true,
    callbacks: {
      async session({ session, token }) {
        session.user.guid = token.sub;
        return session;
      },
    },
    providers: [
      Keycloak({
        clientId: 'Site',
        clientSecret: env.get('KEYCLOAK_CLIENT_SECRET') as string,
        issuer: env.get('KEYCLOAK_ISSUER') as string,
      }),
    ] as Provider[],
  }));
