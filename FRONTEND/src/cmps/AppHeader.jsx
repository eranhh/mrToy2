import { Link } from 'react-router-dom'
import { storageService } from '../services/storageService'
import { Button, ButtonGroup, Chip, Avatar } from '@material-ui/core'

export function AppHeader() {
    const currUser = storageService.load('loggedinUser')
    const fullName = currUser ? currUser.firstName + ' ' + currUser.lastName : null

    return <header>
        <section className="main-layout flex j-between a-center">
            <h1><Link to="/">Kitty Toys</Link></h1>
            {currUser ?
                <Link to="/login" className="link">
                    <Chip
                        avatar={<Avatar>{currUser.firstName.charAt(0) + currUser.lastName.charAt(0)}</Avatar>}
                        label={fullName}
                        color="primary" />
                </Link>
                : <Link to="/signup" className="link">
                    <Chip
                        avatar={<Avatar></Avatar>}
                        label="Login"
                        color="primary" />
                </Link>}
            <nav>
                <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                    <Button><Link to="/toy">Toys</Link></Button>
                    <Button><Link to="/about">About Us</Link></Button>
                </ButtonGroup>
            </nav>
        </section>
    </header>
}