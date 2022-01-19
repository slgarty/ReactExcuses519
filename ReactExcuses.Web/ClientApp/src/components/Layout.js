import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';


const Layout = ({ children }) => {

    const { user } = useAuthContext();
    const loggedIn = !!user;

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className="navbar-brand">React Excuses</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link className='nav-link text-light' to='/viewAll'>View All</Link></li>
                                {!loggedIn && <li className="nav-item"><Link className='nav-link text-light' to='/signup'>Signup</Link></li>}
                                {!loggedIn && <li className="nav-item"><Link className='nav-link text-light' to='/login'>Login</Link></li>}
                                {loggedIn && <li className="nav-item"><Link className='nav-link text-light' to='/logout'>Logout</Link></li>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="container" style={{ marginTop: 80 }}>
                <main role="main" className="pb-3">
                    {children}
                </main>

            </div>

        </div>
    )
}

export default Layout;
