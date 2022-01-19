import React, {useEffect} from 'react';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const { setUser } = useAuthContext();
    const history = useHistory();
    useEffect(() => {
        const doLogout = async () => {
            await axios.get('/api/account/logout');
            setUser(null);
            history.push('/login');
        }
        doLogout();
    }, []);
    
    return (<></>);
}

export default Logout;