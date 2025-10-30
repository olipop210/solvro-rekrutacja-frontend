import { HoverCard, HoverCardContent, HoverCardTrigger } from '../hover-card';
import './appbar.scss';
import { RxHome } from "react-icons/rx";
import { BiDrink } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import Link from 'next/link';

const Appbar = () => {
    return (
        <header className="appbar">
            <h1 className='text-3xl sm:text-4xl md:text-4xl lg:text-5xl ml-5'>Solvro Cocktails</h1>
            <nav>
                <ul>
                    <li className='ml-2 lg:ml-5 md:ml-4 sm:ml-4'>
                        <HoverCard>
                            <HoverCardTrigger>
                                <Link href="/">
                                    <RxHome className='scale-75 lg:scale-100 md:scale-100 sm:scale-100' size={35} style={{ cursor: 'pointer' }} />
                                </Link>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>Strona główna</p>
                            </HoverCardContent>
                        </HoverCard>
                    </li>
                    <li className='ml-2 lg:ml-5 md:ml-4 sm:ml-4'>
                        <HoverCard>
                            <HoverCardTrigger>
                                <Link href="/browse">
                                    <BiDrink className='scale-75 lg:scale-100 md:scale-100 sm:scale-100' size={35} style={{ cursor: 'pointer' }} />
                                </Link>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>Koktajle</p>
                            </HoverCardContent>
                        </HoverCard>
                    </li>
                    <li className='ml-2 lg:ml-5 md:ml-4 sm:ml-4'>
                        <HoverCard>
                            <HoverCardTrigger>
                                <Link href="/favorites">
                                    <MdFavoriteBorder className='scale-75 lg:scale-100 md:scale-100 sm:scale-100' size={35} style={{ cursor: 'pointer' }} />
                                </Link>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>Favorite</p>
                            </HoverCardContent>
                        </HoverCard>
                    </li>
                </ul>
            </nav>

        </header>
    );
}

export default Appbar;