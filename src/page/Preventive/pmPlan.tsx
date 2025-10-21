import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Spin, Table } from "antd";
import Create_PMPlan from "../../components/modal/create_PMPlan";
import { API_GETPLANLIST, API_INSERTPlan } from "../../service/pm.service";
import dayjs from "dayjs";


const pmType = [
    { value: 'T', label: 'ระยะเวลา' },
    { value: 'S', label: 'จำนวนรอบ Shot' },
]


function pmPlan() {
    const { pagetype } = useParams();

    const [planList, setPlanList] = useState<any[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleSiderbar = () => setIsSidebarOpen(prev => !prev);

    const showModalCreate = () => {
        setIsModalCreate(true);
    }

    const fetchStd = async () => {
        setLoading(true);
        try {
            const res = await API_GETPLANLIST();
            console.log(res)
            if (res && res.length > 0) setPlanList(res);
        } catch {

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStd();
    }, []);

    const handleSaveAddPlan = async (payload: any) => {
        try {
            console.log("Payload received from modal:", payload);
            const res = await API_INSERTPlan(payload);
            fetchStd();
            console.log("Save success:", res);
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    const columns = [
        {
            title: <div className="text-black font-bold text-center dark:text-white">Mold/Die No.</div>,
            dataIndex: 'Prt_Code',
            key: 'Prt_Code',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">ประเภทการ PM</div>,
            dataIndex: 'PM_Type',
            key: 'PM_Type',
            align: 'center' as 'center',
            render: (value: string) => {
                const method = pmType.find(m => m.value === value);
                return method ? method.label : value;
            }
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">วันที่วางแผน</div>,
            dataIndex: 'PM_PlanDate',
            key: 'PM_PlanDate',
            align: 'center' as 'center',
            render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">วันที่แจ้งเตือน</div>,
            dataIndex: 'PM_PlanAlertDate',
            key: 'PM_PlanAlertDate',
            align: 'center' as 'center',
            render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">ค่าใช้จ่าย (฿)</div>,
            dataIndex: 'PM_TotalCost',
            key: 'PM_TotalCost',
            align: 'center' as 'center',
            render: (value: number) => `฿ ${value.toLocaleString('th-TH')}`
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">สถานะ</div>,
            dataIndex: 'Status',
            key: 'Status',
            align: 'center' as 'center',
            render: (text: string) => {
                let color = 'black';
                if (text === 'PLAN') color = 'lime';
                else if (text === 'CANCEL') color = 'red';
                else if (text === 'DONE') color = 'blue';

                return (
                    <span style={{ color, fontWeight: 'bold' }}>
                        {text}
                    </span>
                );
            }
        },
    ]

    const filteredData = planList.filter((item) =>
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
                    {loading ? (
                        <div>
                            <Spin className="text-center my-2"></Spin>
                        </div>
                    ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4 h-full">
                            <Table
                                dataSource={searchTerm ? filteredData : planList}
                                columns={columns}
                                bordered
                                className="rounded-xl"
                            />
                        </div>
                    )}
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
                                    placeholder="Search machine..."
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
                                    Create Plan
                                </button>
                                {/* <button className="w-full px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                    Export
                                </button> */}
                            </div>

                            {/* <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-md">
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
                            </div> */}
                        </div>
                    )}
                </div>
            </div>

            <Create_PMPlan open={isModalCreate} close={(val) => setIsModalCreate(val)} onsave={(payload) => handleSaveAddPlan(payload)} />
        </div>
    );
}

export default pmPlan