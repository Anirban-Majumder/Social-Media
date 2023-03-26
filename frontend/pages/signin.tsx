import { signIn, useSession } from 'next-auth/react';
import { getProviders } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// add a create user api and new user form
// add a reset password api and form

export default function SignIn(): JSX.Element {
  const [providers, setProviders] = useState<any>(null);
  const { data: session } = useSession();
  const [emailLogin, setEmailLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (email === '') {
      toast.error('Email is required');
      return;
    } else if (password === '') {
      toast.error('Password is required');
      return;
    } else if (!email.includes('@')) {
      toast.error('Email is not valid');
      return;
    } else if (password.length < 8) {
      toast.error('Password is not valid');
      return;
    } else if (password.length > 20) {
      toast.error('Password is not valid');
      return;
    //} else if (emailExist(email)) {
    //  toast.error('Email does not exist'); // write a util+ api  to check if email exist
    //  return;
    //} else if (emailFromOtherProvider(email)) {
    //  toast.error('Please login with your provider'); // write a uti+api to check if email from other provider
    //  return;
    } else {
      signIn('email', { email, password });
      toast.success('Login Successful');
      return;
    }
  };

  function getProviderLogo(providerName: string) {
    switch (providerName) {
      case 'Google':
        return 'https://img.icons8.com/color/48/null/google-logo.png';
      case 'Facebook':
        return 'https://img.icons8.com/fluency/48/null/facebook-new.png';
      case 'GitHub':
        return 'https://img.icons8.com/ios-filled/50/null/github.png';
      case 'email':
        return 'https://img.icons8.com/fluency/48/null/filled-message.png';
      default:
        return '/default-logo.png';
    }
  }

  function errorToast() {
    //toast.dismiss();
    //toast.success('Email login is not available yet');
    alert('Email login is not available yet');
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
    <div className="flex flex-col justify-between min-h-screen py-4 items-center dark:bg-darkgrey">
      <div className="flex flex-col items-center justify-center mt-16">
        <h2 className="text-3xl font-bold mb-4 transition-all duration-500">{isSignUp ? "Join Ani's place" : "Welcome back."}</h2>
      </div>
      {!emailLogin?
      <div className="flex flex-col items-center justify-center">
        {Object.values(providers)
          .filter((provider: any) => !isSignUp || provider.name !== 'GitHub')
          .map((provider: any) => (
            <div key={provider.name} className="mb-4 flex items-center justify-start ">
              <button
                onClick={
                  !(provider.name === 'email')
                    ? () => signIn(provider.id, { callbackUrl: '/' })
                    : errorToast
                }
                className="w-60 px-4 py-2 rounded-full border border-gray-600 dark:border-gray-400 hover:border-black dark:hover:border-white transition ease-in-out hover:-translate-y-1 hover:scale-80 duration-300 whitespace-nowrap flex items-center justify-center"
              >
                <img
                  src={getProviderLogo(provider.name)}
                  alt={provider.name}
                  className="w-6 h-6 mr-2 left-0"
                />
                {isSignUp ? "Sign up with" : "Sign in with"} {provider.name}
              </button>
            </div>
          ))}
      </div>:
      <form onSubmit={handleSubmit} className="items-center shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-80 dark:shadow-gray-400">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-2 px-3 bg-boxcolor dark:bg-darkboxcolor leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-2 px-3 bg-boxcolor dark:bg-darkboxcolor mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex flex-grow items-center justify-between text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>}
      <div className="mb-4 pb-4">
        <p className="text-sm text-gray-600 text-center transition-all duration-500">
          {!isSignUp ? (
            <>
              No account?{' '}
              <button
                onClick={() => setIsSignUp(true)}
                className="font-bold text-twitter transition ease-in-out hover:-translate-y-1 hover:scale-80 duration-300"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignUp(false)}
                className="font-bold text-twitter transition ease-in-out hover:-translate-y-1 hover:scale-80 duration-300"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
      <div className="mb-4 text-center px-4">
        <p className="text-xs text-textgray transition-all duration-500">
          Click “Sign {isSignUp ? "Up" : "In"}” to agree to Ani’s place’s{' '}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-twitter underline"
          >
            Terms of Service
          </a>{' '}
          and acknowledge that Ani’s place’s{' '}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-twitter underline"
            >
              Privacy Policy
            </a>{' '}
            applies to you.
          </p>
          <p className="text-xs text-textgray">
            Icons by{' '}
            <a
              href="https://icons8.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-twitter underline"
            >
              Icons8
            </a>
          </p>
      </div>
    </div>
  );
}