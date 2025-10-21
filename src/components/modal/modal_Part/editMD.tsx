import { DeleteOutlined, SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Button, DatePicker, Input, InputNumber, message, Modal, Select, Upload, type UploadFile, type UploadProps } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import type { ResDetPartmst } from "../../../interface/dbRes";
import type { CreatePartMst } from "../../../interface/mParam";
import dayjs from "dayjs";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { API_EDIT_PARTMASTER } from "../../../service/molddie.service";
const BASE = import.meta.env.VITE_BASE;

interface Props {
    open: boolean;
    close: (val: boolean) => void;
    onsave: () => void;
    data: ResDetPartmst[];
}

interface FromItem {
    label: string;
    children: ReactNode;
    labelWidth: string;
}

interface SectionProps {
    title: string;
    children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
    <div className="mt-2">
        <div className="text-blue-900 text-sm font-bold dark:text-white">{title}</div>
        <hr className="text-gray-200 mt-2" />
        <div className="grid grid-cols-2 gap-2 mt-2">{children}</div>
    </div>
);

const FormItem: React.FC<FromItem> = ({ label, children, labelWidth }) => (
    <div className="flex flex-row items-center">
        <label
            className="text-black dark:text-white font-semibold text-end mr-2"
            style={{ width: labelWidth || "13rem" }}
        >
            {label}
        </label>
        {children}
    </div>
);

function EditPartMaster(props: Props) {

    const { open, close, onsave, data } = props;
    const redux = useSelector((state: RootState) => state.login);

    const datatype = ['P', 'MD'];
    const [formPrtmst, setFormPrtMst] = useState<CreatePartMst>({
        prtcode: '',
        prtname: '',
        prttype: undefined,
        prtdwg: '',
        model: '',
        budgetno: '',
        invno: '',
        maker: '',
        vender: '',
        recdate: dayjs().format('YYYYMMDD'),
        price: '',
        currency: 'TBH',
        strdate: dayjs().format('YYYYMMDD'),
        type: '',
        dimension: '',
        weight: '',
        cavity: '',
        runnersyt: '',
        maxshot: '',
        shotperday: '',
        material: '',
        fixedasset: '',
        FilePath: '',
        FROMFILE: null,
        crby: ''
    })
    const [currency, setCurrency] = useState(formPrtmst.currency || "฿");
    const [filelist, setFileList] = useState<UploadFile[]>([]);

    const { Option } = Select;
    const selectAfter = (
        <Select
            defaultValue="TBH"
            style={{ width: 60 }}
            value={currency}
            onChange={(val) => {
                setCurrency(val);
                setFormPrtMst(prev => ({
                    ...prev,
                    currency: val
                }))
            }}
        >
            <Option value="TBH">฿</Option>
            <Option value="USD">$</Option>
            <Option value="EUR">€</Option>
            <Option value="GBP">£</Option>
            <Option value="CNY">¥</Option>
        </Select>
    );

    const allowedExtensions = ['.jpeg', '.jpg', '.png', '.pdf', '.heif'];

    const beforeUpload = (file: any) => {
        const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        const isAllowed = allowedExtensions.includes(fileExt);

        if (!isAllowed) {
            message.error(`${file.name} is not a valid file type. Please upload JPEG, PNG, JPG, HEIF or PDF.`);
        }

        return isAllowed || Upload.LIST_IGNORE;
    };

    const propPDF: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        const _t: any = newFileList[0].originFileObj;
        setFileList(newFileList);
        setFormPrtMst(prev => ({ ...prev, FROMFILE: _t }));
    };

    useEffect(() => {
        if (!data || data.length === 0) return;

        const item = data[0];
        setFormPrtMst({
            prtcode: item.prt_Code,
            prtname: item.prt_Name,
            prttype: item.prt_Type,
            prtdwg: item.prt_DWG,
            model: item.prt_Model,
            budgetno: item.budgetNo,
            invno: item.invoiceNo,
            maker: item.maker,
            vender: item.vender,
            recdate: item.receiveDate,
            price: item.price,
            currency: item.currency,
            strdate: item.startDate,
            type: item.type,
            dimension: item.dimension,
            weight: item.weight,
            cavity: item.cavity,
            runnersyt: item.run_SYS,
            maxshot: item.maX_SHOT,
            shotperday: item.cal_ShotPerDay,
            material: item.material,
            fixedasset: item.fixedAsset,
            FilePath: item.filePath,
            FROMFILE: null,
            crby: item.cby
        });

        if (item.filePath) {
            setFileList([{
                uid: '-1',
                name: item.fileNameOrg || 'file',
                status: 'done',
                url: item.filePath.startsWith('/')
                    ? `${import.meta.env.VITE_BASE}${item.filePath}`
                    : item.filePath
            }]);
        } else {
            setFileList([]); // ไม่มีไฟล์ก็ล้างออก
        }

    }, [data]);

    const handleClose = () => {
        close(false)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormPrtMst(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmitPrtMst = async () => {

        if (!formPrtmst.prtcode || !formPrtmst.prtname || !formPrtmst.type || !formPrtmst.prtdwg || !formPrtmst.model) {
            Swal.fire({
                icon: 'warning',
                title: 'บันทึกข้อมูลไม่สำเร็จ',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน'
            })
            return;
        }

        const fullPath = `/files/`;
        try {
            const res = await API_EDIT_PARTMASTER({
                prtcode: formPrtmst.prtcode,
                prtname: formPrtmst.prtname,
                prttype: formPrtmst.prttype,
                prtdwg: formPrtmst.prtdwg,
                model: formPrtmst.model,
                budgetno: formPrtmst.budgetno || "",
                invno: formPrtmst.invno,
                maker: formPrtmst.maker,
                vender: formPrtmst.vender,
                recdate: formPrtmst.recdate,
                price: formPrtmst.price,
                currency: formPrtmst.currency,
                strdate: formPrtmst.strdate,
                type: formPrtmst.type,
                dimension: formPrtmst.dimension,
                weight: formPrtmst.weight,
                cavity: formPrtmst.cavity,
                runnersyt: formPrtmst.runnersyt,
                maxshot: formPrtmst.maxshot || "",
                shotperday: formPrtmst.shotperday || "",
                material: formPrtmst.material,
                fixedasset: formPrtmst.fixedasset || "",
                FilePath: fullPath,
                FROMFILE: formPrtmst.FROMFILE,
                crby: redux.user?.name || ""
            });
            console.log(
                {
                    prtcode: formPrtmst.prtcode,
                    prtname: formPrtmst.prtname,
                    prttype: formPrtmst.prttype,
                    prtdwg: formPrtmst.prtdwg,
                    model: formPrtmst.model,
                    budgetno: formPrtmst.budgetno || "",
                    invno: formPrtmst.invno,
                    maker: formPrtmst.maker,
                    vender: formPrtmst.vender,
                    recdate: formPrtmst.recdate,
                    price: formPrtmst.price,
                    currency: formPrtmst.currency,
                    strdate: formPrtmst.strdate,
                    type: formPrtmst.type,
                    dimension: formPrtmst.dimension,
                    weight: formPrtmst.weight,
                    cavity: formPrtmst.cavity,
                    runnersyt: formPrtmst.runnersyt,
                    maxshot: formPrtmst.maxshot || "",
                    shotperday: formPrtmst.shotperday || "",
                    material: formPrtmst.material,
                    fixedasset: formPrtmst.fixedasset || "",
                    FilePath: fullPath,
                    FROMFILE: formPrtmst.FROMFILE,
                    crby: redux.user?.name || ""
                }
            )

            if (res.result === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสำเร็จ',
                    text: res.message,
                    showConfirmButton: false,
                }).then(() => {
                    setFormPrtMst({
                        prtcode: '',
                        prtname: '',
                        prttype: undefined,
                        prtdwg: '',
                        model: '',
                        budgetno: '',
                        invno: '',
                        maker: '',
                        vender: '',
                        recdate: dayjs().format('YYYYMMDD'),
                        price: '',
                        currency: 'THB',
                        strdate: dayjs().format('YYYYMMDD'),
                        type: '',
                        dimension: '',
                        weight: '',
                        cavity: '',
                        runnersyt: '',
                        maxshot: '',
                        shotperday: '',
                        material: '',
                        fixedasset: '',
                        FilePath: '',
                        FROMFILE: null,
                        crby: ''
                    });
                    onsave();
                    handleClose();
                });
            } else if (res.result === -1) {
                Swal.fire({
                    icon: 'error',
                    title: 'บันทึกข้อมูลไม่สำเร็จ',
                    text: res.message
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'บันทึกข้อมูลไม่สำเร็จ',
                    text: res.message
                })
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'บันทึกข้อมูลไม่สำเร็จ',
                text: 'เกิดข้อผิดพลาดกรุณาตรวจสอบอีกครั้ง'
            })
        }
    }

    return (
        <Modal open={open} onCancel={() => handleClose()} footer={<></>} width="50%" height="80%">
            <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <div className="text-black font-semibold dark:text-white text-sm">
                    PART MASTER DATA
                    <br />
                    แก้ไข(part master)
                </div>
                <hr className="text-gray-200 mt-2" />
                <div className="flex flex-col gap-3 mt-2">
                    <form className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg shadow-md text-xs overflow-auto" >

                        <Section title="PART INFORMATION">
                            <FormItem label="PART CODE:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter PART CODE"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="prtcode"
                                    value={formPrtmst.prtcode.toUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="PART NAME:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter PART NAME"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="prtname"
                                    value={formPrtmst.prtname.toUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="PART TYPE:" labelWidth="13rem">
                                <Select
                                    placeholder='SELECTED PART TYPE'
                                    className="w-full custom-yellow-select"
                                    value={formPrtmst.prttype}
                                    options={datatype.map(item => ({
                                        label: item,
                                        value: item
                                    }))}
                                    onChange={(value) => {
                                        setFormPrtMst(prev => ({
                                            ...prev,
                                            prttype: value
                                        }))
                                    }}
                                />
                            </FormItem>
                            <FormItem label="PART DWG:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter PART DWG"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="prtdwg"
                                    value={formPrtmst.prtdwg.toUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="MODEL:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter MODEL"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="model"
                                    value={formPrtmst.model.toUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="BUDGET NO.:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter BUDGET NO."
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="budgetno"
                                    value={(formPrtmst.budgetno || '').toUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="INVOICE NO.:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter INVOICE NO."
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="invno"
                                    value={formPrtmst.invno.toUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="MAKER" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter MAKER"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="maker"
                                    value={formPrtmst.maker.toUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="VENDER" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter VENDER"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="vender"
                                    value={formPrtmst.vender.toUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="RECEIVE DATE:" labelWidth="13rem">
                                <DatePicker
                                    className="w-full !bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="recdate"
                                    value={formPrtmst.recdate ? dayjs(formPrtmst.recdate) : null}
                                    onChange={(_date, dateString) => {
                                        setFormPrtMst(prev => ({
                                            ...prev,
                                            recdate: Array.isArray(dateString) ? dateString[0] : dateString
                                        }))
                                    }}
                                />
                            </FormItem>
                            <FormItem label="PRICE:" labelWidth="13rem">
                                <InputNumber
                                    addonAfter={selectAfter}
                                    defaultValue={0}
                                    className="w-full !bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="price"
                                    value={Number(formPrtmst.price) || 0}
                                    onChange={(value) => {
                                        setFormPrtMst(prev => ({
                                            ...prev,
                                            price: value?.toString() || ""
                                        }))
                                    }}
                                />
                            </FormItem>
                            <FormItem label="START DATE:" labelWidth="13rem">
                                <DatePicker
                                    className="w-full !bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="strdate"
                                    value={formPrtmst.strdate ? dayjs(formPrtmst.strdate) : null}
                                    onChange={(_date, dateString) => {
                                        setFormPrtMst(prev => ({
                                            ...prev,
                                            strdate: Array.isArray(dateString) ? dateString[0] : dateString
                                        }))
                                    }}
                                />
                            </FormItem>
                            <FormItem label="TYPE:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter TYPE"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="type"
                                    value={formPrtmst.type.toUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="DIMENSION:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter DIMENSION"
                                    suffix="mm"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="dimension"
                                    value={formPrtmst.dimension}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="WEIGHT:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter WEIGHT"
                                    suffix="KG"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="weight"
                                    value={formPrtmst.weight}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="CAVITY:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter CAVITY"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="cavity"
                                    value={formPrtmst.cavity}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="RUNNER SYSTEM:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter RUNNER SYSTEM"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="runnersyt"
                                    value={formPrtmst.runnersyt}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="MAX SHOT:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter MAX SHOT"
                                    disabled={formPrtmst.prttype === 'P'}
                                    className={formPrtmst.prttype === 'P'
                                        ? '!bg-gray-100 !border-gray-200 cursor-not-allowed'
                                        : '!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200'
                                    }
                                    name="maxshot"
                                    value={(formPrtmst.maxshot || "")}
                                    onChange={handleChange}
                                />
                            </FormItem>

                            <FormItem label="SHOT PERDAY:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter SHOT PERDAY"
                                    disabled={formPrtmst.prttype === 'P'}
                                    className={formPrtmst.prttype === 'P'
                                        ? '!bg-gray-100 !border-gray-200 cursor-not-allowed'
                                        : '!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200'
                                    }
                                    name="shotperday"
                                    value={(formPrtmst.shotperday || "")}
                                    onChange={handleChange}
                                />

                            </FormItem>
                            <FormItem label="MATERAL:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter MATERAL"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="material"
                                    value={formPrtmst.material.toUpperCase()}
                                    onChange={handleChange}
                                />
                            </FormItem>
                            <FormItem label="FIXED ASSET:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter FIXED ASSET"
                                    className="!bg-yellow-50 !border-yellow-200 hover:bg-yellow-50 hover:border-yellow-200 focus:ring-1 focus:ring-yellow-100"
                                    name="fixedasset"
                                    value={(formPrtmst.fixedasset || "")}
                                    onChange={handleChange}
                                />
                            </FormItem>
                        </Section>
                        <Section title="PICTURE">
                            {/* <Upload
                                name="file"
                                multiple={false}
                                listType="picture"
                                fileList={filelist}
                                accept=".jpeg,.jpg,.png,.pdf,.heif"
                                beforeUpload={(file) => {
                                    beforeUpload(file);
                                    setFileList([{
                                        uid: file.uid,
                                        name: file.name,
                                        status: 'done',
                                        url: URL.createObjectURL(file),
                                        originFileObj: file
                                    }]);
                                    setFormPrtMst(prev => ({ ...prev, FROMFILE: file }));
                                    return false;
                                }}
                                onChange={propPDF}
                            >
                                <Button type="primary" icon={<UploadFileOutlined />} className="mt-2">
                                    Upload
                                </Button>
                            </Upload> */}
                            <Upload
                                name="file"
                                multiple={false}
                                listType="picture"
                                fileList={filelist}
                                accept=".jpeg,.jpg,.png,.pdf,.heif"
                                beforeUpload={(file) => {
                                    const isAllowed = beforeUpload(file); // ตรวจไฟล์
                                    return isAllowed ? false : Upload.LIST_IGNORE; // false = ไม่ auto upload
                                }}
                                onChange={({ fileList: newFileList }) => {
                                    setFileList(newFileList);

                                    const fileObj = newFileList[0]?.originFileObj || null;
                                    setFormPrtMst(prev => ({ ...prev, FROMFILE: fileObj }));
                                }}
                            >
                                <Button type="primary" icon={<UploadFileOutlined />} className="mt-2">
                                    Upload
                                </Button>
                            </Upload>

                        </Section>


                        <hr className="text-gray-200 mt-3" />
                        <div className="flex flex-row justify-between items-center">
                            <button
                                type="button"
                                className="m-2 p-2 bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 rounded-lg text-white font-semibold"
                            // onClick={handleSubmitPrtMst}
                            >
                                <DeleteOutlined />DELETE
                            </button>
                            <button
                                type="button"
                                className="m-2 p-2 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-lg text-white font-semibold"
                                onClick={handleSubmitPrtMst}
                            >
                                <SaveOutlined />SAVE
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </Modal>
    )
}

export default (EditPartMaster)
