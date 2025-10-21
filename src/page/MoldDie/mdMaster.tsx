import { useEffect, useState } from "react";
import { RightOutlined, LeftOutlined, EditOutlined } from '@ant-design/icons';
import { Select, Table } from "antd";
import CreateMD from "../../components/modal/modal_Part/createMD";
import { API_DETAILBOM, API_GETDATA_PARTMASTER, API_GETPARTMASTER, API_GETPARTTYPE } from "../../service/molddie.service";
import type { BomData, getDetailBom, GetPartMst } from "../../interface/mParam";
import type { ResDetPartmst, ResPartMst } from "../../interface/dbRes";
import type { ColumnsType } from "antd/es/table";
import { ColourfulText } from "../../components/ui/colorful-text";
import Detailbom from "../../components/modal/modal_Bom/detail_Bom";
import EditPartMaster from "../../components/modal/modal_Part/editMD";


function MdMaster() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [selectTypePrt, setSelectTypePrt] = useState<GetPartMst[]>([]);
    const [dataPrtmst, setDataPrtmst] = useState<ResPartMst[]>([]);
    const [selectedPartType, setSelectedPartType] = useState<string>("");
    const [refreshKey, setRefreshKey] = useState(0);
    const [isMdDetBooms, setIsMdDetBooms] = useState(false);
    const [isMdEditPrtmold, setIsMdEditPrtmold] = useState(false);
    const [detBom, setDetBom] = useState<BomData[]>([]);
    const [datamoldprt, setDataMoldpart] = useState<ResDetPartmst[]>([]);

    const toggleSiderbar = () => setIsSidebarOpen(prev => !prev);


    const showModalCreate = () => {
        setIsModalCreate(true);
    }

    useEffect(() => {
        const fectchPartType = async () => {
            const resprttype = await API_GETPARTTYPE();
            if (resprttype.result === 1 && resprttype.data.length > 0) {
                setSelectTypePrt(resprttype.data);
                setSelectedPartType(resprttype.data[0].prtmsttype);
            }
        };
        fectchPartType();
    }, []);

    useEffect(() => {
        if (!selectedPartType) return;
        const fetchPartmaster = async () => {
            const resprtmst = await API_GETPARTMASTER({ prtmsttype: selectedPartType });
            setDataPrtmst(resprtmst.result === 1 ? resprtmst.data : []);
        };
        fetchPartmaster();
    }, [selectedPartType, refreshKey]);

    const handledetail = async (data: getDetailBom) => {

        setDetBom([]);
        const res = await API_DETAILBOM({ formular: data.formular });

        if (res.result === 1 && res.data.length > 0) {
            setDetBom(res.data);
            setIsMdDetBooms(true);
        } else {
            setDetBom([]);
            setIsMdDetBooms(true);
        }
    };

    const columns: ColumnsType<ResPartMst> = [
        {
            title: <div className="text-black font-bold text-center dark:text-white">NO.</div>,
            render: (_text: any, _record: ResPartMst, index: number) => (
                <div className="text-center">{index + 1}</div>
            ),
            width: '4%',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">PART</div>,
            dataIndex: 'prtcode',
            key: 'prtcode',
            align: 'left' as 'left',
            render: (_text: any, record: ResPartMst) => (
                <span>{record.prtcode} <br /> {record.prtname}</span>
            )
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">TYPE</div>,
            dataIndex: 'prttype',
            key: 'prttype',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">MACHINE</div>,
            dataIndex: 'mcno',
            key: 'mcno',
            align: 'center' as 'center',
            render: (_text: any, record: ResPartMst) => (
                <span>{record.mcname} <br /> {record.mcno}</span>
            )
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">FACTORY</div>,
            dataIndex: 'factory',
            key: 'factory',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">LINE</div>,
            dataIndex: 'lineid',
            key: 'lindid',
            align: 'center' as 'center',
            render: (_text: any, record: ResPartMst) => (
                <span>{record.linename} <br /> {record.lineid}</span>
            )
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">MACHINE STATUS</div>,
            dataIndex: '',
            key: '',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">BOM</div>,
            align: 'center' as 'center',
            render: (_text: any, record: ResPartMst) => (
                <div className="text-center">
                    <button
                        type="button"
                        className="bg-lime-100 border border-lime-200 hover:bg-lime-200 hover:border-lime-400 rounded-lg w-[5rem] p-1 font-semibold"
                        onClick={() => handledetail({ formular: record.prtcode })}
                    >
                        BOM
                    </button>
                </div>
            ),

            width: '7%'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">PLAN P/M</div>,
            align: 'center' as 'center',
            render: (_text: any, record: ResPartMst) => (
                <div className="text-center">
                    <button
                        type="button"
                        className="bg-orange-100 border border-orange-200 hover:bg-orange-200 hover:border-orange-300 rounded-lg w-[5rem] p-1 font-semibold"
                    >
                        PLAN P/M
                    </button>
                </div>
            ),
            width: '7%'
        },
        {
            title: <div className="text-black font-bold text-center dark:text-white">ACTION</div>,
            align: 'center' as 'center',
            render: (_text: any, record: ResPartMst) => (
                <div className="text-center">
                    <button
                        type="button"
                        className="bg-yellow-100 border border-yellow-200 hover:bg-yellow-200 hover:border-yellow-300 rounded-lg w-[5rem] p-1 font-semibold"
                        onClick={() => handleEditMoldpart({ formular: record.prtcode })}
                    >
                        <EditOutlined /> EDIT
                    </button>
                </div>
            ),
            width: '7%'
        }
    ]

    const filteredData = dataPrtmst.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleEditMoldpart = async (data: getDetailBom) => {
        setIsMdEditPrtmold(false);
        setDataMoldpart([]);

        const res = await API_GETDATA_PARTMASTER({ formular: data.formular })

        if (res.result === 1 || res.data.length > 0) {
            setDataMoldpart(res.data)
            setIsMdEditPrtmold(true);
        } else {
            setDataMoldpart([]);
            setIsMdEditPrtmold(false);
        }
    }


    return (
        <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="flex flex-row justify-between items-center">
                <div className="p-4 text-sm sm:text-sm md:text-lg lg:text-lg font-bold">
                    <ColourfulText text='PART MASTER' />
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
                    <div className="flex flex-row gap-3 items-center mb-3">
                        <label htmlFor="" className="text-black dark:text-white text-sm font-semibold mx-1">SELECT PARTTYPE</label>
                        <Select
                            placeholder="SELECT PARTTYPE"
                            className="w-[20rem] custom-yellow-select"
                            value={selectedPartType}
                            options={selectTypePrt.map(item => ({
                                label: item.prtmsttype,
                                value: item.prtmsttype
                            }))}
                            onChange={(val) => {
                                setSelectedPartType(val);
                            }}
                        />
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-2">
                        <Table
                            dataSource={searchTerm ? filteredData : dataPrtmst}
                            columns={columns}
                            bordered
                            className="rounded-xl"
                            size="middle"
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div
                    className={`py-5 overflow-auto  transition-all duration-300 mt-10 ${isSidebarOpen ? "w-1/5" : "w-0 p-0"}`}
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

            <CreateMD
                open={isModalCreate}
                close={(val) => setIsModalCreate(val)}
                onsave={() => {
                    setIsModalCreate(false);
                    setRefreshKey(prev => prev + 1);
                }}
            />
            <Detailbom
                open={isMdDetBooms}
                close={(val) => setIsMdDetBooms(val)}
                data={detBom}
            />
            <EditPartMaster
                open={isMdEditPrtmold}
                close={(val) => setIsMdEditPrtmold(val)}
                onsave={() => { console.log('save') }}
                data={datamoldprt}
            />
        </div>
    );
}

export default MdMaster
