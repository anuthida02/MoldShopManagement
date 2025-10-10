import { Avatar, Box, Divider, Drawer, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuComponent from '../../components/main/menu.toolbar'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DensityMedium } from '@mui/icons-material';
import { logout } from '../../store/loginSlice';
import type { LoginState } from '../../types/User.interface';
// import PageMenu from '../constants/page.constants';
import { toggleTheme } from '../../store/themeSlice';
import type { RootState } from '../../store/store';
import Logo_Daikin from '../../assets/image/Logo_Daikin1.png'
import PageMenu from './PageMenu';



function ToolbarComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const BASE = import.meta.env.VITE_BASE;
    const imgpath = import.meta.env.VITE_IMAGEPATH;
    const projectName = import.meta.env.VITE_PORJECT_NAME;
    const empdata = useSelector((state: any) => state.login.user);
    const empcode = empdata.code;
    const [openMenu, setOpenMenu] = React.useState<null | HTMLElement>(null);
    const open = Boolean(openMenu);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [loadAccountContent, setLoadAccountContent] = useState<boolean>(true);
    const redux: LoginState = useSelector((state: any) => state.login);
    const login = redux.isLogin;
    const theme = useSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);


    async function handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
        setOpenMenu(event.currentTarget)
    }
    async function handleCloseMenu() {
        setOpenMenu(null);
    }

    const handleLogout = () => {
        if (confirm('คุณต้องการออกจากระบบ ใช่หรือไม่ ? ')) {
            dispatch(logout());
            navigate(`../${BASE}`)
        }
    };
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };
    const handleHome = () => {
        navigate(`../${BASE}/Homepage`);
    }
    useEffect(() => {
        if (!login) {
            dispatch(logout());
            setTimeout(() => {
                navigate(`/${BASE}/login`)
            }, 500);
        } else {
            setLoadAccountContent(false);
        }
    }, [])


    return (
        <div className="h-[50px] bg-[#133E87] dark:bg-gray-800" style={{ borderBottom: '1px solid #ddd' }}>
            <Stack direction="row" justifyContent="space-between" className="h-full" alignContent="center">
                <Stack direction="row" alignItems="center" pl={2} spacing={2}>
                    <div>
                        <IconButton onClick={toggleDrawer(true)}>
                            <DensityMedium className="text-white dark:text-white" />
                        </IconButton>
                        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                            <Box width={260} role="presentation" className="flex flex-col h-full bg-[#133E87] dark:bg-gray-800">
                                <img src={Logo_Daikin} alt="Logo" className="w-full h-auto object-contain p-3" />
                                <Divider className="dark:bg-gray-300" />
                                <PageMenu theme={theme === 'dark' ? 'dark' : 'light'} />
                                <Divider className="dark:bg-gray-300" />
                                <div className="p-1 text-xs text-center text-gray-400">
                                    ©2025 Daikin Compressor Industries Ltd.
                                </div>
                            </Box>
                        </Drawer>
                    </div>

                    {/* Project Name */}
                    <Stack alignItems="center" direction="row" className="cursor-pointer select-none">
                        <Typography
                            variant="body1"
                            component="div"
                            sx={{
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                color: 'white',
                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '1rem', xl: '1rem' }
                            }}
                            onClick={handleHome}
                        >
                            {projectName}
                        </Typography>

                    </Stack>
                </Stack>

                {/* Right: Theme Toggle + User Info */}
                <Stack justifyContent="center" pr={2}>
                    {loadAccountContent ? (
                        <Skeleton variant="rounded" width={210} height={30} />
                    ) : (
                        <div className="flex items-center justify-center">
                            {/* Theme Toggle */}
                            <div className="dark:bg-gray-800 rounded-lg">
                                <button
                                    onClick={() => dispatch(toggleTheme())}
                                    className="h-10 w-10 md:h-12 md:w-12 rounded-lg p-2 cursor-pointer flex items-center justify-center"
                                >
                                    <svg className="fill-white hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                    </svg>
                                    <svg className="fill-white block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>

                            {/* User Info */}
                            <div
                                onClick={handleOpenMenu}
                                className="flex items-center gap-2 cursor-pointer select-none rounded-lg transition-all duration-200"
                            >
                                <Typography
                                    className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg"
                                    variant="body1"
                                    component="div"
                                    sx={{
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        color: 'white',
                                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '1rem', xl: '1rem' }
                                    }}
                                >
                                    {login ?
                                        `${empdata.name}${empdata.surn.substring(0, 1)}`
                                        :
                                        "######"
                                    }
                                </Typography>
                                <Avatar
                                    sx={{ width: 36, height: 36, border: "1px solid #00a0e4" }}
                                    src={`${imgpath}${empcode}.jpg`}
                                />
                            </div>
                        </div>
                    )}
                </Stack>
            </Stack>

            <MenuComponent
                open={open}
                openMenu={openMenu}
                closeMenu={handleCloseMenu}
                handleOpenMenu={handleOpenMenu}
                logout={handleLogout}
            />
        </div>
    );

}

export default ToolbarComponent