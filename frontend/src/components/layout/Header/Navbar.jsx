import logo from "../../../assets/images/logo.png";
import {
    Navbar,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Collapse,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    PowerIcon,
    Bars2Icon,
    HomeIcon,
    RectangleStackIcon,
    Square3Stack3DIcon,
    UserIcon,
    UserPlusIcon,
    ShoppingCartIcon
} from "@heroicons/react/24/solid";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../store/actions/userActions";

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const account = () => navigate("/account");
    const orders = () => navigate("/orders");
    const logoutUser = () => {
        dispatch(logout());
        navigate("/login");
    };
    const dashboard = () => navigate("/dashboard");
    // profile menu component
    const profileMenuItems = [
        {
            label: "My Profile",
            icon: UserCircleIcon,
            link: account,
        },
        {
            label: "Orders",
            icon: Bars2Icon,
            link: orders,
        },
        {
            label: "Sign Out",
            icon: PowerIcon,
            link: logoutUser,
        },
    ];

    if (user && user?.role === "admin") {
        const dashboardExists = profileMenuItems.some(
            (item) => item.label === "Dashboard"
        );
        if (!dashboardExists) {
            profileMenuItems.unshift({
                label: "Dashboard",
                icon: Square3Stack3DIcon,
                link: dashboard,
            });
        }
    }

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt={user?.name}
                        className="border border-gray-900 p-0.5"
                        src={user?.avatar?.url}
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({label, icon, link}, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => {
                                closeMenu();
                                link();
                            }}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                                onClick={link}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// nav list component
const navListItems = [
    {
        label: "Home",
        icon: HomeIcon,
        path: "/",
    },
    {
        label: "Products",
        icon: RectangleStackIcon,
        path: "/products",
    },
    {
        label: "Login",
        icon: UserIcon,
        path: "/login",
    },
    {
        label: "Signup",
        icon: UserPlusIcon,
        path: "/signup",
    },
    {
        label: "Cart",
        icon: ShoppingCartIcon,
        path: "/cart",
    },
];

function NavList() {
    const {isAuthenticated} = useSelector((state) => state.user);

    const filteredNavListItems = navListItems.filter(
        (item) =>
            !(isAuthenticated && (item.label === "Login" || item.label === "Signup"))
    );
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {filteredNavListItems.map(({label, icon, path}) => (
                <Link to={path} key={label}>
                    <Typography
                        key={label}
                        as="span"
                        variant="small"
                        color="gray"
                        className="font-medium text-blue-gray-500"
                    >
                        <MenuItem className="flex items-center gap-2 lg:rounded-full">
                            {React.createElement(icon, {className: "h-[18px] w-[18px]"})}{" "}
                            <span className="text-gray-900"> {label}</span>
                        </MenuItem>
                    </Typography>
                </Link>
            ))}
        </ul>
    );
}

export default function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);

    const navigate = useNavigate();

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (keyword.trim()) {
            navigate(`/products?keyword=${keyword}`);
        } else {
            navigate("/products");
        }
    };

    const location = useLocation();
    const {isAuthenticated} = useSelector((state) => state.user);

    return (
        <motion.div
            className="w-full h-full bg-black mt-10"
            initial={{x: "-100%", opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{type: "spring", stiffness: 50, duration: 1}}
        >
            <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 w-full">
                <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                    <Link to="/" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
                        <img className="h-8 w-auto" src={logo} alt="logo"/>
                    </Link>
                    {!location.pathname.includes("/products") && (
                        <div className="relative">
                            <form onSubmit={handleSearchSubmit}>
                                <input
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    placeholder="Laptops, Aipods ..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <button
                                    className="bg-black absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-4 mr-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Search
                                </button>
                            </form>
                        </div>
                    )}
                    <button
                        className="lg:hidden flex items-center text-gray-900"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        <Bars2Icon className="h-6 w-6"/>
                    </button>
                    <div className="hidden lg:flex items-center gap-4">
                        <NavList/>
                        {isAuthenticated && (
                            <ProfileMenu/>
                        )}
                    </div>
                </div>
                <Collapse open={isNavOpen} className="overflow-hidden">
                    <NavList/>
                    {isAuthenticated && <ProfileMenu/>}
                </Collapse>
            </Navbar>
        </motion.div>
    );
}
