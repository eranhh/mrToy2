import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Button, ButtonGroup, Chip, Avatar } from '@material-ui/core'

function _AppHeader({ loggedInUser }) {
    const currUser = loggedInUser
    const fullName = currUser ? currUser.firstName + ' ' + currUser.lastName : null

    return <header>
        <section className="main-layout flex j-between a-center">
            <h1 className="logo"><NavLink exact to="/">😺 Kitty Toys</NavLink></h1>
            <div className="flex a-center">
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
            </div>
        </section>
    </header>
}

const mapStateToProps = (state) => {
    return { loggedInUser: state.userModule.loggedInUser }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)