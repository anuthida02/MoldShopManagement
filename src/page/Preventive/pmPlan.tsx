import { useParams } from "react-router-dom";



function pmPlan() {
    const { pagetype } = useParams();



    return (
        <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 text-xl font-semibold">
                {pagetype === "Machine"
                    ? "Preventive Machine Plan"
                    : "Preventive Mold & Die Plan"}
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="w-[80%] py-4 px-4 overflow-auto">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 h-full">
                        <table className="min-w-full text-sm border-collapse">
                            <thead className="bg-gray-200 dark:bg-gray-700 text-left">
                                <tr>
                                    <th className="p-2">#</th>
                                    <th className="p-2">ID</th>
                                    <th className="p-2"> {pagetype === "Machine"
                                        ? "Machine No"
                                        : "Mold/Die No"}</th>
                                    <th className="p-2">{pagetype === "Machine"
                                        ? "Machine Name"
                                        : "Mold/Die Name"}</th>
                                    <th className="p-2">Topic</th>
                                    <th className="p-2">Line</th>
                                    <th className="p-2">Last Due Date</th>
                                    <th className="p-2">Next Due Date</th>
                                    <th className="p-2">Create Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <td className="p-2">X</td>
                                    <td className="p-2">PM-250829100</td>
                                    <td className="p-2">AMA-0002</td>
                                    <td className="p-2">Pipe heating machine</td>
                                    <td className="p-2">ทำความสะอาด Water Flow Cooling</td>
                                    <td className="p-2">AMA1: 1YC MAIN ASSEMBLY LINE1</td>
                                    <td className="p-2">29/08/2025</td>
                                    <td className="p-2">29/08/2025</td>
                                    <td className="p-2">29/09/2025</td>
                                </tr>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <td className="p-2">X</td>
                                    <td className="p-2">PM-250829101</td>
                                    <td className="p-2">AMA-0092</td>
                                    <td className="p-2">No.5 Multi tack welding machine</td>
                                    <td className="p-2">Change bearing stopper hold detack</td>
                                    <td className="p-2">2AMA5: 2YC MAIN ASSEMBLY LINE5</td>
                                    <td className="p-2">29/08/2025</td>
                                    <td className="p-2">29/08/2025</td>
                                    <td className="p-2">29/09/2025</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="w-[20%] p-4 overflow-auto border-l border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-4">

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                            <div className="font-semibold mb-2">🔍 Filter</div>
                            <input
                                type="text"
                                placeholder="Search machine..."
                                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                            <div className="font-semibold mb-2">⚙️ Actions</div>
                            <button className="w-full mb-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                New PM
                            </button>
                            <button className="w-full px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                Export
                            </button>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                            <div className="font-semibold mb-2">📊 Stats</div>
                            <ul className="text-sm">
                                <li className="mb-1">Total PMs: <span className="font-bold">42</span></li>
                                <li className="mb-1">Due soon: <span className="text-yellow-500 font-bold">5</span></li>
                                <li className="mb-1">Overdue: <span className="text-red-500 font-bold">2</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default pmPlan