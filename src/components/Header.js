import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillDashboard } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";

const Header = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState({
    report: false,
    settings: false
  });
  const reportRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reportRef.current && !reportRef.current.contains(event.target)) {
        setShowDropdown(prevState => ({ ...prevState, report: false }));
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowDropdown(prevState => ({ ...prevState, settings: false }));
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowDropdown({
          report: false,
          settings: false
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  const handleDropdown = (dropdown) => {
    setShowDropdown(prevState => ({
      ...prevState,
      [dropdown]: !prevState[dropdown]
    }));
  };

  return (
    <div>
      <nav className="bg-custom-color p-4 relative">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="text-white text-xl font-bold flex items-center " to="/">
            PRODUCT ADMIN
          </Link>
          <div className="lg:hidden relative">
            <button className="text-white" onClick={handleToggleMenu}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-full left-0 bg-gray-800 p-4 mt-2 w-48 z-10">
                <div className="flex flex-col space-y-2">
                  {isLoggedIn ? (
                    <>
                      <Link className="text-white flex items-center hover:text-orange-300" to="/dashboard">
                        <AiFillDashboard className="mr-2" />
                        Dashboard
                      </Link>
                      <div ref={reportRef} className="relative">
                        <button
                          className="text-white flex items-center justify-between focus:outline-none hover:text-orange-300"
                          onClick={() => handleDropdown('report')}
                        >
                          <div className="flex items-center">
                            <TbReportSearch className="mr-2" />
                            <span>Reports</span>
                          </div>
                          <IoIosArrowDown />
                        </button>
                        {showDropdown.report && (
                          <div className="absolute top-full left-0 mt-2 py-2 w-48 bg-custom-color rounded-lg shadow-xl">
                            <Link
                              className="block px-4 py-2 text-white hover:text-orange-300"
                              to="/report/daily"
                            >
                              Daily Report
                            </Link>
                            <Link
                              className="block px-4 py-2 text-white hover:text-orange-300"
                              to="/report/weekly"
                            >
                              Weekly Report
                            </Link>
                            <Link
                              className="block px-4 py-2 text-white hover:text-orange-300"
                              to="/report/monthly"
                            >
                              Monthly Report
                            </Link>
                          </div>
                        )}
                      </div>
                      <Link className="text-white flex items-center hover:text-orange-300" to="/product">
                        <FaShoppingCart className="mr-2"/>  
                        Product
                      </Link>
                      <Link className="text-white flex items-center hover:text-orange-300" to="/accounts">
                        <FaRegUser className="mr-2"/>
                        Accounts
                      </Link>
                      <div ref={settingsRef} className="relative">
                        <button
                          className="text-white flex items-center justify-between focus:outline-none hover:text-orange-300"
                          onClick={() => handleDropdown('settings')}
                        >
                          <div className="flex items-center">
                            <IoMdSettings className="mr-2" />
                            <span>Settings</span>
                          </div>
                          <IoIosArrowDown />
                        </button>
                        {showDropdown.settings && (
                          <div className="absolute top-full left-0 mt-2 py-2 w-48 bg-custom-color rounded-lg shadow-xl">
                            <Link
                              className="block px-4 py-2 text-white hover:text-orange-300"
                              to="/settings/profile"
                            >
                              Profile
                            </Link>
                            <Link
                              className="block px-4 py-2 text-white hover:text-orange-300"
                              to="/settings/billing"
                            >
                              Billing
                            </Link>
                            <Link
                              className="block px-4 py-2 text-white hover:text-orange-300"
                              to="/settings/customize"
                            >
                              Customize
                            </Link>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <Link className="text-white" to="/">Login</Link>
                  )}
                  {isLoggedIn && (
                    <Link className="text-white" onClick={handleLogoutClick}>Admin,Logout</Link>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="hidden lg:flex lg:justify-center lg:flex-1">
            {isLoggedIn ? (
              <>
                <Link className="text-white flex flex-col items-center mx-5 hover:text-orange-300 font-light " to="/dashboard">
                  <AiFillDashboard className="size-7 mb-1" />
                  Dashboard
                </Link>
                <div ref={reportRef} className="relative">
                  <button
                    className="text-white flex items-center justify-between mx-5 hover:text-orange-300 font-light focus:outline-none"
                    onClick={() => handleDropdown('report')}
                  >
                    <div className="flex items-center flex-col">
                      <TbReportSearch className="size-7 mb-1" />
                      <span>Reports</span>
                    </div>
                    <IoIosArrowDown className="mt-8 "/>
                  </button>
                  {showDropdown.report && (
                    <div className="absolute top-full left-0 mt-2 py-2 w-48 bg-custom-color shadow-xl dropdown-right-margin">
                      <Link
                        className="block px-4 py-2 text-white hover:text-orange-300"
                        to="/report/daily"
                      >
                        Daily Report
                      </Link>
                      <Link
                        className="block px-4 py-2 text-white hover:text-orange-300"
                        to="/report/weekly"
                      >
                        Weekly Report
                      </Link>
                      <Link
                        className="block px-4 py-2 text-white hover:text-orange-300"
                        to="/report/monthly"
                      >
                        Monthly Report
                      </Link>
                    </div>
                  )}
                </div>
                <Link className="text-white flex flex-col items-center mx-5 hover:text-orange-300 font-light" to="/product">
                  <FaShoppingCart className="size-7 mb-1" />  
                  Product
                </Link>
                <Link className="text-white flex flex-col items-center mx-5 hover:text-orange-300 font-light" to="/accounts">
                  <FaRegUser className="size-7 mb-1" />
                  Accounts
                </Link>
                <div ref={settingsRef} className="relative">
                  <button
                    className="text-white flex items-center justify-between mx-5 hover:text-orange-300 font-light focus:outline-none"
                    onClick={() => handleDropdown('settings')}
                  >
                    <div className="flex items-center flex-col">
                      <IoMdSettings className="size-7 mb-1" />
                      <span>Settings</span>
                    </div>
                    <IoIosArrowDown className="mt-8 "/>
                  </button>
                  {showDropdown.settings && (
                    <div className="absolute top-full left-0 mt-2 py-2 w-48 bg-custom-color shadow-xl dropdown-right-margin">
                      <Link
                        className="block px-4 py-2 text-white hover:text-orange-300"
                        to="/settings/profile"
                      >
                        Profile
                      </Link>
                      <Link
                        className="block px-4 py-2 text-white hover:text-orange-300"
                        to="/settings/billing"
                      >
                        Billing
                      </Link>
                      <Link
                        className="block px-4 py-2 text-white hover:text-orange-300"
                        to="/settings/customize"
                      >
                        Customize
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link className="text-white mx-4" to="/">Login</Link>
            )}
          </div>
          <div className="hidden lg:flex">
            {isLoggedIn && (
              <Link className="text-white hover:text-orange-300" onClick={handleLogoutClick}>Admin,Logout</Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
