import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBars, faCartShopping, faHeart, faHome, faPlantWilt, faSeedling, faTools, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { faRProject } from "@fortawesome/free-brands-svg-icons";


const drawerMenu = [
  {
    label: "Home",
    icon: faHome,
    link: "/",
  },
  {
    label: "Plants",
    icon: faPlantWilt,
    link: "/plants",
  },
  {
    label: "accessories",
    icon: faSeedling,
    link: "/accessories",
  },
  {
    label: "projects",
    icon: faRProject,
    // link: "/projects",
  },

  {
    label: "Wishlist",
    icon: faHeart,
    link: "/user/wishlist",
  },
  {
    label: "Cart",
    icon: faCartShopping,
    link: "/user/cart",
  },
];

export function SideDrawer({user,open,closeDrawer, handleMenuItemClick}) {


  const nav = useNavigate();

  return (
    <>
      <Drawer open={open} onClose={closeDrawer} className="w-92">
            <div className="mb-2 flex items-center justify-between p-4">
              <Typography variant="h5" color="blue-gray">
                Pipal Nursery
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawer}
              >
                <FontAwesomeIcon icon={faXmark} size="2x" />
              </IconButton>
            </div>
            <List>
              {drawerMenu.map(({ label, icon, link }) => (
                <ListItem
                  key={label}
                  onClick={() => handleMenuItemClick(label, link)}
                >
                  <ListItemPrefix>
                    <FontAwesomeIcon icon={icon} />
                  </ListItemPrefix>
                  {label}
                </ListItem>
              ))}
              {user === null && (
                <ListItem
                  onClick={() => {
                    nav("/login");
                    closeDrawer();
                  }}
                >
                  <ListItemPrefix>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </ListItemPrefix>
                  Sign In
                </ListItem>
              )}
            </List>
          </Drawer>
    </>
  );
}
