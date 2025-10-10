import { useEffect, useState } from "react"
import type { Machinedata } from "../../interface/mParam"
import { API_MACHAINE_DATA } from "../../service/molddie.service";
import { Spin, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import CheckIcon from '@mui/icons-material/Check';
// import EditIcon from '@mui/icons-material/Edit';

function MachineData() {

    const [mcData, setMcData] = useState<Machinedata[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchMachineData = async () => {
            try {
                setLoading(true);
                const response = await API_MACHAINE_DATA();
                if (response.result === 1) {
                    setMcData(response.data);
                    // console.log(response.data)
                }
            } catch (error) {
                console.error("Error fetching machine data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMachineData();
    }, []);


    const filterData = mcData.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const columns: ColumnsType<Machinedata> = [
        // {
        //     title: <div className="text-black dark:text-white text-center font-bold">ACTION</div>,
        //     render: (_text:any) => {
        //         return <button type="button">
        //             <EditIcon className="text-yellow-500"/>
        //         </button>
        //     },
        //     align: 'center' as 'center'
        // },
        {
            title: <div className="text-black dark:text-white text-center font-bold">MACHINE</div>,
            dataIndex: 'mcno',
            key: 'mcno',
            align: 'left' as 'left',
            render(_text: any, record: Machinedata) {
                return <span>{record.mcno} <br /> {record.mcname}</span>
            },
            className: 'text-nowrap',
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold">MODEL</div>,
            dataIndex: 'model',
            key: 'model',
            align: 'left' as 'left'
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">SERIAL NO</div>,
            dataIndex: 'serialno',
            key: 'serialno',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">BUDGET NO</div>,
            dataIndex: 'budgetno',
            key: 'budgetno',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold">MAKER</div>,
            dataIndex: 'maker',
            key: 'maker',
            align: 'left' as 'left',
            render(_text: any, record: Machinedata) {
                return <span>{record.maker} <br /> {record.vender}</span>
            },
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold">STATUS</div>,
            dataIndex: 'status',
            key: 'status',
            align: 'center' as 'center',
            render: (text: string) => {
                if (text === "ACTIVE") {
                    return <Tag color="green">ACTIVE</Tag>;
                } else {
                    return <Tag color="red">CANCLE</Tag>;
                }
            }
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">ELECQUANTITY</div>,
            dataIndex: 'elecquantity',
            key: 'elecquantity',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">WATER</div>,
            dataIndex: 'water',
            key: 'water',
            align: 'center' as 'center',
            render: (text: string) => {
                if (text === 'True') {
                    return <span className="text-blue-600"><CheckIcon /></span>
                } else {
                    return null
                }
            }
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">AIR</div>,
            dataIndex: 'air',
            key: 'air',
            align: 'center' as 'center',
            render: (text: string) => {
                if (text === 'True') {
                    return <span className="text-blue-600"><CheckIcon /></span>
                } else {
                    return null
                }
            }
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">STEAM</div>,
            dataIndex: 'steam',
            key: 'steam',
            align: 'center' as 'center',
            render: (text: string) => {
                if (text === 'True') {
                    return <span className="text-blue-600"><CheckIcon /></span>
                } else {
                    return null
                }
            }
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">GAS</div>,
            dataIndex: 'gas',
            key: 'gas',
            align: 'center' as 'center',
            render: (text: string) => {
                if (text === 'True') {
                    return <span className="text-blue-600"><CheckIcon /></span>
                } else {
                    return null
                }
            }
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold">LINEUSED</div>,
            dataIndex: 'linename',
            key: 'linename',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold">PROCESS</div>,
            dataIndex: 'processid',
            key: 'processid',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">CYCLETIME</div>,
            dataIndex: 'cycletime',
            key: 'cycletime',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">BOIPROJECT</div>,
            dataIndex: 'boiproject',
            key: 'boiproject',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">BOIMACHINE</div>,
            dataIndex: 'boimachine',
            key: 'boimachine',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">REMARK</div>,
            dataIndex: 'remark',
            key: 'remark',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white text-center font-bold text-nowrap">FIXEDASSET</div>,
            dataIndex: 'fixedasset',
            key: 'fixedasset',
            align: 'center' as 'center'
        }
    ]

    return (
        <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="p-4 tecxt-sm sm:text-sm md:text-lg lg:text-lg font-bold">
                MACHINE MASTER DATA
            </div>
            <hr className="text-gray-200 mx-4" />

            {loading ? (
                <div className="flex justify-center">
                    <Spin />
                </div>
            ) : (
                <div className="m-4 overflow-auto">
                    <form className="flex flex-row items-center mt-2" onSubmit={(e) => e.preventDefault()}>
                        <div className="font-semibold w-[4.5rem]">🔍 Filter:</div>
                        <input
                            type="text"
                            placeholder="Search Machine Data..."
                            className="w-[20rem] px-2 py-1 rounded-lg bg-yellow-50 dark:bg-gray-700 border border-yellow-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                    <div className="mt-3">
                        <Table
                            dataSource={searchTerm ? filterData : mcData}
                            columns={columns}
                            bordered
                            rowKey="mcno"
                            size="middle"
                            scroll={{ x: 'max-content' }}
                        />
                    </div>

                </div>
            )}
        </div>
    )
}

export default MachineData