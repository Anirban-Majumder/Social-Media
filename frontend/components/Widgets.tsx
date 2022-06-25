import { FireIcon,
         InformationCircleIcon,
         NewspaperIcon,
         SparklesIcon,
         MailIcon
} from '@heroicons/react/outline'
import React from 'react'

function Widgets() {
  return (
    <div className='flex flex-col items-center py-10 px-2 md:items-start col-span-2'>
        <div className='col-span-2 flex max-w-fit space-x-2 px-1 py-4 rounded-full'>
        <FireIcon className='relative h-8 w-8 top-3'/>
        <p className='inline-flex group-hover:text-twitter text-xl font-normal'>Here Are Some <br></br>Awesome Links:</p>
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
    </div>
  )
}

export default Widgets