import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './page/loginPage'
import Layout from "./layout/layout";
import Home from './page/homePage';
import PmList  from './page/Preventive/pmList';
import PmPlan from './page/Preventive/pmPlan';
import PmHistory from './page/Preventive/pmHistory';
const BASE = import.meta.env.VITE_BASE;


const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={`${BASE}`} element={<Home />} />
                    <Route path={`${BASE}/Preventive/:pagetype/Plan`} element={<PmPlan />} />
                    <Route path={`${BASE}/Preventive/:pagetype/List`} element={<PmList />} />
                    <Route path={`${BASE}/Preventive/:pagetype/History`} element={<PmHistory />} />
                </Route>
                <Route path={`${BASE}`} element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers