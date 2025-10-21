import { Input, Modal, Select, Table, Tabs, type TabsProps } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import AddIcon from '@mui/icons-material/Add';
import type { ColumnsType } from "antd/es/table";
// import EditBoomMD from "./editmd_Boom";
import { API_CRPARTBOM, API_CRRMBOM, API_GET_LEVELPART, API_GET_PARTBOM, API_GETMOLD_MASTER, API_GETNAME_BOM } from "../../../service/molddie.service";
import type { Addprtbom, Addrmbom, BomData } from "../../../interface/mParam";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import type { RootState } from "../../../store/store";
import type { ResMoldMst, ResPartBom } from "../../../interface/dbRes";
import Swal from "sweetalert2";

interface Props {
    open: boolean;
    close: (val: boolean) => void;
    onsave: (formular?: string) => void;
    data?: BomData[]
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

    const { open, close, onsave, data } = props;

    const redux = useSelector((state: RootState) => state.login);
    // const [isMdEditBooms, setIsMdEditBooms] = useState(false);

    const [FormPart, setFormPart] = useState<Addprtbom>({
        formular: undefined,
        part_code: '',
        part_name: '',
        qty: '',
        level: '',
        crby: ''
    });

    const [FormRm, setFormRm] = useState<Addrmbom>({
        formular: '',
        part_level: undefined,
        part_code: '',
        part_name: '',
        rm_code: '',
        rm_name: '',
        qty: '',
        level: '',
        // seq: '',
        crby: ''
    })
    const [CrPrtBom, setCrPrtBom] = useState<Addprtbom[]>([]);
    const [CrRmBom, setCrRmBom] = useState<Addrmbom[]>([]);
    const [partName, setPartName] = useState<string>('');
    const [prtNamerm, setPrtNameRm] = useState<string>('');
    const [childName, setChildName] = useState<string>('');
    const [lockFormular, setLockFormular] = useState<string>('');
    const [partBom, setPartBom] = useState<ResPartBom[]>([]);
    const [levelBom, setLevelBom] = useState<ResPartBom[]>([]);
    const [moldList, setMoldList] = useState<ResMoldMst[]>([]);


    useEffect(() => {
        const fetchMoldList = async () => {
            try {
                const res = await API_GETMOLD_MASTER();
                if (res.result === 1) {
                    setMoldList(res.data);
                } else {
                    setMoldList([]);
                }
            } catch (erroe) {
                setMoldList([])
            }

        }

        fetchMoldList();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormPart(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeRm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormRm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleAdd = () => {
        if (!FormPart.formular || !FormPart.part_code || !FormPart.qty) {
            Swal.fire({
                icon: "warning",
                title: "ข้อมูลไม่ครบ!",
                text: "กรุณากรอกข้อมูลให้ครบก่อนเพิ่มรายการ",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#f59e0b"
            });
            return;
        }
        setCrPrtBom(prev => {
            const newItem = {
                ...FormPart,
                part_name: partName,
                seq: ((prev.length + 1) * 10000 + 1).toString()
            };
            return [...prev, newItem];
        });

        if (!lockFormular.trim()) {
            setLockFormular(FormPart.formular.toUpperCase());
        }

        setFormPart(prev => ({
            ...prev,
            part_code: '',
            part_name: '',
            qty: '',
            level: '',
            crby: ''
        }))
        setPartName('');
    }

    const handleAddRm = () => {
        console.log(FormRm)
        if (!FormRm.formular || FormRm.part_level == null || !FormRm.part_code || !FormRm.rm_code || !FormRm.qty) {
            Swal.fire({
                icon: "warning",
                title: "ข้อมูลไม่ครบ!",
                text: "กรุณากรอกข้อมูลให้ครบก่อนเพิ่มรายการ",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#f59e0b"
            });
            return;
        }

        // const lastItem = CrRmBom
        //     .filter(item => item.part_code === FormRm.part_code)
        //     .sort((a, b) => parseInt(b.seq || '0') - parseInt(a.seq || '0'))[0];

        // const baseSeq = FormRm.seq ? parseInt(FormRm.seq) : 10001;
        // const lastseq = lastItem ? parseInt(lastItem.seq || "0") : baseSeq;
        // const newSeq = lastseq + 1000;

        setCrRmBom(prev => {
            const newItem = {
                ...FormRm,
                part_name: prtNamerm,
                rm_name: childName,
            };

            return [...prev, newItem];
        });

        if (!lockFormular.trim()) {
            setLockFormular(FormRm.formular.toUpperCase());
        }

        setFormRm(prev => ({
            ...prev,
            rm_code: '',
            rm_name: '',
            qty: '',
            level: '',
            seq: '',
        }))

        setChildName('');

    }

    const columns: ColumnsType<Addprtbom> = [
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
            dataIndex: 'formular',
            key: 'formular',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">CHILD</div>,
            dataIndex: 'part_code',
            key: 'part_code',
            align: 'center' as 'center',
            render: (_value: string, record: Addprtbom) => {
                return <span>{record.part_code} <br /> {record.part_name}</span>
            },
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">LEVEL</div>,
            dataIndex: 'level',
            key: 'level',
            align: 'center' as 'center',
            // render: (_value: any, record: Addprtbom) => {
            //     if (record.rm != '') {
            //         return <span>1</span>
            //     } else {
            //         return <span>0</span>
            //     }
            // },
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">QTY</div>,
            dataIndex: 'qty',
            key: 'qty',
            align: 'center' as 'center'
        }
    ]


    const columsrm: ColumnsType<Addrmbom> = [
        {
            title: <div className="text-black dark:text-white font-bold text-center">FORMULAR</div>,
            dataIndex: 'formular',
            key: 'formular',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">PALENT</div>,
            dataIndex: 'part_code',
            key: 'part_code',
            align: 'center' as 'center',
            render: (_value: string, record: Addrmbom) => {
                return <span>{record.part_code} <br /> {partName}</span>
            },
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">CHILD</div>,
            dataIndex: 'rm_code',
            key: 'rm_code',
            align: 'center' as 'center',
            render: (_value: string, record: Addrmbom) => {
                return <span>{record.rm_code}</span>
            },
        },
        {
            title: <div className="text-black dark:text-white font-bold text-center">LEVEL</div>,
            dataIndex: 'level',
            key: 'level',
            align: 'center' as 'center',
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
        setFormPart({ formular: '', part_code: '', part_name: '', qty: '', level: '', crby: '' });
        setFormRm({ formular: '', part_level: 0, part_code: '', part_name: '', rm_code: '', rm_name: '', qty: '', level: '', crby: '' });
        setPartName('');
        setChildName('');
        setLockFormular('');
        setCrPrtBom([]);
        setCrRmBom([]);
        setPrtNameRm('')
    }

    useEffect(() => {
        const fetchPartName = async () => {
            try {
                const res = await API_GETNAME_BOM({ part_code: FormPart.part_code || "" });

                if (res.result === 1 && res.data.length > 0) {
                    const prtname = res.data[0].prt_Name;
                    setPartName(prtname);
                    setPrtNameRm(prtname);
                } else {
                    setPartName("");
                    setPrtNameRm('');

                }
            } catch (error) {
                console.error("Error fetching part name:", error);
                setPartName(""); // กัน error
            }
        };

        const fetchChildName = async () => {
            try {
                const reschild = await API_GETNAME_BOM({ part_code: FormRm.rm_code || "" });

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

        if (FormPart.part_code) fetchPartName();
        if (FormRm.rm_code) fetchChildName();
    }, [FormPart.part_code, FormRm.rm_code]);

    useEffect(() => {
        setFormPart(prev => {
            if (prev.part_code.trim()) {
                return { ...prev, level: '0' }
            }
            return { ...prev, level: '' }
        });


    }, [FormPart.part_code]);

    const onChange = (key: string) => {
        console.log(key);
    };

    const notifyErr = (msg: string) => {
        toast.error(`Err : ${msg}`);
    };

    const handleSavePrtBom = async () => {

        if (CrPrtBom.length === 0) {
            notifyErr("ไม่พบข้อมูล!");
            return;
        }

        try {
            const payload = CrPrtBom.map(item => ({
                formular: item.formular,
                part_code: item.part_code,
                part_name: item.part_name,
                qty: item.qty,
                level: item.level,
                // seq: item.seq,
                rev: item.rev || "",
                crby: redux.user?.name || ""
            }));

            const res = await API_CRPARTBOM(payload);


            if (res.result === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสำเร็จ',
                    text: res.message,
                    customClass: {
                        container: 'swal-top-modal'
                    },
                    timer: 2500,
                }).then(() => {
                    setCrPrtBom([]);
                    setLockFormular('');
                    setFormPart({ formular: '', part_code: '', part_name: '', qty: '', level: '', crby: '' });
                    handleClose();
                    onsave(payload[0]?.formular);
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'บันทึกข้อมูลไม่สำเร็จ',
                    text: res.message,
                    customClass: {
                        container: 'swal-top-modal'
                    }
                })
            }
        } catch (err) {
            console.error("API Error:", err);
            notifyErr("พบข้อผิดพลาด กรุณาตรวจสอบ API");
        }
    };

    const handleSaveRm = async () => {
        if (CrRmBom.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'บันทึกข้อมูลไม่สำเร็จ',
                text: 'ไม่มีข้อมูลในรายการ',
                timer: 2000
            })
            return;
        }

        try {
            const payload = CrRmBom.map(item => ({
                formular: item.formular,
                part_level: item.part_level,
                part_code: item.part_code,
                part_name: item.part_name,
                rm_code: item.rm_code,
                rm_name: item.rm_name,
                qty: item.qty,
                level: item.level,
                rev: item.rev || "",
                crby: redux.user?.name || ""
            }))

            const resrm = await API_CRRMBOM(payload);

            switch (resrm.result) {
                case 1:
                    Swal.fire({
                        icon: 'success',
                        title: 'บันทึกข้อมูลสำเร็จ',
                        text: resrm.message,
                        customClass: {
                            container: 'swal-top-modal'
                        }
                    }).then(() => {
                        setCrRmBom([]);
                        setLockFormular('');
                        setFormRm({ formular: '', part_level: 0, part_code: '', part_name: '', rm_code: '', rm_name: '', qty: '', level: '', crby: '' });
                        handleClose();
                        onsave(payload[0]?.formular);
                    });
                    break
                case -1:
                    Swal.fire({
                        icon: 'warning',
                        title: 'บันทึกข้อมูลไม่สำเร็จ',
                        text: resrm.message,
                        customClass: {
                            container: 'swal-top-modal'
                        }
                    })
                    break
                case -2:
                    Swal.fire({
                        icon: 'warning',
                        title: 'บันทึกข้อมูลไม่สำเร็จ',
                        text: resrm.message,
                        customClass: {
                            container: 'swal-top-modal'
                        }
                    })
                    break
                case -3:
                    Swal.fire({
                        icon: 'error',
                        title: 'บันทึกข้อมูลไม่สำเร็จ',
                        text: resrm.message,
                        customClass: {
                            container: 'swal-top-modal'
                        }
                    })
                    break
                case -4:
                    Swal.fire({
                        icon: 'error',
                        title: 'บันทึกข้อมูลไม่สำเร็จ',
                        text: resrm.message,
                        customClass: {
                            container: 'swal-top-modal'
                        }
                    })
                    break

                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'บันทึกข้อมูลไม่สำเร็จ',
                        text: resrm.message || 'เกิดข้อผิดพลาด',
                        customClass: {
                            container: 'swal-top-modal'
                        }
                    })
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'บันทึกข้อมูลไม่สำเร็จ',
                text: 'เกิดข้อผิดพลากกรุณาตรวจสอบ API',
                customClass: {
                    container: 'swal-top-modal'
                }
            })
        }

    }

    useEffect(() => {
        const handleLevelPart = async () => {
            if (!FormRm.formular) {
                setLevelBom([]);
                return;
            }

            try {
                const resLv = await API_GET_LEVELPART({ formular: FormRm.formular });
                if (resLv.result === 1 && resLv.data.length > 0) {
                    setLevelBom(resLv.data);
                } else {
                    setLevelBom([]);
                }
            } catch (err) {
                setLevelBom([]);
            }
        };

        const handlePartName = async () => {
            if (!FormRm.formular || FormRm.part_level == null) {
                setPartBom([]);
                return;
            }

            try {
                const res = await API_GET_PARTBOM({
                    formular: FormRm.formular,
                    level: FormRm.part_level
                });

                if (res.result === 1 && res.data.length > 0) {
                    setPartBom(res.data);
                } else {
                    setPartBom([]);
                }
            } catch (err) {
                console.error(err);
                setPartBom([]);
            }
        };

        handleLevelPart();
        handlePartName();
    }, [FormRm.formular, FormRm.part_level]);

    {/* if open from Modal Detail */ }
    useEffect(() => {
        if (open && data && data.length > 0) {
            setLockFormular(data[0].formular);
            setFormPart((prev) => ({
                ...prev,
                formular: data[0].formular.toUpperCase(),
            }));
            setFormRm((prev) => ({
                ...prev,
                formular: data[0].formular.toUpperCase(),
            }));
        }
    }, [data, open])

    useEffect(() => {
        if (FormRm.part_level !== undefined && FormRm.part_level !== null) {
            setFormRm(prev => ({
                ...prev,
                level: (Number(prev.part_level) + 1).toString(),
            }));
        }
    }, [FormRm.part_level]);

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
                    <form action="" className="bg-sky-50 dark:bg-gray-800 p-2 rounded-lg shadow-md text-sm overflow-auto">
                        <FormItem label="FORMULAR:" labelWidth="">

                            <Select
                                placeholder="SELECT FORMULAR"
                                className="w-full custom-yellow-select"
                                value={lockFormular || FormPart.formular}
                                disabled={!!lockFormular}
                                options={moldList.map(item => ({
                                        label: item.partcode,
                                        value: item.partcode
                                    }))}
                                onChange={(value) => {
                                        setFormPart(prev => ({
                                            ...prev,
                                            formular: value
                                        }))
                                    }}
                            />

                        </FormItem>
                    </form>
                    <div className="flex flex-col gap-3 my-2">
                        <form action="" className="bg-orange-50 dark:bg-gray-800 p-2 rounded-lg shadow-md text-sm overflow-auto">

                            <FormItem label="PART:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter PART"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="part_code"
                                    value={FormPart.part_code.toLocaleUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="PART NAME:" labelWidth="">
                                <Input
                                    type="text"
                                    readOnly
                                    placeholder="Enter PART NAME"
                                    className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="part_name"
                                    value={partName}
                                />
                            </FormItem>
                            <FormItem label="QTY:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter QTY"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="qty"
                                    value={FormPart.qty.toLocaleUpperCase()}
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
                                    value={FormPart.level}
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
                                dataSource={CrPrtBom}
                                columns={columns}
                                bordered
                                className="m-2"
                            />
                        </div>

                        <div className="flex justify-center mt-3">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                                onClick={handleSavePrtBom}
                            >
                                SAVE
                            </button>
                        </div>

                    </div>
                </div>
        },
        {
            key: '2',
            label: 'ADD RAW MATERIALS',
            children:
                <div>
                    <div className="text-black font-semibold dark:text-white text-sm">
                        RAW MATERIALS
                        <br />
                        เพิ่มข้อมูล (raw materails)
                    </div>
                    <hr className="text-gray-200 my-3" />
                    <form action="" className="bg-sky-50 border border-sky-100 dark:bg-gray-800 p-2 rounded-md text-sm overflow-auto">
                        <FormItem label="FORMULAR:" labelWidth="">

                            <Select
                                placeholder="SELECT FORMULAR"
                                className="w-full custom-yellow-select"
                                value={lockFormular || FormPart.formular}
                                disabled={!!lockFormular}
                                options={moldList.map(item => ({
                                        label: item.partcode,
                                        value: item.partcode
                                    }))}
                                onChange={(value) => {
                                        setFormRm(prev => ({
                                            ...prev,
                                            formular: value
                                        }))
                                    }}
                            />
                        </FormItem>
                    </form>
                    <div className="flex flex-col gap-3 my-2">
                        <form action="" className="bg-orange-50 border border-orange-100 dark:bg-gray-800 p-2 rounded-lg shadow-md text-sm overflow-auto">
                            <FormItem label="PART LEVEL:" labelWidth="">
                                <Select
                                    placeholder='SELECT PART LEVEL'
                                    className="w-full"
                                    value={FormRm.part_level}
                                    options={levelBom.map(item => ({
                                        label: item.level,
                                        value: Number(item.level)
                                    }))}
                                    onChange={(value) => {
                                        setFormRm(prev => ({
                                            ...prev,
                                            part_level: Number(value)
                                        }))
                                    }}
                                />
                            </FormItem>
                            <FormItem label="PART:" labelWidth="">
                                <Select
                                    placeholder='SELECTED PART'
                                    className="w-full"
                                    value={FormRm.part_code}
                                    options={partBom.map(item => ({
                                        label: item.partcode,
                                        value: item.partcode
                                    }))}
                                    onChange={(value) => {
                                        setFormRm(prev => ({
                                            ...prev,
                                            part_code: value,
                                            part_name: partBom.find(p => p.partcode === value)?.partname || "",
                                            seq: partBom.find(p => p.partcode === value)?.seq || ""
                                        }));
                                        setPrtNameRm(partBom.find(p => p.partcode === value)?.partname || "");
                                    }}
                                />
                            </FormItem>
                            <FormItem label="PART NAME:" labelWidth="">
                                <Input
                                    type="text"
                                    readOnly
                                    placeholder="Enter RM"
                                    className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="part_name"
                                    value={prtNamerm}
                                />
                            </FormItem>
                            <FormItem label="RM:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter RM"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="rm_code"
                                    value={FormRm.rm_code?.toLocaleUpperCase()}
                                    onChange={handleChangeRm}
                                />
                            </FormItem>
                            <FormItem label="RM NAME:" labelWidth="">
                                <Input
                                    type="text"
                                    readOnly
                                    placeholder="Enter RM NAME"
                                    className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="rm_name"
                                    value={childName}
                                />
                            </FormItem>
                            <FormItem label="QTY:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter QTY"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="qty"
                                    value={FormRm.qty.toLocaleUpperCase()}
                                    onChange={handleChangeRm}
                                />
                            </FormItem>
                            <FormItem label="LEVEL:" labelWidth="">
                                <Input
                                    readOnly
                                    type="text"
                                    placeholder="Enter LEVEL"
                                    className="!bg-gray-100 !border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="level"
                                    value={FormRm.level}
                                />
                            </FormItem>

                            <div className="flex justify-end mt-3">
                                <button
                                    type="button"
                                    className="bg-green-500 hover:bg-green-700 text-white font-semibold p-2 rounded-3xl"
                                    onClick={handleAddRm}
                                >
                                    <AddIcon />
                                </button>
                            </div>
                        </form>

                        <div className="conatainer bg-gray-50 border-gray-50 rounded-lg">
                            <Table
                                dataSource={CrRmBom}
                                columns={columsrm}
                                bordered
                                className="m-2"
                            />
                        </div>

                        <div className="flex justify-center mt-3">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                                onClick={handleSaveRm}
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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
            {/* <EditBoomMD open={isMdEditBooms} close={(val) => setIsMdEditBooms(val)} onsave={() => console.log('save')} data={CrBoom} /> */}
        </Modal>
    )
}

export default CreateBoomMD