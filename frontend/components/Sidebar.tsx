import React, { useState} from 'react' 
import { 
    BellIcon,
    HashtagIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon,
    FireIcon,
    InformationCircleIcon,
    NewspaperIcon,
    SparklesIcon,
 } from "@heroicons/react/outline"
import SidebarRow from './SidebarRow'
import toast from 'react-hot-toast'
import Router from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'



function Sidebar() {
  const { data: session } = useSession()

  function more() { return toast.custom((t) => (
  <div
    className={`${t.visible ? 'animate-enter' : 'animate-leave'}
    pl-10  bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5 lg:hidden`}>
    <>
        <div className='col-span-2 flex max-w-fit space-x-2 px-1 py-4 rounded-full'>
        <FireIcon className='relative h-8 w-8 top-3'/>
        <p className='inline-flex group-hover:text-twitter text-xl font-normal'>Here Are Some <br></br>Awesome Links:</p>
        <button onClick={() => toast.dismiss(t.id)}
        className="w-8 h-8 inline text-large font-bold rounded-full 
        bg-blue-500 hover:bg-red-500 text-white object-center  px-2 "
        >   X  </button>
        </div>
        <div onClick={() => window.open('https://www.anirbanmajumder.tech/')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor cursor-pointer transition duration-200 group'>
        <SparklesIcon className='h-6 w-6'/>
        <p className='inline-flex group-hover:text-twitter text-xl font-light'>My Website</p>
        </div>
        <div onClick={() => window.open('https://www.anirbanmajumder.tech/about')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor cursor-pointer transition duration-200 group'>
        <InformationCircleIcon className='h-6 w-6'/>
        <p className='inline-flex group-hover:text-twitter text-xl font-light'>About Me</p>
        </div>
        <div onClick={() => window.open('https://blog.anirbanmajumder.tech/')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor cursor-pointer transition duration-200 group'>
        <NewspaperIcon className='h-6 w-6'/>
        <p className='inline-flex group-hover:text-twitter text-xl font-light'>My Blog</p>
        </div>
        <div onClick={() => window.open('mailto: contact@anirbanmajumder.tech')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor cursor-pointer transition duration-200 group'>
        <MailIcon className='h-6 w-6'/>
        <p className='inline-flex group-hover:text-twitter text-xl font-light'>Contact Me</p>
        </div>
    </>
  </div>
))}

  function notification() {return toast('You have no new notifications.',{icon: '🔔'})}
  function explore() { return toast.success('No Hashtags to explore.',{icon: '🔍'})}
  function home() {return Router.push('/home')}
  return (
    <div className='flex flex-col items-center py-5 px-4 md:items-start col-span-2'>
        <img className='m-3 h-10 w-10 md:self-center' src="/logo.png"  />
        <SidebarRow Icon={HomeIcon} title="Home" onClick={home}/>
        <SidebarRow Icon={HashtagIcon} title="Explore" onClick={explore}/>
        <SidebarRow Icon={BellIcon} title="Notifications" onClick={notification}/>
        <SidebarRow Icon={UserIcon} onClick={!session ? signIn : signOut} title={session ? 'Sign Out' : 'Sign In'}/>
        <SidebarRow Icon={DotsCircleHorizontalIcon} onClick={more} title="More"/>
    </div>
  )
}

export default Sidebar