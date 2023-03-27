import { Fragment } from 'react'
import {
    FireIcon,
    XCircleIcon,
    SparklesIcon,
    InformationCircleIcon,
    NewspaperIcon,
    MailIcon
} from '@heroicons/react/outline'

interface PopupProps {
    open: boolean;
    onClose: () => void;
  }

function Popup({ open, onClose }: PopupProps) {
    return (
      <>
        {open && (
          <>
            <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-300 dark:bg-darkgrey opacity-95">
              <div className=" p-4 rounded-md shadow-lg bg-white dark:bg-black">
              <div className='col-span-2 flex max-w-fit space-x-2 px-1 py-4 rounded-full '>
                <FireIcon className='relative h-8 w-8 top-3'/>
                <p className='inline-flex group-hover:text-twitter text-xl font-normal'>Here Are Some <br></br>Awesome Links:</p>
                <XCircleIcon className='h-8 w-8 inline object-center pt-1 text-red-500' onClick={onClose}/>
                </div>
                <div onClick={() => window.open('https://anirbanmajumder.vercel.app/')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor dark:hover:bg-zinc-900 cursor-pointer transition duration-200 group'>
                <SparklesIcon className='h-6 w-6 lg:h-7 lg:w-7'/>
                <p className='inline-flex group-hover:text-twitter text-xl font-light'>My Website</p>
                </div>
                <div onClick={() => window.open('https://anirbanmajumder.vercel.app/about.html')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor dark:hover:bg-zinc-900 cursor-pointer transition duration-200 group'>
                <InformationCircleIcon className='h-6 w-6 lg:h-7 lg:w-7'/>
                <p className='inline-flex group-hover:text-twitter text-xl font-light'>About Me</p>
                </div>
                <div onClick={() => window.open('https://blog-anirbanmajumder0.vercel.app/')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor dark:hover:bg-zinc-900 cursor-pointer transition duration-200 group'>
                <NewspaperIcon className='h-6 w-6 lg:h-7 lg:w-7'/>
                <p className='inline-flex group-hover:text-twitter text-xl font-light'>My Blog</p>
                </div>
                <div onClick={() => window.open('mailto: anirbanchess2015@gmail.com')} className='col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor dark:hover:bg-zinc-900 cursor-pointer transition duration-200 group'>
                <MailIcon className='h-6 w-6 lg:h-7 lg:w-7'/>
                <p className='inline-flex group-hover:text-twitter text-xl font-light'>Contact Me</p>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  export default Popup