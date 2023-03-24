import { signIn, useSession } from 'next-auth/react';
import { getProviders } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function SignIn(): JSX.Element {
  const [providers, setProviders] = useState<any>(null);
  const { data: session } = useSession();

  function getProviderLogo(providerName: string) {
    switch (providerName) {
      case 'Google':
        return 'https://img.icons8.com/color/48/null/google-logo.png';
      case 'Facebook':
        return 'https://img.icons8.com/fluency/48/null/facebook-new.png';
      case 'GitHub':
        return 'https://img.icons8.com/ios-filled/50/null/github.png';
      default:
        return '/default-logo.png';
    }
  }

  useEffect(() => {
    getProviders().then(providers => setProviders(providers));
  }, []);

  if (session) {
    return <p>You are already signed in.</p>;
  }

  if (!providers) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-between min-h-screen py-2">
      <div className="flex flex-col items-center justify-center pt-8">
        <h2 className="text-3xl font-bold mb-4">Welcome back.</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
      {Object.values(providers).map((provider) => (
            <div key={provider.name} className="mb-4">
              <button
                onClick={() => signIn(provider.id,{ callbackUrl: '/' })}
                className="w-60 px-4 py-2 rounded-full border border-gray-600 dark:border-gray-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 whitespace-nowrap flex items-center justify-center"
              >
                <img src={getProviderLogo(provider.name)} alt={provider.name} className="w-6 h-6 mr-2" />
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
      <div className="mb-4 pb-4">
        <p className="text-sm text-gray-600 text-center">
          No account?{' '}
          <button className="font-bold text-twitter hover:text-blue-400 focus:outline-none focus:ring-offset-transparent focus:ring-blue-200 focus:ring-opacity-50">
            Create one
          </button>
        </p>
      </div>
      <div className="mb-4 text-center">
        <p className="text-xs text-textgray">
          Click “Sign In” to agree to Ani’s place’s{' '}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className= "hover:text-twitter underline"
          >
            Terms of Service
          </a>{' '}
          and acknowledge that  Ani’s place’s{' '}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-twitter underline"
          >
            Privacy Policy
          </a>{' '}
          applies to you.
        </p>
      </div>
    </div>
  );
};