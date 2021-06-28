import { stack as Menu } from 'react-burger-menu';
import './Nav.css';

export function Nav() {

    return (
        <>
            <Menu>
                <a id="nav_calendar" href="/">Calendar</a>
                <a id="nav_careRequests" href="/carerequests">Care Requests</a>
                <a id="nav_cropShare" href="/cropshare">Crop Share</a>
            </Menu>
        </>
    )
}