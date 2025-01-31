import { useState } from 'react';
import { Link } from 'react-router';
import { Outlet } from 'react-router';
import Sidebar from '../Components/Sidebar';
import Content from '../Components/Dashboard';
import Header from '../Components/Header';
function MainHome() {

    return (
        <div className='flex min-h-screen flex-col box-border'>
            <Header/>
            <div className='flex flex-row flex-grow'>
                <Sidebar/>
                <Outlet/>
            </div>
        </div>
    );
}

export default MainHome;
