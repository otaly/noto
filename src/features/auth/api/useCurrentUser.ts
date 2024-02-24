import { useAuthenticator } from '@aws-amplify/ui-react';

export const useCurrentUser = () => {
  const { authStatus, user, isPending } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
    context.isPending,
  ]);
  return {
    // authStatusがunauthenticatedになる前にuserがnullになることがあり、そのタイミングでgraphqlリクエストがエラーになる
    // また、userも存在しauthStatusもauthenticatedだが、isPending(ログアウト最中など)だとUnauthorizedエラーになる
    isSignedIn: authStatus === 'authenticated' && user != null && !isPending,
    username: user?.username,
  };
};
