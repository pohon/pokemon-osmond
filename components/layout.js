import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import cn from 'classnames';
import Link from 'next/link'

const navigation = [
    { name: 'PokéList', href: '/' },
    { name: 'My Pokémon', href: '/catched' }
]

export default function Layout({ children, home }) {
    return (
        <>
            <header>
                <title>Pokémon</title>
                {/* remove overflow hidden */}
                {/* <div className="relative bg-white overflow-hidden"> */}
                <div className="relative bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className={cn('relative z-10 pb-8 bg-white  lg:max-w-2xl lg:w-full', {
                            'sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32': !!home
                        })}>
                            <svg
                                className={cn('hidden absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2', {
                                    'lg:block': !!home
                                })}
                                fill="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <polygon points="50,0 100,0 50,100 0,100" />
                            </svg>

                            <Popover>
                                <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                                    <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                                        <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                            <div className="flex items-center justify-between w-full md:w-auto">
                                                <Link href="/">
                                                    <a>
                                                        <span className="sr-only">Workflow</span>
                                                        <img
                                                            className="h-8 w-auto sm:h-10"
                                                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
                                                        />
                                                    </a>
                                                </Link>
                                                <div className="-mr-2 flex items-center md:hidden">
                                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                        <span className="sr-only">Open main menu</span>
                                                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                                            {navigation.map((item) => (
                                                < Link key={item.name} href={item.href}>
                                                    <a className="font-medium text-gray-500 hover:text-gray-900">
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </nav>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="duration-150 ease-out"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="duration-100 ease-in"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Popover.Panel
                                        focus
                                        className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                                    >
                                        <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                            <div className="px-5 pt-4 flex items-center justify-between">
                                                <div>
                                                    <img
                                                        className="h-8 w-auto"
                                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="-mr-2">
                                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                        <span className="sr-only">Close main menu</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                            <div className="px-2 pt-2 pb-3 space-y-1">
                                                {navigation.map((item) => (
                                                    < Link key={item.name} href={item.href}>
                                                        <a
                                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                ))}
                                            </div>
                                            <a
                                                href="#"
                                                className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                                            >
                                                Log in
                                            </a>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </Popover>

                            <main
                                className={cn("mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28", {
                                    'hidden': !home
                                })}
                            >
                                <div className="sm:text-center lg:text-left">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                        <span className="block xl:inline">See & collect your Pokémon</span>{' '}
                                        <span className="block text-indigo-600 xl:inline">now</span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                                        fugiat veniam occaecat fugiat aliqua.
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-md shadow">
                                            <a
                                                href="#pokelist"
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                                            >
                                                See all Pokémon
                                            </a>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            < Link href="/catched">
                                                <a
                                                    href="#"
                                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                                                >
                                                    Collected Pokémon
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div
                        className={cn('lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2', {
                            'hidden': !home
                        })}
                    >
                        <img
                            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                            src="https://cdn1-production-images-kly.akamaized.net/Mp028XhF_dD1TvoF7k-dQmpG58c=/1280x1280/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3581474/original/088575000_1632412791-Poke__mon_Unite.jpeg"
                            alt=""
                        />
                    </div>
                </div>
            </header>
            <main>{children}</main>
        </>
    )
}
