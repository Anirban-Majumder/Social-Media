import {useState, useContext, useEffect} from 'react'
import {
    BellIcon,
    HashtagIcon,
    DotsCircleHorizontalIcon,
    UserIcon,
    HomeIcon,
    MoonIcon,
    SunIcon,
 } from "@heroicons/react/outline"
import Popup from './popup'
import Image from 'next/image'
import toast from 'react-hot-toast'
import {useTheme} from 'next-themes'
import SidebarRow from './SidebarRow'
import RefreshContext from './RefreshContext'
import { signIn, signOut, useSession } from 'next-auth/react'



function Sidebar() {
  const { data: session } = useSession()
  const {resolvedTheme, setTheme} = useTheme()
  const { setRefresh } = useContext(RefreshContext)
  const [hasMounted, setHasMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  function more() {setShowPopup(!showPopup);return 0}
  function notification() {toast.dismiss(); return toast('You have no new notifications.',{icon: '🔔'})}
  function explore() {toast.dismiss(); return toast.success('No Hashtags to explore.',{icon: '🔍'})}
  function home() {setRefresh(true); return 0}
  function dark() {setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');return 0}
  return (
    <div className='flex flex-col items-center py-5 px-4 md:items-start col-span-2'>
        <img className='m-3 h-10 w-10 md:self-center' src={hasMounted?(resolvedTheme === 'light'? "/logo.png" : "/logodark.png"):"/logo.png"}  />
        <SidebarRow Icon={HomeIcon} title="Home" onClick={home}/>
        <SidebarRow Icon={HashtagIcon} title="Explore" onClick={explore}/>
        <SidebarRow Icon={BellIcon} title="Notifications" onClick={notification}/>
        <SidebarRow Icon={hasMounted?(resolvedTheme === 'light'? MoonIcon : SunIcon):MoonIcon} onClick={dark} title= {hasMounted?(resolvedTheme === 'light'? "Dark Mode" : "Light Mode"):"Dark Mode"}/>
        <SidebarRow Icon={UserIcon} onClick={!session ? signIn : signOut} title={session ? 'Sign Out' : 'Sign In'}/>
        <SidebarRow Icon={DotsCircleHorizontalIcon} onClick={more} title="More" extra='lg:hidden'/>
        <Popup open={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  )
}

export default Sidebar