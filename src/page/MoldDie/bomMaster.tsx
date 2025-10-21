import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Spin, Table } from "antd";
import { useEffect, useState } from "react";
import CreateBoomMD from "../../components/modal/modal_Bom/createmd_Bom";
import { AuroraBackground } from "../../components/ui/aurora-background";
import { ColourfulText } from "../../components/ui/colorful-text";
import type { BomCount, BomData } from "../../interface/mParam";
import { API_DETAILBOM, API_GETCOUNT_BOM } from "../../service/molddie.service";
import type { ColumnsType } from "antd/es/table";
import Detailbom from "../../components/modal/modal_Bom/detail_Bom";

function BomMaster() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalBooms, setIsModalBooms] = useState(false);
    const [countBom, setCountBom] = useState<BomCount[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isMdDetBoms, setIsMdDetBoms] = useState(false);
    const [detBom, setDetBom] = useState<BomData[]>([]);

    const toggleSiderbar = () => setIsSidebarOpen(prev => !prev);

    const showModalCreateBooms = () => {
        setIsModalBooms(true);
    }

    const fetchCountBomData = async () => {
        try {
            setLoading(true);
            const response = await API_GETCOUNT_BOM();
            if (response.result === 1) {
                setCountBom(response.data);
                console.log(response.data)
            }
        } catch (error) {
            console.error("Error fetching machine data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountBomData();
    }, [])


    const columns: ColumnsType<BomCount> = [
        {
            title: <div className="text-black dark:text-white font-bold text-center">FORMULAR</div>,
            dataIndex: 'formular',
            key: 'formular',
            align: 'center' as 'center',
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">QUANTITY PARENT</div>,
            dataIndex: 'parent',
            key: 'parent',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">QUANTITY CHILD</div>,
            dataIndex: 'child',
            key: 'child',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">QUANTITY PART</div>,
            dataIndex: 'qtypart',
            key: 'qtypart',
            align: 'center' as 'center'
        }
    ]

    const filteredData = countBom.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handledetail = async (data: BomCount) => {
        setIsMdDetBoms(false);
        setDetBom([]);
        const res = await API_DETAILBOM({ formular: data.formular });

        if (res.result === 1 && res.data.length > 0) {
            setDetBom(res.data);
            setIsMdDetBoms(true);
        } else {
            setDetBom([]);
            setIsMdDetBoms(true);
        }
    };

    const total = countBom.length;

    return (
        <AuroraBackground>
            <div className="flex flex-col h-full w-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <div className="flex flex-row justify-between items-center">
                    <div className="p-4 text-sm sm:text-sm md:text-lg lg:text-lg font-bold">
                        <ColourfulText text='BOM MASTER' />
                    </div>
                    <button
                        onClick={toggleSiderbar}
                        className="z-10 p-2 h-10 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition mx-4"
                    >
                        {isSidebarOpen ? <RightOutlined /> : <LeftOutlined />}
                    </button>
                </div>
                <hr className="text-gray-200 mx-4" />

                <div className="flex flex-1 overflow-hidden">
                    {/* Table */}
                    <div
                        className={`z-10 p-4 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'w-4/5' : 'w-full'}`}
                    >
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-4">
                            {loading ? (
                                <Spin className="text-center my-2"></Spin>
                            ) : (
                                <Table
                                    dataSource={searchTerm ? filteredData : countBom}
                                    columns={columns}
                                    bordered
                                    className="rounded-xl"
                                    onRow={(record) => ({
                                        onClick: () => handledetail(record)
                                    })}
                                // scroll={{ y: 600 }}
                                />
                            )}

                        </div>
                    </div>

                    {/* sider */}
                    <div className={`z-10 py-5 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'w-1/5' : 'w-0 p-0'}`}>
                        {isSidebarOpen && (
                            <div className="flex flex-col gap-4">
                                <form action="" className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-md" onSubmit={(e) => e.preventDefault()}>
                                    <div className="font-semibold mb-2">🔍 Filter</div>
                                    <input
                                        type="text"
                                        placeholder="Search Boom..."
                                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:right-2 focus:ring-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </form>

                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                                    <div className="font-semibold mb-2">⚙️ Actions</div>
                                    <button
                                        type="button"
                                        className="w-full mb-2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                                        onClick={showModalCreateBooms}
                                    >
                                        NEW BOOM MASTER
                                    </button>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-md">
                                    <div className="font-semibold mb-2">📊 Stats</div>
                                    <ul className="text-sm">
                                        <li className="mb-1">
                                            Total Bom: <span className="font-bold">{total}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <CreateBoomMD
                    open={isModalBooms}
                    close={(val) => setIsModalBooms(val)}
                    onsave={() => {
                        fetchCountBomData();
                        setIsModalBooms(false);
                    }}
                />
                <Detailbom open={isMdDetBoms} close={(val) => setIsMdDetBoms(val)} data={detBom} />
            </div>
        </AuroraBackground>

    )
}

export default BomMaster