import { HoverCard, HoverCardContent, HoverCardTrigger } from '../hover-card';
import './appbar.scss';
import { RxHome } from "react-icons/rx";
import { BiDrink } from "react-icons/bi";

const Appbar = () => {
    return (
        <header className="appbar">
            <h1>Solvro Cocktails</h1>
            <nav>
                <ul>
                    <li>
                        <HoverCard>
                            <HoverCardTrigger>
                                <RxHome size={35} style={{ cursor: 'pointer' }} />
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>Strona główna</p>
                            </HoverCardContent>
                        </HoverCard>
                    </li>
                    <li>
                        <HoverCard>
                            <HoverCardTrigger>
                                <BiDrink size={35} style={{ cursor: 'pointer' }} />
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <p>Koktajle</p>
                            </HoverCardContent>
                        </HoverCard>
                    </li>
                </ul>
            </nav>

        </header>
    );
}

export default Appbar;