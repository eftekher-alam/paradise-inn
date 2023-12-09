import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BsDot } from 'react-icons/bs';
import "./NavBar.css";


const NavBar = () => {
    const { user, loggOut, loading } = useContext(AuthContext);
    const location = useLocation();

    // console.log("User info from navbar", user);

    const handlerLogOut = () => {
        loggOut();
    }


    return (
        <div>
            <div className={`navbar shadow-lg background border-b h-24`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost xl:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-marcellus">
                            <li><NavLink to={"/"}>HOME</NavLink></li>
                            <li><NavLink to={"/rooms"}>ROOMS</NavLink></li>
                            <li><NavLink to={"/myBookings"}>MY BOOKING</NavLink></li>
                            <li><NavLink to={"/about_us"}>ABOUT US</NavLink></li>
                        </ul>
                    </div>
                    <div className="max-xl:hidden dropdown dropdown-end">
                        <ul className="menu-horizontal pl-8 text-white font-marcellus gap-4">
                            <li><NavLink to={"/"}>HOME</NavLink></li>
                            <li><NavLink to={"/rooms"}>ROOMS</NavLink></li>
                            <li><NavLink to={"/myBookings"}>MY BOOKING</NavLink></li>
                            <li><NavLink to={"/about_us"}>ABOUT US</NavLink></li>
                        </ul>
                    </div>
                </div>

                <div className="navbar-center lg:flex">

                    <div className="flex flex-col justify-center items-center dropdown dropdown-end">
                        <Link to={"/"}
                            className="marcellus text-white text-lg md:text-3xl tracking-wide md:tracking-widest font-bold">Paradise Inn<BsDot className="inline -ml-1 md:-ml-3 -mb-1 md:-mb-2" ></BsDot></Link>
                        <div className="rating rating-xs space-x-3 -ml-3">
                            <input className="mask mask-star-2 bg-orange-400" disabled />
                            <input className="mask mask-star-2 bg-orange-400" disabled />
                            <input className="mask mask-star-2 bg-orange-400" disabled />
                            <input className="mask mask-star-2 bg-orange-400" disabled />
                            <input className="mask mask-star-2 bg-orange-400" disabled />
                        </div>
                    </div>
                </div>

                <div className="navbar-end lg:mr-8 gap-1 md:gap-4">
                    <div className="marcellus text-white dropdown dropdown-end md:hidden">Phone: (+880) 1518 79 07 38</div>
                    <div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="mt-3 z-50 card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body">
                                    <span className=" text-lg">{0} Items</span>
                                    <span className="">
                                        Subtotal:
                                        <span className="font-medium"> $ {0}</span>
                                    </span>
                                    <div className="card-actions">
                                        <Link to={"/cart"} className="btn btn-sm btn-outline btn-block ">View cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {
                            user ?
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            {
                                                user?.photoURL ?
                                                    <img src={user?.photoURL} />
                                                    :
                                                    <img src="https://i.ibb.co/8sQW4sR/user.png" />
                                            }
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
                                        <li className="p-2">
                                            <h4 className="font-medium">{user?.displayName}</h4>
                                            <h4 className="text-sm ">{user?.email}</h4>
                                        </li>
                                        <div className="menu menu-sm">
                                            <li><a>Settings</a></li>
                                            <li><button onClick={handlerLogOut}>Logout</button></li>
                                        </div>
                                    </ul>
                                </div>
                                :
                                !loading && <div className="dropdown dropdown-end">
                                    <Link to={"/login"} state={location.pathname} className="active text-white font-marcellus max-md:text-xs">Log In</Link>
                                </div>
                        }
                    </div>


                </div>
            </div >
        </div>
    );
};

export default NavBar;