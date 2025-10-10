import { Input, Modal, Select, Table, Tabs, type TabsProps } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import AddIcon from '@mui/icons-material/Add';
import type { Addbommaster } from "../../interface/mParam";
import type { ColumnsType } from "antd/es/table";
import EditIcon from '@mui/icons-material/Edit';
// import EditBoomMD from "./editmd_Boom";
import { API_GETNAME_BOM } from "../../service/molddie.service";

interface Props {
    open: boolean;
    close: (val: boolean) => void;
    onsave: () => void
}

interface FromItem {
    label: string;
    children: ReactNode;
    labelWidth: string;
}
const FormItem: React.FC<FromItem> = ({ label, children, labelWidth }) => (
    <div className="flex flex-row items-center my-2">
        <label
            className="text-black dark:text-white font-semibold text-end px-10"
            style={{ width: labelWidth || '13rem' }}
        >
            {label}
        </label>
        {children}
    </div>
)

function CreateBoomMD(props: Props) {

    const { open, close, onsave } = props;
    const [isMdEditBooms, setIsMdEditBooms] = useState(false);
    const [Form, setForm] = useState<Addbommaster>({
        formular: '',
        part: '',
        partname: '',
        rm: '',
        rmname: '',
        qty: '',
        level: '',
        seq: ''
    });
    const [CrBoom, setCrBoom] = useState<Addbommaster[]>([]);
    const [partName, setPartName] = useState<string>('');
    const [chilsName, setChildName] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAdd = () => {
        if (!Form.formular || !Form.part) return;
        setCrBoom(prev => [...prev, Form]);
        setForm({ formular: '', part: '', partname: '', rm: '', rmname: '', qty: '', level: '', seq: '' })
    }

    const columns: ColumnsType<Addbommaster> = [
        // {
        //     title: <div className="text-black dark:text-white text-center font-bold">ACTION</div>,
        //     render: (_text: any) => (
        //         <button className="text-yellow-500" onClick={showModalEditBooms}><EditIcon/></button>
        //     ),
        //     align: 'center' as 'center'
        // },
        {
            title: <div className="text-black dark:text-white font-bold text-center">FORMULAR</div>,
            dataIndex: 'formular',
            key: 'formular',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">PALENT</div>,
            dataIndex: 'molddie',
            key: 'molddie',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">CHILD</div>,
            dataIndex: 'part',
            key: 'part',
            align: 'center' as 'center',
            render: (_value: string, record: Addbommaster) => {
                if (record.rm != '') {
                    return <span>{record.rm}</span>
                } else {
                    return <span>{record.part}</span>
                }
            },
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">LEVEL</div>,
            dataIndex: 'level',
            key: 'level',
            align: 'center' as 'center',
            render: (_value: any, record: Addbommaster) => {
                if (record.rm != '') {
                    return <span>1</span>
                } else {
                    return <span>0</span>
                }
            },
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">SEQ</div>,
            dataIndex: 'seq',
            key: 'seq',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">QTY</div>,
            dataIndex: 'qty',
            key: 'qty',
            align: 'center' as 'center'
        }
    ]

    const handleClose = () => {
        close(false)
        setForm({ formular: '', part: '', partname: '', rm: '', rmname: '', qty: '', level: '', seq: '' })
        setPartName('');
        setChildName('');
    }

    const showModalEditBooms = () => {
        setIsMdEditBooms(true);
    }

    useEffect(() => {
        const fetchPartName = async () => {
            try {
                const res = await API_GETNAME_BOM({ part_code: Form.part || "" });

                if (res.result === 1 && res.data.length > 0) {
                    const prtname = res.data[0].prt_Name;
                    setPartName(prtname);
                } else {
                    setPartName(""); // เซ็ตค่าว่างเมื่อไม่เจอข้อมูล
                }
            } catch (error) {
                console.error("Error fetching part name:", error);
                setPartName(""); // กัน error
            }
        };

        const fetchChildName = async () => {
            try {
                const reschild = await API_GETNAME_BOM({ part_code: Form.rm || "" });

                if (reschild.result === 1 && reschild.data.length > 0) {
                    const childname = reschild.data[0].prt_Name;
                    setChildName(childname);
                } else {
                    setChildName("");
                }
            } catch (error) {
                console.error("Error fetching child name:", error);
                setChildName("");
            }
        };

        if (Form.part) fetchPartName();
        if (Form.rm) fetchChildName();
    }, [Form.part, Form.rm]);

    useEffect(() => {
        setForm(prev => {
            if (prev.rm?.trim()) {
                return { ...prev, level: '1' }
            } else if (prev.part?.trim()) {
                return { ...prev, level: '0' }
            }

            return { ...prev, level: '' }
        });
    }, [Form.part, Form.rm]);

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'ADD PART',
            children:
                <div>
                    <div className="text-black font-semibold dark:text-white text-sm">
                        PART BOM MASTER
                        <br />
                        เพิ่มข้อมูล (part bom maseter)
                    </div>
                    <hr className="text-gray-200 my-3" />
                    <div className="flex flex-col gap-3 my-2">
                        <form action="" className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg shadow-md text-sm overflow-auto">
                            <FormItem label="FORMULAR:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter FORMULAR"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="formular"
                                    value={Form.formular.toLocaleUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="PART:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter PART"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="part"
                                    value={Form.part.toLocaleUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="PART NAME:" labelWidth="">
                                <Input
                                    type="text"
                                    readOnly
                                    placeholder="Enter PART NAME"
                                    className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="partname"
                                    value={partName}
                                />
                            </FormItem>
                            {/* <FormItem label="RM:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter RM"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="rm"
                                    value={Form.rm?.toLocaleUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="RM NAME:" labelWidth="">
                                <Input
                                    type="text"
                                    readOnly
                                    placeholder="Enter RM NAME"
                                    className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="rmname"
                                    value={chilsName}
                                />
                            </FormItem> */}
                            <FormItem label="QTY:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter QTY"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="qty"
                                    value={Form.qty.toLocaleUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="LEVEL:" labelWidth="">
                                <Input
                                    readOnly
                                    type="text"
                                    placeholder="Enter LEVEL"
                                    className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="level"
                                    value={Form.level}
                                // onChange={handleChange}
                                />
                            </FormItem>

                            <div className="flex justify-end mt-3">
                                <button
                                    type="button"
                                    className="bg-green-500 hover:bg-green-700 text-white font-semibold p-2 rounded-3xl"
                                    onClick={handleAdd}
                                >
                                    <AddIcon />
                                </button>
                            </div>
                        </form>

                        <div className="conatainer bg-gray-50 border-gray-50 rounded-lg">
                            <Table
                                dataSource={CrBoom}
                                columns={columns}
                                bordered
                                className="m-2"
                            />
                        </div>

                        <div className="flex justify-center mt-3">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                            >
                                SAVE
                            </button>
                        </div>

                    </div>
                </div>
        },
        {
            key: '2',
            label: 'ADD ROW MATERIALS',
            children:
                <div>
                    <div className="text-black font-semibold dark:text-white text-sm">
                        RAW MATERIALS
                        <br />
                        เพิ่มข้อมูล (raw materails)
                    </div>
                    <hr className="text-gray-200 my-3" />
                    <div className="flex flex-col gap-3 my-2">
                        <form action="" className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg shadow-md text-sm overflow-auto">
                            <FormItem label="FORMULAR:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter FORMULAR"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="formular"
                                    value={Form.formular.toLocaleUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="PART:" labelWidth="">
                                <Select
                                    placeholder='SELECTED PART'
                                    className="w-full"
                                />
                            </FormItem>
                            <FormItem label="RM:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter RM"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="rm"
                                    value={Form.rm?.toLocaleUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="RM NAME:" labelWidth="">
                                <Input
                                    type="text"
                                    readOnly
                                    placeholder="Enter RM NAME"
                                    className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="rmname"
                                    value={chilsName}
                                />
                            </FormItem>
                            <FormItem label="QTY:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter QTY"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="qty"
                                    value={Form.qty.toLocaleUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="LEVEL:" labelWidth="">
                                <Input
                                    readOnly
                                    type="text"
                                    placeholder="Enter LEVEL"
                                    className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="level"
                                    value={Form.level}
                                // onChange={handleChange}
                                />
                            </FormItem>

                            <div className="flex justify-end mt-3">
                                <button
                                    type="button"
                                    className="bg-green-500 hover:bg-green-700 text-white font-semibold p-2 rounded-3xl"
                                    onClick={handleAdd}
                                >
                                    <AddIcon />
                                </button>
                            </div>
                        </form>

                        <div className="conatainer bg-gray-50 border-gray-50 rounded-lg">
                            <Table
                                dataSource={CrBoom}
                                columns={columns}
                                bordered
                                className="m-2"
                            />
                        </div>

                        <div className="flex justify-center mt-3">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                            >
                                SAVE
                            </button>
                        </div>

                    </div>
                </div>
        }
    ]


    return (
        <Modal open={open} onCancel={() => handleClose()} footer={<></>} width="50%" height="80%">
            <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                {/* <div className="text-black font-semibold dark:text-white text-sm">
                    BOM MASTER DATA
                    <br />
                    เพิ่มข้อมูล (booms master)
                </div>
                <hr className="text-gray-200 my-3" />
                <div className="flex flex-col gap-3 my-2">
                    <form action="" className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg shadow-md text-sm overflow-auto">
                        <FormItem label="FORMULAR:" labelWidth="">
                            <Input
                                type="text"
                                placeholder="Enter FORMULAR"
                                className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                name="formular"
                                value={Form.formular.toLocaleUpperCase()}
                                onChange={handleChange}
                            />
                        </FormItem>
                        <FormItem label="PART:" labelWidth="">
                            <Input
                                type="text"
                                placeholder="Enter PART"
                                className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                name="part"
                                value={Form.part.toLocaleUpperCase()}
                                onChange={handleChange}
                            />
                        </FormItem>
                        <FormItem label="PART NAME:" labelWidth="">
                            <Input
                                type="text"
                                readOnly
                                placeholder="Enter PART NAME"
                                className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                name="partname"
                                value={partName}
                            />
                        </FormItem>
                        <FormItem label="RM:" labelWidth="">
                            <Input
                                type="text"
                                placeholder="Enter RM"
                                className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                name="rm"
                                value={Form.rm?.toLocaleUpperCase()}
                                onChange={handleChange}
                            />
                        </FormItem>
                        <FormItem label="RM NAME:" labelWidth="">
                            <Input
                                type="text"
                                readOnly
                                placeholder="Enter RM NAME"
                                className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                name="rmname"
                                value={chilsName}
                            />
                        </FormItem>
                        <FormItem label="QTY:" labelWidth="">
                            <Input
                                type="text"
                                placeholder="Enter QTY"
                                className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                name="qty"
                                value={Form.qty.toLocaleUpperCase()}
                                onChange={handleChange}
                            />
                        </FormItem>
                        <FormItem label="LEVEL:" labelWidth="">
                            <Input
                                readOnly
                                type="text"
                                placeholder="Enter LEVEL"
                                className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                name="level"
                                value={Form.level}
                            // onChange={handleChange}
                            />
                        </FormItem>

                        <div className="flex justify-end mt-3">
                            <button
                                type="button"
                                className="bg-green-500 hover:bg-green-700 text-white font-semibold p-2 rounded-3xl"
                                onClick={handleAdd}
                            >
                                <AddIcon />
                            </button>
                        </div>
                    </form>

                    <div className="conatainer bg-gray-50 border-gray-50 rounded-lg">
                        <Table
                            dataSource={CrBoom}
                            columns={columns}
                            bordered
                            className="m-2"
                        />
                    </div>

                    <div className="flex justify-center mt-3">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                        >
                            SAVE
                        </button>
                    </div>

                </div> */}

                <Tabs
                    onChange={onChange}
                    defaultActiveKey="1"
                    items={items}
                    type="card"
                />
            </div>
            {/* <EditBoomMD open={isMdEditBooms} close={(val) => setIsMdEditBooms(val)} onsave={() => console.log('save')} data={CrBoom} /> */}
        </Modal>
    )
}

export default CreateBoomMD