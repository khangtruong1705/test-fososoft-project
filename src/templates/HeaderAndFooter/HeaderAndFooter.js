
import {useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { DOMAIN } from '../../util/config';
import { jwtDecode } from 'jwt-decode';



const HeaderAndFooter = () => {
    return (
        <>
            <Header />
                <Outlet className='content' style={{ minHeight: '700px', backgroundColor: '#f4f6f8' }} />
            <Footer />
        </>
    )
};

export default HeaderAndFooter;