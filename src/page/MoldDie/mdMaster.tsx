import { useState } from "react";
import { useParams } from "react-router-dom";
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Table } from "antd";
import CreateMD from "../../components/modal/createMD";


function MdMaster
() {
    const { pagetype } = useParams();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalCreate, setIsModalCreate] = useState(false);

    const toggleSiderbar = () => setIsSidebarOpen(prev => !prev);

    const showModalCreate = () => {
        setIsModalCreate(true);
    }

    const data = [
        { id: '1', mdno: 'md-00001', ndname: 'Pipe heating machine', topic: 'ทำความสะอาด Water Flow Cooling', line: 'AMA1: 1YC MAIN ASSEMBLY LINE1', lddate: '29/08/2025', nddate: '29/08/2025', crdate: '29/08/2025' },
        { id: '3', mdno: 'md-00002', ndname: 'Pipe heating machine', topic: 'ทำความสะอาด Water Flow Cooling', line: 'AMA1: 1YC MAIN ASSEMBLY LINE1', lddate: '29/08/2025', nddate: '29/08/2025', crdate: '29/08/2025' }
    ]

    const columns = [
        {
            title: <div className="text-black font-bold text-center dark:text-white">ID</div>,
            dataIndex: 'id',
            key: 'id',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">M/D NO</div>,
            dataIndex: 'mdno',
            key: 'mdno',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">M/D NAME</div>,
            dataIndex: 'ndname',
            key: 'ndname',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">TOPIC</div>,
            dataIndex: 'topic',
            key: 'topic',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">LINE</div>,
            dataIndex: 'line',
            key: 'line',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">LAST DUE DATE</div>,
            dataIndex: 'lddate',
            key: 'lddate',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">NEXT DUE DATE</div>,
            dataIndex: 'nddate',
            key: 'nddate',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">CREATE DATE</div>,
            dataIndex: 'crdate',
            key: 'crdate',
            align: 'center' as 'center'
        }
    ]

    const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    return (
        <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="flex flex-row justify-between items-center">
                <div className="p-4 text-sm sm:text-sm md:text-lg lg:text-lg font-semibold">
                    {pagetype === "Machine"
                        ? "Preventive Machine Plan"
                        : "Preventive Mold & Die Plan"}
                </div>
                <button
                    onClick={toggleSiderbar}
                    className=" p-2 h-10 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition mx-4"
                >
                    {isSidebarOpen ? <RightOutlined /> : <LeftOutlined />}
                </button>
            </div>
            <hr className="mx-4 text-gray-200" />

            <div className="flex flex-1 overflow-hidden">
                {/* Table */}
                <div
                    className={`py-4 px-4 overflow-auto transition-all duration-300 ${isSidebarOpen ? "w-4/5" : "w-full"
                        }`}
                >
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 h-full">
                        <Table
                            dataSource={searchTerm ? filteredData : data}
                            columns={columns}
                            bordered
                            className="rounded-xl"
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div
                    className={`py-5 overflow-auto  transition-all duration-300 ${isSidebarOpen ? "w-1/5" : "w-0 p-0"}`}
                >
                    {isSidebarOpen && (
                        <div className="flex flex-col gap-4">
                            <form className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-md" onSubmit={(e) => e.preventDefault()}>
                                <div className="font-semibold mb-2">🔍 Filter</div>
                                <input
                                    type="text"
                                    placeholder="Search Mold & Die..."
                                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </form>

                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                                <div className="font-semibold mb-2">⚙️ Actions</div>
                                <button
                                    type="button"
                                    className="w-full mb-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    onClick={showModalCreate}
                                >
                                    New PM
                                </button>
                                <button className="w-full px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                    Export
                                </button>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                                <div className="font-semibold mb-2">📊 Stats</div>
                                <ul className="text-sm">
                                    <li className="mb-1">
                                        Total PMs: <span className="font-bold">42</span>
                                    </li>
                                    <li className="mb-1">
                                        Due soon: <span className="text-yellow-500 font-bold">5</span>
                                    </li>
                                    <li className="mb-1">
                                        Overdue: <span className="text-red-500 font-bold">2</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CreateMD open={isModalCreate} close={(val) => setIsModalCreate(val)} onsave={() => console.log('save')}/>
        </div>
    );
}

export default MdMaster
