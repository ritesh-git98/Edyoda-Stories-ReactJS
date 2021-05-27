import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLoggedIn, educatorLoggedIn, storeUserData } from "../../globalStore/store";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import PublishIcon from '@material-ui/icons/Publish';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);


const Navbar = ({
    userLoginStatus,
    educatorLoginStatus,
    userLogged,
    educatorLogged,
    getUser,
    setUser
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleResponsiveClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleResponsiveClose = () => {
        setAnchorEl(null);
    };
    const history = useHistory();
    const logout = () => {
        handleResponsiveClose();
        if (getUser.role === "Learner") {
            userLoginStatus(false);
        } else {
            educatorLoginStatus(false);
        }
        setUser({});
        let path = `login`;
        history.push(path);
    };
    return (
        <nav>
            <div className="Topbar__Topbar__3Rg8U Topbar__Light__1gpMJ">
                <a className="Topbar__Logo__lSAmV " href="/">
                    <div>
                        <div className="Logo__Logo__2isxd Logo__Light__2EwPM">EDYODA</div>
                    </div>
                </a>
                <div className="NavigationLinks__NavigationLinks__1jolz NavigationLinks__Light__3h2pd">
                    <ul className="NavigationLinks__NonMobileOnly__1lJ7T NavigationLinks__NavigationLink__2hqo3">
                        <li>
                            <div className="NavigationLink__NavigationLink__1T2UX NavigationLink__Light__1Cx_-">
                                <div>
                                    <div className="NavigationLink__HorizontalAlign__s1BGI">
                                        Courses
                                        <span>
                                            <img
                                                className="NavigationLink__DropdownArrow__3bYcE"
                                                alt="Dropdown Icon"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHhJREFUeNpiYGBguAPE/f///2fAh0FqgPguiBEDxC+BeDUQM2NRyAyVewlWCxW0B+L7QHwAiHmRFPNCxUBy9mAxJElVIL4MxBeBWB6KL0LFVOHq0KwXAuJDQHwPikFsIWQ1jFCFcMDIyMgGpFZAuRFA+V/I8gABBgD8EGd4shdx5wAAAABJRU5ErkJggg=="
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="NavigationLink__NavigationLink__1T2UX NavigationLink__Light__1Cx_-">
                                <a
                                    href="https://university.edyoda.com/"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    University
                                </a>
                            </div>
                        </li>
                    </ul>
                    <ul className="NavigationLinks__RightEndMenus__m2UeA ">
                        {(userLogged == "true") || (educatorLogged == "true") ? (
                            <li className="NavigationLinks__LoginButton__vfcTS NavigationLinks__NonMobileOnly__1lJ7T">
                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    <AccountCircleIcon fontSize="large" className=" Button__TextOnlyButtonDark__142qk acoountIcon" />
                                </Button>
                                <StyledMenu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <StyledMenuItem
                                        onClick={handleResponsiveClose}
                                    >
                                        <Link className="redirectAnchor" to="/profile">
                                            <ListItemIcon>
                                                <PersonIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Profile" />
                                        </Link>
                                    </StyledMenuItem>
                                    {(getUser.role === "Educator") ?
                                        <StyledMenuItem onClick={handleClose}>
                                            <Link className="redirectAnchor" to="/upload">
                                                <ListItemIcon>
                                                    <PublishIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Upload" />
                                            </Link>
                                        </StyledMenuItem>
                                        :
                                        ""
                                    }
                                    <StyledMenuItem onClick={handleResponsiveClose, logout}>
                                        <ListItemIcon>
                                            <ExitToAppIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </StyledMenuItem>
                                </StyledMenu>
                            </li>
                        ) : (
                            <div>
                                <li className="NavigationLinks__LoginButton__vfcTS NavigationLinks__NonMobileOnly__1lJ7T">
                                    <Link to="/login">
                                        <button
                                            id="login-navbar"
                                            className="Button__Button__QI7b2 Button__TextOnlyButtonDark__142qk "
                                        >
                                            Log In
                                        </button>
                                    </Link>
                                </li>
                                <li className="NavigationLinks__SignupButton__3Avpf NavigationLinks__NonMobileOnly__1lJ7T">
                                    <Link to="/signup">
                                        <button
                                            id="signup-navbar"
                                            className="Button__Button__QI7b2 "
                                        >
                                            Sign Up For Free
                                        </button>
                                    </Link>
                                </li>
                            </div>
                        )}
                        <li className="NavigationLinks__SidebarToggle__38YVc">
                            <Button
                                aria-controls="responsive-menu"
                                aria-haspopup="true"
                                onClick={handleResponsiveClick}
                            >
                                <MenuIcon fontSize="large" />
                            </Button>
                            <StyledMenu
                                id="responsive-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleResponsiveClose}
                            >
                                {(userLogged == "true" || educatorLogged == "true") ?
                                    (<div>
                                        <StyledMenuItem
                                            onClick={handleResponsiveClose}
                                        >
                                            <Link className="redirectAnchor" to="/profile">
                                                <ListItemIcon>
                                                    <PersonIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Profile" />
                                            </Link>
                                        </StyledMenuItem>
                                        {
                                            (getUser.role === "Educator") ?
                                                <StyledMenuItem onClick={handleClose}>
                                                    <Link className="redirectAnchor" to="/upload">
                                                        <ListItemIcon>
                                                            <PublishIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Upload" />
                                                    </Link>
                                                </StyledMenuItem>
                                                :
                                                ""
                                        }
                                        <StyledMenuItem onClick={logout}>
                                            <ListItemIcon>
                                                <ExitToAppIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Logout" />
                                        </StyledMenuItem>
                                    </div>)
                                    :
                                    (<div>
                                        <StyledMenuItem onClick={handleResponsiveClose}>
                                            <Link className="redirectAnchor" to="/profile">
                                                <ListItemIcon>
                                                    <VpnKeyIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Login" />
                                            </Link>
                                        </StyledMenuItem>
                                        <StyledMenuItem onClick={handleResponsiveClose}>
                                            <Link className="redirectAnchor" to="/profile">
                                                <ListItemIcon>
                                                    <PersonAddIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Signup" />
                                            </Link>
                                        </StyledMenuItem>
                                    </div>)
                                }
                            </StyledMenu>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
};

const mapStateToProps = store => ({
    userLogged: store?.userLogin,
    educatorLogged: store?.educatorLogin,
    getUser: store?.userData
});
const mapDispatchToProps = dispatch => ({
    userLoginStatus: data => dispatch(userLoggedIn(data)),
    educatorLoginStatus: data => dispatch(educatorLoggedIn(data)),
    setUser: data => dispatch(storeUserData(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
