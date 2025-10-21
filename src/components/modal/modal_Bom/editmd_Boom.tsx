import { Input, Modal, Select, Spin } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import type { Addprtbom, Addrmbom, BomData } from "../../../interface/mParam";
import type { ResPartBom } from "../../../interface/dbRes";
import { API_EDITBOM, API_GET_LEVELPART, API_GET_PARTBOM, API_GETNAME_BOM } from "../../../service/molddie.service";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

interface Props {
    open: boolean;
    close: (val: boolean) => void;
    onsave: (formular: string) => void;
    data: BomData[]
}

interface FormItem {
    label: string;
    children: ReactNode;
    labelWidth: string;
}

const FormItem: React.FC<FormItem> = ({ label, children, labelWidth }) => (
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

function EditBoomMD(props: Props) {

    const { open, close, onsave, data } = props;

    const redux = useSelector((state: RootState) => state.login);

    const [FormEdtPrt, setFormEdtPrt] = useState<Addprtbom>({
        formular: '',
        part_code: '',
        part_name: '',
        qty: '',
        level: '',
        rev: '',
        crby: '',
    });

    const [FormEdtRm, setFormEdtRm] = useState<Addrmbom>({
        formular: '',
        part_level: 0,
        part_code: '',
        part_name: '',
        rm_code: '',
        rm_name: '',
        qty: '',
        level: '',
        rev: '',
        crby: '',
    });

    const [partName, setPartName] = useState<string>('');
    const [childName, setChildName] = useState<string>('');
    const [isPartOnly, setIsPartOnly] = useState<'part' | 'rm'>('part');
    const [partBom, setPartBom] = useState<ResPartBom[]>([])
    const [levelBom, setLevelBom] = useState<ResPartBom[]>([])

    {/* check info to select form */ }
    useEffect(() => {
        if (!data || data.length === 0) return;

        const item = data[0];
        const isPart = item.level === '0' && (!item.part_name || item.part_name.trim() === '');
        setIsPartOnly(isPart ? 'part' : 'rm');

        const partlv = parseInt(item.level) === 0 ? 0 : parseInt(item.level) - 1;

        if (isPart) {
            setFormEdtPrt({
                formular: item.formular,
                part_code: item.child_code || '',
                part_name: item.child_name || '',
                qty: item.qty || '',
                level: item.level || '',
                rev: item.rev || '',
                crby: item.crby || '',
            });
        } else {
            setFormEdtRm({
                formular: item.formular,
                part_level: partlv,
                part_code: item.part_code || '',
                part_name: item.part_name || '',
                rm_code: item.child_code || '',
                rm_name: item.child_name || '',
                qty: item.qty || '',
                level: item.level || '',
                rev: item.rev || '',
                crby: item.crby || '',
            });
        }
    }, [data]);

    {/*get partname and childname */ }
    useEffect(() => {
        const fetchPartName = async () => {
            const code = FormEdtPrt.part_code || FormEdtRm.part_code;
            if (!code) return;

            const res = await API_GETNAME_BOM({ part_code: code });
            setPartName(res.result === 1 && res.data.length > 0 ? res.data[0].prt_Name : '');
        };

        const fetchChildName = async () => {
            if (!FormEdtRm.rm_code) return;

            const res = await API_GETNAME_BOM({ part_code: FormEdtRm.rm_code });
            setChildName(res.result === 1 && res.data.length > 0 ? res.data[0].prt_Name : '');
        };

        if (isPartOnly === 'part') {
            fetchPartName();
        } else if (isPartOnly === 'rm') {
            fetchPartName();
            fetchChildName();
        }
    }, [FormEdtPrt.part_code, FormEdtRm.part_code, FormEdtRm.rm_code, isPartOnly]);

    {/* merge partname, childname to setFormEdtRm */ }
    useEffect(() => {
        setFormEdtRm(prev => ({
            ...prev,
            part_name: partName,
            rm_name: childName
        }));
    }, [partName, childName]);

    {/* get info level and partcode */ }
    useEffect(() => {
        const handleLevelPart = async () => {
            if (!FormEdtRm.formular) {
                setLevelBom([]);
                return;
            }

            try {
                const resLv = await API_GET_LEVELPART({ formular: FormEdtRm.formular });
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
            if (!FormEdtRm.formular || FormEdtRm.part_level == null) {
                setPartBom([]);
                return;
            }

            try {
                const res = await API_GET_PARTBOM({
                    formular: FormEdtRm.formular,
                    level: FormEdtRm.part_level
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
    }, [FormEdtRm.formular, FormEdtRm.part_level]);

    {/* set value level of setFormEdtRm */ }
    useEffect(() => {
        if (FormEdtRm.part_level !== undefined && FormEdtRm.part_level !== null) {
            setFormEdtRm(prev => ({
                ...prev,
                level: (Number(prev.part_level) + 1).toString(),
            }));
        }
    }, [FormEdtRm.part_level]);


    const handleChangePrt = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormEdtPrt(prev => ({
            ...prev,
            [name]: value,
            part_name: partName
        }));
    }

    const handleChangeRm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormEdtRm(prev => {
            const newPartLv = Number(prev.part_level) || 0;
            const newLv = newPartLv + 1;

            return {
                ...prev,
                [name]: value,
                part_name: partName,
                rm_name: childName,
                level: newLv.toString(),
            }
        });
    }

    const handleClose = () => {
        close(false);
        // reset form
        setFormEdtPrt({
            formular: '',
            part_code: '',
            part_name: '',
            qty: '',
            level: '',
            rev: '',
            crby: '',
        });
        setFormEdtRm({
            formular: '',
            part_level: 0,
            part_code: '',
            part_name: '',
            rm_code: '',
            rm_name: '',
            qty: '',
            level: '',
            rev: '',
            crby: '',
        });
        setPartName('');
        setChildName('');
    }

    const handleApiResponse = (res: any) => {

        const curformularprt = FormEdtPrt.formular || "";
        const curformularrm = FormEdtRm.formular || "";

        if (res.result === 1) {
            Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                text: res.message,
                customClass: {
                    container: 'swal-top-modal'
                }
            }).then(() => {
                if (isPartOnly === 'part') {
                    setFormEdtPrt({ formular: '', part_code: '', part_name: '', qty: '', level: '', rev: '', crby: '' });
                    setPartName('');
                    handleClose();
                    onsave(curformularprt);
                } else {
                    setFormEdtRm({ formular: '', part_level: 0, part_code: '', part_name: '', rm_code: '', rm_name: '', qty: '', level: '', rev: '', crby: '' });
                    setPartName('');
                    setChildName('');
                    handleClose();
                    onsave(curformularrm);
                }
            });
        } else if (res.result === -1) {
            Swal.fire({
                icon: 'warning',
                title: 'บันทึกข้อมูลไม่สำเร็จ',
                text: res.message,
                customClass: {
                    container: 'swal-top-modal'
                }
            });
        } else if (res.result === -2) {
            Swal.fire({
                icon: 'error',
                title: 'บันทึกข้อมูลไม่สำเร็จ',
                text: res.message,
                customClass: {
                    container: 'swal-top-modal'
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'บันทึกข้อมูลไม่สำเร็จ',
                text: 'เกิดข้อผิดพลาดกรุณาตรวจสอบอีกครั้ง'
            });
        }
    };

    const handlesaveEdtbom = async () => {

        if (isPartOnly === 'part') {
            if (!FormEdtPrt.formular || !FormEdtPrt.part_code || !FormEdtPrt.qty) {
                Swal.fire({
                    icon: 'warning',
                    title: 'ข้อมูลไม่ครบถ้วน',
                    text: 'กรุณากรอกข้อมูลให้ครบ'
                });
                return; // ต้อง return หลัง alert
            }

            const resedtprt = await API_EDITBOM({
                id: data[0].id,
                formular: FormEdtPrt.formular,
                part_code: FormEdtPrt.part_code,
                part_name: partName,
                rm_code: '',
                rm_name: '',
                qty: FormEdtPrt.qty,
                level: FormEdtPrt.level || "",
                rev: FormEdtPrt.rev || "",
                crby: redux.user?.name || ""
            });

            handleApiResponse(resedtprt);

        } else if (isPartOnly === 'rm') {
            if (!FormEdtRm.formular || !FormEdtRm.part_code || !FormEdtRm.rm_code || !FormEdtRm.qty) {
                Swal.fire({
                    icon: 'warning',
                    title: 'ข้อมูลไม่ครบถ้วน',
                    text: 'กรุณากรอกข้อมูลให้ครบ'
                });
                return;
            }

            const resedtprt = await API_EDITBOM({
                id: data[0].id,
                formular: FormEdtRm.formular,
                part_code: FormEdtRm.part_code,
                part_name: partName,
                rm_code: FormEdtRm.rm_code,
                rm_name: childName,
                qty: FormEdtRm.qty,
                level: FormEdtRm.level || "",
                rev: FormEdtRm.rev || "",
                crby: redux.user?.name || ""
            });

            handleApiResponse(resedtprt);
        }
    };




    return (
        <Modal open={open} onCancel={() => handleClose()} footer={<></>} width='40%' height='80%'>
            <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold">
                BOM MASTER DATA
                <br />
                แก้ไขข้อมูล (bom master)
            </div>
            <hr className="text-gray-200 my-3" />
            <div className="flex flex-col gap-3 my-2">
                {isPartOnly === 'part' ? (
                    <form action="" className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg shadow-md text-sm overflow-auto">


                        <div>
                            <FormItem label="FORMULAR:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter Mold & Die"
                                    className="!bg-yellow-50 !border-yellow-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="formular"
                                    value={FormEdtPrt.formular}
                                    onChange={handleChangePrt}
                                />
                            </FormItem>
                            <FormItem label="PART:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter Mold & Die"
                                    className="!bg-yellow-50 !border-yellow-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="part_code"
                                    value={FormEdtPrt.part_code}
                                    onChange={handleChangePrt}
                                />
                            </FormItem>
                            <FormItem label="PART NAME:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter Mold & Die"
                                    className="!bg-gray-100 !border-gray-200 hover:!bg-gray-50 hover:!border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="part_name"
                                    value={partName}
                                    onChange={handleChangePrt}
                                />
                            </FormItem>
                            <FormItem label="QTY:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter Mold & Die"
                                    className="!bg-yellow-50 !border-yellow-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="qty"
                                    value={FormEdtPrt.qty}
                                    onChange={handleChangePrt}
                                />
                            </FormItem>
                            <FormItem label="LEVEL:" labelWidth="">
                                <Input
                                    readOnly
                                    type="text"
                                    placeholder="Enter Mold & Die"
                                    className="!bg-gray-100 !border-gray-200 hover:!bg-gray-50 hover:!border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="level"
                                    value={FormEdtPrt.level}
                                    onChange={handleChangePrt}
                                />
                            </FormItem>
                        </div>

                    </form>
                ) : isPartOnly === 'rm' ? (
                    <form action="" className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg shadow-md text-sm overflow-auto">

                        <div>
                            <FormItem label="FORMULAR:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter Formular"
                                    className="!bg-yellow-50 !border-yellow-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="formular"
                                    value={FormEdtRm.formular}
                                    onChange={handleChangeRm}
                                />
                            </FormItem>
                            <FormItem label="PART LEVEL:" labelWidth="">
                                <Select
                                    placeholder='SELECT PART LEVEL'
                                    className="w-full"
                                    value={FormEdtRm.part_level}
                                    options={levelBom.map(item => ({
                                        label: item.level,
                                        value: Number(item.level)
                                    }))}
                                    onChange={(value) => {
                                        setFormEdtRm(prev => ({
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
                                    value={FormEdtRm.part_code}
                                    options={partBom.map(item => ({
                                        label: item.partcode,
                                        value: item.partcode
                                    }))}
                                    onChange={(value) => {
                                        setFormEdtRm(prev => ({
                                            ...prev,
                                            part_code: value,
                                            part_name: partBom.find(p => p.partcode === value)?.partname || "",
                                            seq: partBom.find(p => p.partcode === value)?.seq || ""
                                        }));
                                        setPartName(partBom.find(p => p.partcode === value)?.partname || "");
                                    }}
                                />
                            </FormItem>
                            <FormItem label="PART NAME:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter Partname"
                                    className="!bg-gray-100 !border-gray-200 hover:!bg-gray-50 hover:!border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="part_name"
                                    value={partName}
                                />
                            </FormItem>
                            <FormItem label="RM:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter RM"
                                    className="!bg-amber-50 !border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="rm_code"
                                    value={FormEdtRm.rm_code?.toLocaleUpperCase()}
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
                                    onChange={handleChangeRm}
                                />
                            </FormItem>
                            <FormItem label="QTY:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter Mold & Die"
                                    className="!bg-yellow-50 !border-yellow-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
                                    name="qty"
                                    value={FormEdtRm.qty}
                                    onChange={handleChangeRm}
                                />
                            </FormItem>
                            <FormItem label="LEVEL:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter Mold & Die"
                                    className="!bg-gray-100 !border-gray-200 hover:!bg-gray-50 hover:!border-gray-200 focus:ring-2 focus:ring-gray-200"
                                    name="level"
                                    value={FormEdtRm.level}
                                    readOnly
                                />
                            </FormItem>
                        </div>


                    </form>
                ) : (
                    <div className="flex justify-center items-center">
                        <Spin></Spin>
                    </div>
                )}

                <div className="flex justify-center mt-3">
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                        onClick={handlesaveEdtbom}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default EditBoomMD

