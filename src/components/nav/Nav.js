import { stack as Menu } from 'react-burger-menu';
import { Link } from "react-router-dom";
import './Nav.css';

export function Nav() {

    return (
        <>
            <Menu>
                <a id="nav_calendar" href="/">Calendar</a>
                <a id="nav_addBulletin" href="/addBulletin">Bulletin Board</a>
            </Menu>
        </>
    )
}