import { Link } from 'react-router-dom'
import { storageService } from '../services/storageService'
import { Button, ButtonGroup, Chip, Avatar } from '@material-ui/core'

export function AppHeader() {
    const currUser = storageService.load('loggedinUser')

    return <header>
        <section className="main-layout flex j-between a-center">
            <h1><Link to="/">MR TOY</Link></h1>
                {currUser &&
                    <Chip avatar={<Avatar>M</Avatar>} label={currUser.fullname} color="primary" />}
            <nav>
                <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                    <Button><Link to="/toy">Toys</Link></Button>
                    <Button><Link to="/about">About Us</Link></Button>
                </ButtonGroup>
            </nav>
        </section>
    </header>
}