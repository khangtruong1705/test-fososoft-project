
import {useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { DOMAIN } from '../../util/config';
import { jwtDecode } from 'jwt-decode';


const HeaderAndFooter = () => {
    const [count, setCount] = useState(0);
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