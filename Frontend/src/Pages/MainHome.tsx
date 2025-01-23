import { useState } from 'react';
import { Link } from 'react-router';
import { Outlet } from 'react-router';
import Sidebar from '../Components/Sidebar';
import Content from '../Components/Dashboard';
import Header from '../Components/Header';
function MainHome() {
    return (
        <div className='flex min-h-screen flex-col'>
            <Header/>
            <div className='flex flex-row'>
                <Sidebar/>
                <Outlet/>
            </div>
        </div>
    );
}

export default MainHome;
