import LoginPage from '../page/Main/loginPage';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Breadcrumbs from '../components/main/Breadcrumbs';
import Toolbar from '../components/main/Toolbar';
import type { RootState } from '../store/store';
//import PageMenu from '../constants/page.constants';
import { useEffect } from 'react';

function Layout() {
    const { isLogin } = useSelector((state: RootState) => state.login);
    const theme = useSelector((state: RootState) => state.theme.theme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return isLogin ? (
        <div className="h-screen flex flex-col font-sans">
            <Toolbar />
            <div className="flex-1 bg-[#fdfdfd] pt-4 pb-6 px-5 flex flex-col min-h-0 dark:bg-gray-800">
                <div className="flex-1 bg-white border border-gray-300 dark:bg-gray-800  rounded-md p-3 min-h-0 overflow-hidden">
                    <div className="h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <LoginPage />
    );
}

export default Layout;
