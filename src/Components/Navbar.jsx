import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faPowerOff,
  faHeart,
  faBars,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "../features/userSlice";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
import { SideDrawer } from "./SideDrawer";
const menuItems = [
  {
    label: "My Profile",
    icon: faHome,
    link: "/user/profile",
  },
  {
    label: "Sign Out",
    icon: faPowerOff,
  },
];

const adminMenu = [
  {
    label: "Admin Menu",
    icon: faHome,
    link: "/adminPage",
  },

  {
    label: "Sign Out",
    icon: faPowerOff,
  },
];



export default function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggleDrawer = () => setOpen(!open);
  const closeDrawer = () => setOpen(false);

  const handleMenuItemClick = (label, link) => {
    if (link) {
      nav(link);
    }

    if (label === "Sign Out") {
      nav("/", { replace: true });
      dispatch(clearAll());
      toast.success("You are signed out");
    }

    closeDrawer();
  };

  const menu = user?.isAdmin ? adminMenu : menuItems;

  return (
    <nav className="bg-teal-600 flex text-white">
      <div className="flex justify-between p-3 items-center w-full">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <button onClick={toggleDrawer} className="md:hidden pr-4">
              <FontAwesomeIcon icon={faBars} size="2x" />
            </button>
            <span className="self-center text-2xl font-semibold whitespace-nowrap md:text-xl lg:text-2xl md:pr-10">
              Pipal Nursery
            </span>
          </Link>
        </div>

        <div className="md:hidden flex">
          <SideDrawer user={user} handleMenuItemClick={handleMenuItemClick} closeDrawer={closeDrawer} open={open}/>
        </div>

        <div className=" md:flex md:justify-end">
          <ul className=" hidden md:flex flex-col font-medium md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row text-xl md:mt-0 md:border-0">
            <li>
              <Link to="/" className="block py-2 pl-3 pr-4 text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/plants" className="block py-2 pl-3 pr-4 text-white">
                Plants
              </Link>
            </li>
            <li>
              <Link
                to="/accessories"
                className="block py-2 pl-3 pr-4 text-white"
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link to="#" className="block py-2 pl-3 pr-4 text-white">
                Projects
              </Link>
            </li>
            <SearchBar />
          </ul>

          <div className="flex flex-1 justify-end ">
            <div className="p-3 hidden md:flex space-x-6">
              <button onClick={() => handleMenuItemClick("Cart", "/user/cart")}>
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
              <button
                onClick={() =>
                  handleMenuItemClick("Wishlist", "/user/wishlist")
                }
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
            {user === null && (
              <button
                onClick={() => nav("/login")}
                className="text-xl md:flex md:pt-2"
              >
                Sign In
              </button>
            )}

            <div className="flex ">
              {user !== null && (
                <Menu>
                  <MenuHandler>
                    <Avatar
                      variant="circular"
                      alt="image"
                      className="cursor-pointer"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                  </MenuHandler>
                  <MenuList className="p-1">
                    {menu.map(({ label, icon, link }) => (
                      <MenuItem
                        key={label}
                        onClick={() => handleMenuItemClick(label, link)}
                        className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      >
                        <FontAwesomeIcon icon={icon} />
                        <Typography
                          as="span"
                          variant="small"
                          className="font-normal"
                          color={label === "Sign Out" ? "red" : "inherit"}
                        >
                          {label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
