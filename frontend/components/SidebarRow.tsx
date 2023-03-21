import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
    title: string
    onClick?: () => {}
    extra?: string
}

function SidebarRow({Icon, title, onClick, extra}: Props) {
  return (
    <div onClick={() => onClick?.()} className={`col-span-2 flex max-w-fit space-x-2 px-4 py-4 rounded-full hover:bg-bordercolor cursor-pointer transition duration-200 group dark:hover:bg-zinc-900 ${extra}`}>
        <Icon className='h-6 w-6 lg:h-7 lg:w-7'/>
        <p className='hidden md:inline-flex group-hover:text-twitter text-base font-light dark:group-hover:text-blue-400 lg:text-xl'>{ title }</p>
    </div>
  )
}

export default SidebarRow