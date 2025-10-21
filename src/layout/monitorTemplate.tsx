
import { Outlet } from 'react-router-dom';
function monitorTemplate() {
    return (
        <div className="h-screen flex flex-col font-sans">
            <div className="h-full">
                <Outlet />
            </div>
        </div>
    )
}

export default monitorTemplate