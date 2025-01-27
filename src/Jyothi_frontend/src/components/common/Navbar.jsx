import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaGraduationCap } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import './Navbar.css';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 150px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 2rem;
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #6366f1;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #6366f1;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active::after {
    width: 100%;
  }
`;

const ConnectButton = styled.button`
  background-color:transparent;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #4f46e5;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;


const Navbar = () => {
  const location = useLocation();
  const [principal, setPrincipal] = useState(null);

  async function handleConnect() {
     const authClient = await AuthClient.create();
     authClient.login({
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: async () => {
           const identity = await authClient.getIdentity();
           const principal = identity.getPrincipal().toText(); // Extract principal as text
           setPrincipal(principal);
           localStorage.setItem("principal",principal);
        },
     });
  }

  useEffect(() => {
     async function init() {
        const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
           const identity = await authClient.getIdentity();
           const principal = identity.getPrincipal().toText();
           setPrincipal(principal);
           localStorage.setItem("principal",principal);
        }
     }
     init();
  }, []);

  async function handleLogout() {
   const authClient = await AuthClient.create();
   authClient.logout(); 
   setPrincipal("");
   localStorage.removeItem("principal");
   navigate('/');
 }

  return (
    <>
      <Nav>
        <NavContent>
          <Logo to="/">
            <FaGraduationCap />
            EduPlatform
          </Logo>
          <NavLinks>
            <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </NavLink>
            <NavLink to="/register" className={location.pathname === '/register' ? 'active' : ''}>
              Student Register
            </NavLink>
            <NavLink to="/Organiza_Register" className={location.pathname === '/Organiza_Register' ? 'active' : ''}>
              Organization Register
            </NavLink>

          </NavLinks>
        </NavContent>
        <p id="connectbtn">
          {principal ? (
            <ConnectButton onClick={handleLogout}>Disconnect</ConnectButton>
          ) : (
            <ConnectButton onClick={handleConnect}>Connect</ConnectButton>
          )}
        </p>
      </Nav>
    </>
  );
};
export default Navbar;