import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Route, Routes, useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import BookIcon from '@mui/icons-material/Book';
import AddBook from "./addbook"
import GetUser from "./getuser";
import UserRegister from "./adduser";
import Home from './home'
import EditUser from "../adminScreen/edituser"
import EditBook from "./editbook";
import my_img from '../asset/images/my_img.png'
import Dashboard from "./dashboard";
import Orders from "./orders";
import Blogs from "./blogs";
import Testimonials from "./testimonials";
import About from "./about";
import States from './states';
import Faqs from './faqs';
// import Logout from './logout';
import Setting from './setting';





const drawerWidth = 240;
function DashboardPage(props) {


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        navigate('/');
    };

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [pagesArr, setPagesArr] = React.useState([
        {
            name: "Dashboard",
            route: "dashboard",
            icon: <HomeIcon />,
        },
        {
            name: "User",
            route: "getuser",
            icon: <AccountBoxIcon />,
        },

        {
            name: "Books",
            route: "book",
            icon: <MenuBookIcon />,
        },

        {
            name: "Orders",
            route: "orders",
            icon: <ShoppingCartCheckoutIcon />,
        },
        {
            name: "Blogs",
            route: "blogs",
            icon: <BookIcon />,
        },
        {
            name: "Testimonials",
            route: "testimonials",
            icon: <ReviewsIcon />,
        },
        {
            name: "About Us",
            route: "about",
            icon: < InfoIcon />,
        },
        {
            name: "States",
            route: "states",
            icon: < MyLocationIcon />,
        },
        {
            name: "Faqs",
            route: "faqs",
            icon: < SmsFailedIcon />,
        },

        {
            name: "Setting",
            route: "setting",
            icon: < SettingsIcon />,
        },
        {
            name: "Logout",
            // onClick: handleLogout(),
            icon: <LogoutIcon />,
        },
    ]);




    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const openPage = (route) => {
        navigate(`${route}`);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {pagesArr.map((x, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => openPage(x.route)}>
                            <ListItemIcon>{x.icon ? x.icon : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={x.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
    const container =
        window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar className="bg-gradient-to-r from-cyan-500 to-blue-500">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography noWrap component="div">
                        Admin
                    </Typography>
                    <img className="cursor-pointer"
                        src={my_img}
                        alt="Admin"
                        style={{ marginLeft: '10px', width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Routes>
                    <Route path="getuser" element={<GetUser />} />
                    <Route path="addbook" element={<AddBook />} />
                    <Route path="book" element={<Home />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="testimonials" element={<Testimonials />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="adduser" element={<UserRegister />} />
                    <Route path="setting" element={<Setting />} />
                    <Route path="states" element={<States />} />
                    <Route path="faqs" element={<Faqs />} />
                    <Route path="about" element={<About />} />
                    {/* <Route path="logout" element={<Logout />} /> */}
                    <Route path="updateuser/:id" element={<EditUser />} />
                    <Route path="updatebook/:id" element={<EditBook />} />


                </Routes>
            </Box>
        </Box>
    );
}
DashboardPage.propTypes = {
    window: PropTypes.func,
};
export default DashboardPage;
