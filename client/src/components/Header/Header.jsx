import React, { useRef, useEffect } from "react";
import "./header.css";
import { Container } from "reactstrap";

import { NavLink, Link } from "react-router-dom";
import { useBlockchainContext } from "../../context/BlockchainContext";

const NAV__LINKS = [
  {
    display: "Home",
    url: "/home",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "MyNFTs",
    url: "/mynfts",
  },
  {
    display: "Create",
    url: "/create",
  },
  {
    display: "Contact",
    url: "/contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const menuRef = useRef(null);

  const { currentAccount } = useBlockchainContext();

useEffect(() => {
  const handleScroll = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("header__shrink");
    } else {
      headerRef.current.classList.remove("header__shrink");
    }
  };

  window.addEventListener("scroll", handleScroll); // Add event listener

  return () => {
    window.removeEventListener("scroll", handleScroll); // Remove the event listener
  };
}, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  // const handleNavLinkClick = (url, display) => {
  //   if (!currentAccount && (display === "MyNFTs" || display === "Create")) {
  //     toast.error("Please connect your wallet to proceed.");
  //   } else {
  //     window.location.href = url;
  //   }
  // };
  const formatAddress = (address) => {
    if (address) {
      const firstPart = address.slice(0, 6);
      const lastPart = address.slice(-4);
      return `${firstPart}...${lastPart}`;
    }
    return "";
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i className="ri-fire-fill"></i>
              </span>
              NFTs
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                   <NavLink
                    to={item.url}
                    className={(navClass) => (navClass.isActive ? "active" : "")}
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
          {currentAccount ? (
            <button className="btn d-flex gap-2 align-items-center">
            <span>
              <i className="ri-wallet-line"></i>
            </span>
            <Link to="/wallet">{formatAddress(currentAccount)}</Link>
          </button>
            ) : (
              <button className="btn d-flex gap-2 align-items-center">
                <span>
                  <i className="ri-wallet-line"></i>
                </span>
                <Link to="/wallet">Connect Wallet</Link>
              </button>
            )}

            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
