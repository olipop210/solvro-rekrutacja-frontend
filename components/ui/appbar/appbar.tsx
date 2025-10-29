import { HoverCard, HoverCardContent, HoverCardTrigger } from '../hover-card';
import './appbar.scss';
import { RxHome } from "react-icons/rx";
import { BiDrink } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import Link from 'next/link';

const Appbar = () => {
    return (
        <header className="appbar">
            <h1>Solvro Cocktails</h1>
            <nav>
                <ul>
                    <li>
                        <HoverCard>
                            <HoverCardTrigger>
                                <Link href="/">
                                    <RxHome size={35} style={{ cursor: 'pointer' }} />
                                </Link>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>Strona główna</p>
                            </HoverCardContent>
                        </HoverCard>
                    </li>
                    <li>
                        <HoverCard>
                            <HoverCardTrigger>
                                <Link href="/browse">
                                    <BiDrink size={35} style={{ cursor: 'pointer' }} />
                                </Link>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>Koktajle</p>
                            </HoverCardContent>
                        </HoverCard>
                    </li>
                    <li>
                        <HoverCard>
                            <HoverCardTrigger>
                                <Link href="/favorites">
                                    <MdFavoriteBorder size={35} style={{ cursor: 'pointer' }} />
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