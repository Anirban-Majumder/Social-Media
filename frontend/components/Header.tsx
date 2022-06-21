import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import styles from "./Header.module.css"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header>
      {session?
      <div className="hidden"></div>
      :
      <div className="block w-80% h-16 ml-4 mr-4 ">
        <div className="relative top-0 opacity-100 overflow-hidden m-0 bg-gray-200 rounded-b-lg py-2 px-4">
              <span className="absolute p-3 leading-5">
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className="py-2 px-4 float-right -mr-1 font-medium text-white rounded-md cursor-pointer leading-6 relative z-10 bg-blue-600"
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
