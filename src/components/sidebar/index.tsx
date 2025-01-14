import * as React from "react";
import homeIcon from "@/assets/icons/home.svg";
import addIcon from "@/assets/icons/add.svg";
import directIcon from "@/assets/icons/direct.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import myPhotosIcon from "@/assets/icons/myPhotos.svg";
import notificationIcon from "@/assets/icons/notification.svg";
import profileIcon from "@/assets/icons/profile.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { useUserAuth } from "@/context/userAuthContext";

interface ISidebarProps {
  // Add props here if needed
}

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: homeIcon,
  },
  {
    name: "Add Photos",
    link: "/post",
    icon: addIcon,
  },
  {
    name: "My Photos",
    link: "/myphotos",
    icon: myPhotosIcon,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: profileIcon,
  },
  // FUTURE FEATURES
  // {
  //   name: "Notifications",
  //   link: "#",
  //   icon: notificationIcon,
  // },
  // {
  //   name: "Direct",
  //   link: "#",
  //   icon: directIcon,
  // },
  // {
  //   name: "Settings",
  //   link: "#",
  //   icon: settingsIcon,
  // },
];

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
  const { pathname } = useLocation();
  const { logOut } = useUserAuth();

  return (
    <nav className="flex flex-col relative h-screen max-w-sm w-full">
      <div className="flex justify-center m-5">
        <div className="text-white text-lg">JanToGram</div>
      </div>
      {navItems.map((item) => {
        return (
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              pathname === item.link
                ? "bg-white text-white-800 hover:bg-white rounded-none"
                : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
              "justify-start"
            )}
            key={item.name}
          >
            <Link to={item.link} className="flex">
              <span>
                <img
                  src={item.icon}
                  className="w-5 h-5 mr-2"
                  alt="icon"
                  style={{
                    filter: `${
                      pathname === item.link ? "invert(0)" : "invert(1)"
                    }`,
                  }}
                />
              </span>
              <span>{item.name}</span>
            </Link>
          </div>
        );
      })}
      <div
        className={cn(
          buttonVariants({ variant: "default" }),
          pathname === "/login"
            ? "bg-white text-white-800 hover:bg-white rounded-none"
            : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
          "justify-start"
        )}
      >
        <Link to="/login" className="flex" onClick={logOut}>
          <span>
            <img
              src={logoutIcon}
              className="w-5 h-5 mr-2"
              alt="Logout"
              style={{
                filter: `${pathname === "/login" ? "invert(0)" : "invert(1)"}`,
              }}
            />
          </span>
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
