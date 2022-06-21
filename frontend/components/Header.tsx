import { signIn, useSession } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <header>
      {session?
      <div className='hidden'></div>
      :
      <div className='block w-80% h-16 ml-4 mr-4 '>
        <div className='relative top-0 opacity-100 overflow-hidden m-0 bg-slate-100 rounded-b-lg py-2 px-4'>
              <span className='absolute p-3 leading-5 '>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className='py-2 px-4 float-right -mr-1 font-medium text-white rounded-md cursor-pointer leading-6 relative z-10 bg-twitter'
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
        </div>
      </div>
      }
    </header>
  )
}
