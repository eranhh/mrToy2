import { Link } from 'react-router-dom'

export function AppHeader() {
    return <header>
        <section className="main-layout flex j-between a-center">
        <h1><Link to="/">MR TOY</Link></h1>
        <nav>
            <Link to="/toy">Toys</Link>
            <Link to="/about">About Us</Link>
        </nav>
        </section>
    </header>
}