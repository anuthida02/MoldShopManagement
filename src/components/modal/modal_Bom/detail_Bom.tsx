import { Modal, Table } from "antd";
import type { BomData } from "../../../interface/mParam";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import EditIcon from '@mui/icons-material/Edit';
import EditBoomMD from "./editmd_Boom";
import AddIcon from '@mui/icons-material/Add';
import { API_DETAILBOM, API_GETDATA_EDIT, API_GETDATA_PARTMASTER } from "../../../service/molddie.service";
import CreateBoomMD from "./createmd_Bom";
import { useLocation } from "react-router-dom";
import type { ResDetPartmst } from "../../../interface/dbRes";
// import EditPartMaster from "../modal_Part/editMD";
const BASE = import.meta.env.VITE_BASE;

interface Props {
    open: boolean;
    close: (val: boolean) => void;
    data: BomData[];
}

function Detailbom(props: Props) {

    const { open, close, data } = props;

    const location = useLocation();
    const hideAction = location.pathname === `${BASE}/MoldDie/Master`;

    const [isMdEditBoms, setIsMdEditBoms] = useState(false);
    // const [isMdEditPrtmold, setIsMdEditPrtmold] = useState(false); use
    const [isMdCrBom, setIsMdCrBom] = useState(false);
    const [detBom, setDetBom] = useState<BomData[]>([]);
    // const [dataprtmst, setDataPrtmst] = useState<ResDetPartmst[]>([]); use
    // const [bomData, setBomData] = useState<BomData[]>(data);
    // console.log('bom data from data prop', bomData);

    const handleClose = () => {
        close(false)
    }

    const showModalEditBom = () => {
        setIsMdEditBoms(true);
    }

    const showModalCreateBom = () => {
        setIsMdCrBom(true);
    }

    const columns = ([
        {
            title: <div className="text-black text-center font-bold text-sm">FORMULAR</div>,
            dataIndex: 'formular',
            key: 'formular',
            align: 'center' as const,
        },
        {
            title: <div className="text-black text-center font-bold text-sm">PART</div>,
            dataIndex: 'part_code',
            key: 'part_code',
            render: (_text: any, record: BomData) => (
                <span>{record.part_code} <br /> {record.part_name}</span>
            ),
            align: 'left' as const,
        },
        {
            title: <div className="text-black text-center font-bold text-sm">CHILD</div>,
            dataIndex: 'child_code',
            key: 'child_code',
            render: (_text: any, record: BomData) => (
                <span>{record.child_code} <br /> {record.child_name}</span>
            ),
            align: 'left' as const,
        },
        {
            title: <div className="text-black text-center font-bold text-sm">QTY</div>,
            dataIndex: 'qty',
            key: 'qty',
            align: 'right' as const,
        },
        {
            title: <div className="text-black text-center font-bold text-sm">LEVEL</div>,
            dataIndex: 'level',
            key: 'level',
            align: 'center' as const,
        },
        {
            title: <div className="text-black text-center font-bold text-sm">REV</div>,
            dataIndex: 'rev',
            key: 'rev',
            align: 'center' as const,
        },
        {
            title: <div className="text-black text-center font-bold text-sm">CREATE BY</div>,
            dataIndex: 'crby',
            key: 'crby',
            render: (_text: any, record: BomData) => (
                <span>{record.crby} <br /> {record.crdate}</span>
            ),
        },
        !hideAction && {
            title: <div className="text-black dark:text-white font-bold text-center">ACTION</div>,
            key: 'action',
            render: (_text: any) => (
                <button
                    type="button"
                    className="text-black text-sm font-semibold bg-yellow-400 border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 rounded-lg p-2"
                    onClick={showModalEditBom}
                >
                    <EditIcon /> EDIT
                </button>
            ),
            align: 'center' as const,
        },
    ].filter(Boolean) as ColumnsType<BomData>);

    const handleEdit = async (data: BomData) => {
        const res = await API_GETDATA_EDIT({ formular: data.formular, parent: data.part_code, child: data.child_code, qtypart: data.qty })

        if (res.result === 1 || res.data.length > 0) {
            setDetBom(res.data)
            setIsMdEditBoms(true);
        } else {
            setDetBom([]);
            setIsMdEditBoms(false);
        }
    }

    const handledetail = async (formular: string) => {
        const res = await API_DETAILBOM({ formular: formular })

        if (res.result === 1 || res.data.length > 0) {
            setDetBom(res.data)
        } else {
            setDetBom([]);
        }
    }

    // const handleEditMoldpart = async (data: BomData) => {
    //     setIsMdEditPrtmold(false);
    //     setDataPrtmst([]);

    //     const res = await API_GETDATA_PARTMASTER({ formular: data.formular })

    //     if (res.result === 1 || res.data.length > 0) {
    //         setDataPrtmst(res.data)
    //         setIsMdEditPrtmold(true);
    //     } else { 
    //         setDataPrtmst([]);
    //         setIsMdEditPrtmold(false);
    //     }
    // }

    return (
        <Modal open={open} onCancel={() => handleClose()} footer={<></>} width="70%" height="80%">
            <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <div className="text-black dark:text-white font-semibold">รายละเอียดสูตร</div>
                <hr className="text-gray-200 my-3" />
                {!hideAction && (
                    <div className="flex justify-end my-3">
                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-700 text-white font-semibold p-2 rounded-3xl"
                            onClick={showModalCreateBom}
                        >
                            <AddIcon />
                        </button>
                    </div>
                )}

                <Table
                    dataSource={data}
                    columns={columns}
                    key={hideAction ? data[0]?.part_code : data[0]?.formular}
                    rowKey={hideAction ? 'part_code' : 'formular'}
                    bordered
                    rowClassName={(record) => `${hideAction ? "" : !record.part_name || record.level === '0' ? "bg-green-50" : ""}`}
                    onRow={(record) => ({
                        onClick: () => { hideAction ? null : handleEdit(record)
                        }
                    })}
                />
            </div>

            <EditBoomMD
                open={isMdEditBoms}
                close={(val) => setIsMdEditBoms(val)}
                onsave={(udtformular: string) => {
                    handledetail(udtformular);
                    setIsMdEditBoms(false);
                }}
                data={detBom}
            />
            {/* <EditPartMaster 
                open={isMdEditPrtmold}
                close={(val) => setIsMdEditPrtmold(val)}
                onsave={() => { console.log('save') }}
                data={dataprtmst}
            /> */}
            <CreateBoomMD
                open={isMdCrBom}
                close={(val) => setIsMdCrBom(val)}
                onsave={(formular?) => {
                    if (formular) handledetail(formular);
                    setIsMdCrBom(false);
                }}
                data={data}
            />

        </Modal>
    )
}

export default Detailbom