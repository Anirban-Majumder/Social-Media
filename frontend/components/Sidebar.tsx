import {useState, useContext, useEffect} from 'react'
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
    XCircleIcon,
    MoonIcon,
    SunIcon,
 } from "@heroicons/react/outline"
import SidebarRow from './SidebarRow'
import toast from 'react-hot-toast'
import Router from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import {useTheme} from 'next-themes'
import RefreshContext from './RefreshContext'
import Popup from './popup'



function Sidebar() {
  const { data: session } = useSession()
  const {theme, setTheme} = useTheme()
  const { setRefresh } = useContext(RefreshContext)
  const [hasMounted, setHasMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  var popup = false

  useEffect(() => {
    setHasMounted(true);
  }, []);

  function more() {
    setShowPopup(!showPopup);
    return 0
    //if(popup === true) {return 0}
//    popup = true
//    return toast.custom((t) => (
//  <div
//    className={`${t.visible ? 'animate-enter' : 'animate-leave'}
//    pl-10  bg-boxcolor shadow-lg rounded-md pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5 dark:bg-darkboxcolor dark:ring-white`}>
//    <>
//        <div className='col-span-2 flex max-w-fit space-x-2 px-1 py-4 rounded-full'>
//        <FireIcon className='relative h-8 w-8 top-3'/>
//        <p className='inline-flex group-hover:text-twitter text-xl font-normal'>Here Are Some <br></br>Awesome Links:</p>
//        <XCircleIcon className='h-8 w-8 inline object-center pt-1 text-red-500' onClick={() => {popup=false; toast.dismiss(t.id)}}/>
//        </div>
//        <div onClick={() => window.open('https://anirbanmajumder.vercel.app/')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor dark:hover:bg-zinc-900 cursor-pointer transition duration-200 group'>
//        <SparklesIcon className='h-6 w-6 lg:h-7 lg:w-7'/>
//        <p className='inline-flex group-hover:text-twitter text-xl font-light'>My Website</p>
//        </div>
//        <div onClick={() => window.open('https://anirbanmajumder.vercel.app/about.html')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor dark:hover:bg-zinc-900 cursor-pointer transition duration-200 group'>
//        <InformationCircleIcon className='h-6 w-6 lg:h-7 lg:w-7'/>
//        <p className='inline-flex group-hover:text-twitter text-xl font-light'>About Me</p>
//        </div>
//        <div onClick={() => window.open('https://blog-anirbanmajumder0.vercel.app/')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor dark:hover:bg-zinc-900 cursor-pointer transition duration-200 group'>
//        <NewspaperIcon className='h-6 w-6 lg:h-7 lg:w-7'/>
//        <p className='inline-flex group-hover:text-twitter text-xl font-light'>My Blog</p>
//        </div>
//        <div onClick={() => window.open('mailto: anirbanchess2015@gmail.com')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor dark:hover:bg-zinc-900 cursor-pointer transition duration-200 group'>
//        <MailIcon className='h-6 w-6 lg:h-7 lg:w-7'/>
//        <p className='inline-flex group-hover:text-twitter text-xl font-light'>Contact Me</p>
//        </div>
//    </>
//  </div>
//))
  }

  function notification() {toast.dismiss(); return toast('You have no new notifications.',{icon: '🔔'})}
  function explore() {toast.dismiss(); return toast.success('No Hashtags to explore.',{icon: '🔍'})}
  function home() {setRefresh(true); return 0}
  function dark() {setTheme(theme === 'dark' ? 'light' : 'dark');return 0}
  return (
    <div className='flex flex-col items-center py-5 px-4 md:items-start col-span-2'>
        <img className='m-3 h-10 w-10 md:self-center' src={hasMounted?(theme === 'light'? "/logo.png" : "/logodark.png"):"/logo.png"}  />
        <SidebarRow Icon={HomeIcon} title="Home" onClick={home}/>
        <SidebarRow Icon={HashtagIcon} title="Explore" onClick={explore}/>
        <SidebarRow Icon={BellIcon} title="Notifications" onClick={notification}/>
        <SidebarRow Icon={hasMounted?(theme === 'light'? MoonIcon : SunIcon):MoonIcon} onClick={dark} title= {hasMounted?(theme === 'light'? "Dark Mode" : "Light Mode"):"Dark Mode"}/>
        <SidebarRow Icon={UserIcon} onClick={!session ? signIn : signOut} title={session ? 'Sign Out' : 'Sign In'}/>
        <SidebarRow Icon={DotsCircleHorizontalIcon} onClick={more} title="More" extra='lg:hidden'/>
        <Popup open={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  )
}

export default Sidebar