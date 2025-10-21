import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './page/Main/loginPage'
import Layout from "./layout/layout";
import Home from './page/Main/homePage';
import PmList  from './page/Preventive/pmList';
import PmHistory from './page/Preventive/pmHistory';
import MdMaster from './page/MoldDie/mdMaster'
import BoomMaster from './page/MoldDie/bomMaster'
import MachineData from "./page/Machine/machineData";
import PmStandard from "./page/Preventive/pmStandard";
import PmPlan from "./page/Preventive/pmPlan";
import PMPlanMonitor from "./page/Monitor/pmPlanMonitor"
const BASE = import.meta.env.VITE_BASE;


const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={`${BASE}`} element={<Home />} />
                    <Route path={`${BASE}/MoldDie/Master`} element={<MdMaster />} />
                    <Route path={`${BASE}/MoldDie/Boommaster`} element={<BoomMaster/>} />
                    <Route path={`${BASE}/Machine/Master`} element={<MachineData />} />
                    <Route path={`${BASE}/Preventive/:pagetype/Plan`} element={<PmPlan />} />
                    <Route path={`${BASE}/Preventive/:pagetype/List`} element={<PmList />} />
                    <Route path={`${BASE}/Preventive/:pagetype/History`} element={<PmHistory />} />
                    <Route path={`${BASE}/Preventive/:pagetype/PMStandard`} element={<PmStandard />} />
                    <Route path={`${BASE}/Preventive/:pagetype/PlanMonitor`} element={<PMPlanMonitor />} />
                </Route>
                <Route>

                </Route>
                <Route path={`${BASE}`} element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers