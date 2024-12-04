import { useEffect, useRef, useState } from 'react';
import logoTangara from '../assets/logo-tangara-white.svg';
import MenuJuegos from './MenuJuegos';

export default function Header() {
    const inputRef = useRef(null);
    const [focused, setFocused] = useState(false);
 
    useEffect(() => {
        const handleFocus = (e) => {
            e.preventDefault();
            setFocused(false);
        }
        const inputHidden = inputRef.current;
        if (inputHidden) {
            inputHidden.addEventListener('blur', handleFocus, { passive: false});
            return () => inputHidden.removeEventListener('blur', handleFocus);
        }
      }, [inputRef, focused]);

    return (
        <header className="bg-primary w-full">
            <div className="container mx-auto bg-primary">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} role="button" className="btn btn-ghost btn-circle swap swap-rotate">
                                <input ref={inputRef} onClick={() => setFocused(!focused)} type="checkbox" checked={focused} readOnly />
                                <svg className="swap-off stroke-white fill-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                <svg className="swap-on fill-white" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                            </label>
                            <MenuJuegos />
                        </div>
                    </div>
                    <div className="navbar-center">
                        <img className='max-h-12 2xl:max-h-16' src={logoTangara} alt='' />
                    </div>
                    <div className="navbar-end">
                        <button className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#F2F2F2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#F2F2F2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <span className="badge badge-xs badge-info indicator-item"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
