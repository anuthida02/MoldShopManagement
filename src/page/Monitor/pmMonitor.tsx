import { ResponsiveContainer, Tooltip } from "recharts"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Wrench, AlertTriangle, DollarSign, Layers } from "lucide-react";


function PMMonitor() {

    const data = [
        { month: "Jan", cost: 120000 },
        { month: "Feb", cost: 98000 },
        { month: "Mar", cost: 145000 },
        { month: "Apr", cost: 165000 },
        { month: "May", cost: 132000 },
        { month: "Jun", cost: 172500 },
        { month: "Jul", cost: 155000 },
        { month: "Aug", cost: 162000 },
        { month: "Sep", cost: 170000 },
        { month: "Oct", cost: 185000 },
    ];


    return (
        <div className='h-screen w-screen bg-[#333333] p-4'>
            <div className='grid grid-rows-12 h-full  gap-4'>

                {/* HEADER */}
                <div className='row-span-1 bg-[#4C4C4C] shadow-md rounded-xl flex items-center justify-between px-6'>
                    <h1 className='text-5xl  font-bold text-[#FFC66B]'>MOLD SCHEDULE MAINTENANCE MONITOR</h1>
                </div>

                <div className="row-span-11  grid grid-rows-11 bg-[#4C4C4C] p-5 gap-5 rounded-xl">
                    {/* DETAIL */}
                    <div className="row-span-3 grid grid-cols-6 gap-4 h-full overflow-hidden">

                        {/* Total Molds */}
                        <div className="col-span-1 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-100">
                            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-xl p-3 rounded-t-2xl">
                                <Layers className="size-6" />
                                TOTAL MOLD / DIE
                            </div>
                            <div className="flex justify-around items-center py-6 h-full">
                                <div className="flex flex-col items-center">
                                    <span className="text-6xl font-bold text-blue-700">128</span>
                                    <span className="mt-4 text-sm text-gray-500">Active</span>
                                </div>
                                <div className="border-l border-gray-300 h-16"></div>
                                <div className="flex flex-col items-center">
                                    <span className="text-6xl font-bold text-gray-400">20</span>
                                    <span className="mt-4 text-sm text-gray-500">Spare</span>
                                </div>
                            </div>
                        </div>

                        {/* PM Service */}
                        <div className="col-span-1 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-100">
                            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-600 text-white font-bold text-xl p-3 rounded-t-2xl">
                                <Wrench className="size-6" />
                                PM SERVICE STATUS
                            </div>
                            <div className="flex justify-around items-center py-6 h-full">
                                <div className="flex flex-col items-center">
                                    <span className="text-6xl font-bold text-green-600">86</span>
                                    <span className="mt-4 text-sm text-gray-500">Completed</span>
                                </div>
                                <div className="border-l border-gray-300 h-16"></div>
                                <div className="flex flex-col items-center">
                                    <span className="text-6xl font-bold text-red-500">12</span>
                                    <span className="mt-4 text-sm text-gray-500">Overdue</span>
                                </div>
                            </div>
                        </div>

                        {/* Alert Zone */}
                        <div className="col-span-1 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-100">
                            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xl p-3 rounded-t-2xl">
                                <AlertTriangle className="size-6" />
                                ALERT ZONE
                            </div>
                            <div className="flex justify-around items-center py-6 h-full">
                                <div className="flex flex-col items-center">
                                    <span className="text-6xl font-bold text-yellow-500">8</span>
                                    <span className="mt-4 text-sm text-gray-500">Warning</span>
                                </div>
                                <div className="border-l border-gray-300 h-16"></div>
                                <div className="flex flex-col items-center">
                                    <span className="text-6xl font-bold text-red-600">3</span>
                                    <span className="mt-4 text-sm text-gray-500">Critical</span>
                                </div>
                            </div>
                        </div>

                        {/* Total Cost */}
                        <div className="col-span-1 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-100">
                            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-green-600 text-white font-bold text-xl p-3 rounded-t-2xl">
                                <DollarSign className="size-6" />
                                TOTAL PM COST
                            </div>
                            <div className="flex flex-col justify-center items-center py-6 h-full">
                                <span className="text-5xl font-bold text-green-700">฿1.85M</span>
                                <span className="mt-4 text-sm text-gray-500">This Month</span>
                            </div>
                        </div>

                        {/* Graph Section */}
                        <div className="col-span-2 bg-white rounded-2xl shadow-lg p-4 flex flex-col border border-gray-100">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold text-gray-700">PM Plan Cost by Month (฿)</h2>
                                <span className="text-sm text-gray-400">2025</span>
                            </div>
                            <div className="flex-1">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 12 }} />
                                        <YAxis tick={{ fill: "#555", fontSize: 12 }} />
                                        <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
                                        <Bar dataKey="cost" fill="#10b981" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className='row-span-8 bg-white shadow-md rounded-lg overflow-hidden w-full'>
                        <table className='w-full border-collapse text-sm'>
                            <thead className='bg-gray-100 text-gray-700 uppercase'>
                                <tr>
                                    <th className='px-4 py-3 text-center font-semibold border-b'>MOLD</th>
                                    <th className='px-4 py-3 text-center font-semibold border-b'>MOLD NAME</th>
                                    <th className='px-4 py-3 text-center font-semibold border-b'>MACHINE</th>
                                    <th className='px-4 py-3 text-center font-semibold border-b'>PLAN</th>
                                    <th className='px-4 py-3 text-center font-semibold border-b'>TYPE</th>
                                    <th className='px-4 py-3 text-center font-semibold border-b'>MAINTENANCE</th>
                                    <th className='px-4 py-3 text-center font-semibold border-b'>STATUS</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                <tr className='hover:bg-gray-50 transition-colors duration-150'>
                                    <td className='px-4 py-2 text-center'>17EN-MD-037</td>
                                    <td className='px-4 py-2 text-center'>Front Cover</td>
                                    <td className='px-4 py-2 text-center'>MC-12</td>
                                    <td className='px-4 py-2 text-center'>2025-10-25</td>
                                    <td className='px-4 py-2 text-center'>Shot</td>
                                    <td className='px-4 py-2 text-center'>50000</td>
                                    <td className='px-4 py-2 text-center'>
                                        <span className='bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold'>
                                            Completed
                                        </span>
                                    </td>
                                </tr>

                                <tr className='hover:bg-gray-50 transition-colors duration-150'>
                                    <td className='px-4 py-2 text-center'>17EN-MD-038</td>
                                    <td className='px-4 py-2 text-center'>Back Cover</td>
                                    <td className='px-4 py-2 text-center'>MC-15</td>
                                    <td className='px-4 py-2 text-center'>2025-10-28</td>
                                    <td className='px-4 py-2 text-center'>Time</td>
                                    <td className='px-4 py-2 text-center'>48000</td>
                                    <td className='px-4 py-2 text-center'>
                                        <span className='bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold'>
                                            Alert
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default PMMonitor
