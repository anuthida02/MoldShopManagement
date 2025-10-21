import { Assignment, BarChart, Build, History, Home, ListAlt, PrecisionManufacturing, Settings, InfoOutline } from "@mui/icons-material";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];
const BASE = import.meta.env.VITE_BASE;

const withMenuIcon = (Icon: React.ElementType) => {
    return <span className="text-[20px] font-blod" style={{ color: 'white' }}><Icon /></span>;
};

const items: MenuItem[] = [
    {
        key: `${BASE}`,
        label: 'Home',
        icon: withMenuIcon(Home),
    },
    {
        key: 'Machine',
        label: 'Machine',
        icon: withMenuIcon(PrecisionManufacturing),
        children: [
            { key: `${BASE}/Machine/Master`, label: 'Machine Data', icon: withMenuIcon(Assignment) },
            { key: `${BASE}/MachineReport`, label: 'Mainchine Report', icon: withMenuIcon(BarChart) },
            
        ],
    },
    {
        key: `Mold & Die`,
        label: 'Mold & Die',
        icon: withMenuIcon(Build),
        children: [
            { key: `${BASE}/MoldDie/Master`, label: 'Mold & Die Master', icon: withMenuIcon(Assignment) },
            { key: `${BASE}/MoldDie/Boommaster`, label: 'Boom Master', icon: withMenuIcon(InfoOutline)}
        ],
    },
    {
        key: `Preventive Mainternance`,
        label: 'Preventive Mainternance',
        icon: withMenuIcon(Settings),
        children: [
            // {
            //     key: `${BASE}/Preventive/Machine`, label: 'PM Machine', icon: withMenuIcon(PrecisionManufacturing),
            //     children: [
            //         { key: `${BASE}/Preventive/Machine/Plan`, label: 'Preventive Plan', icon: withMenuIcon(Assignment), },
            //         { key: `${BASE}/Preventive/Machine/List`, label: 'Preventive List', icon: withMenuIcon(ListAlt), },
            //         { key: `${BASE}/Preventive/Machine/History`, label: 'Preventive History', icon: withMenuIcon(History), },
            //     ],
            // },
            {
                key: `${BASE}/Preventive/MoldDie`, label: 'PM Mold & Die', icon: withMenuIcon(Build),
                children: [
                    { key: `${BASE}/Preventive/MoldDie/PMStandard`, label: 'Preventive Standard', icon: withMenuIcon(ListAlt), },
                    { key: `${BASE}/Preventive/MoldDie/Plan`, label: 'Preventive Plan', icon: withMenuIcon(Assignment), },
                    { key: `${BASE}/Preventive/MoldDie/List`, label: 'Preventive List', icon: withMenuIcon(ListAlt), },
                    { key: `${BASE}/Preventive/MoldDie/PlanMonitor`, label: 'Plan Monitor', icon: withMenuIcon(ListAlt), },
                    { key: `${BASE}/Preventive/MoldDie/History`, label: 'Preventive History', icon: withMenuIcon(History), },
                ],
            },
        ],
    },
];


const PageMenu = ({ theme }: { theme: 'light' | 'dark' }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick: MenuProps["onClick"] = (e) => {
        navigate(e.key);
    };

    const currentPath = location.pathname;
    const pathParts = currentPath.split("/").filter(Boolean);
    const openKeys: string[] = [];
    for (let i = 1; i <= pathParts.length; i++) {
        openKeys.push(`/${pathParts.slice(0, i).join("/")}`);
    }

    return (
        <Menu
            mode="inline"
            theme={theme}
            items={items}
            onClick={handleClick}
            selectedKeys={[currentPath]}
            defaultOpenKeys={openKeys}
            rootClassName="custom-menu"
            style={{
                border: 'none',
                flex: 1,
                overflowY: 'auto',
                backgroundColor: theme === 'dark' ? '#1f2937' : '#133E87',
                color: '#608BC1',
            }}
        />

    );
};

export default PageMenu;
