
import {useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { DOMAIN } from '../../util/config';
import { jwtDecode } from 'jwt-decode';


const HeaderAndFooter = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [count, setCount] = useState(0);
    const fetchData = async () => {
        try {
            const { email } = jwtDecode(token);
            await axios.get(`${DOMAIN}/api/shop-name/get-shop-by-email-owner/${email}`);

        } catch (error) {
            console.error('Error fetching products:', error);
            setToken(null)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <Header count={count} setCount={setCount} />
            <div className='content' style={{ minHeight: '700px', backgroundColor: '#f4f6f8' }}>
                <Outlet context={{
                    count: count,
                    setCount: setCount
                }} />
            </div>
            <Footer />
        </>
    )
};

export default HeaderAndFooter;