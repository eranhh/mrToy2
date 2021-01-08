import { Link } from 'react-router-dom'
import { Button, ButtonGroup } from '@material-ui/core'

export function AppHeader() {
    return <header>
        <section className="main-layout flex j-between a-center">
            <h1><Link to="/">MR TOY</Link></h1>
            <nav>
                <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                    <Button><Link to="/toy">Toys</Link></Button>
                    <Button><Link to="/about">About Us</Link></Button>
                </ButtonGroup>
            </nav>
        </section>
    </header>
}