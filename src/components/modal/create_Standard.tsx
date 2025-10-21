import { Input, Modal, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect, type ReactNode } from "react";
import AddIcon from '@mui/icons-material/Add';
import type { AddPMStandard, PartListDetail } from "../../interface/pmParam";
import { API_GETMDLIST, API_GETPARTLIST } from "../../service/pm.service";
import { useSelector } from "react-redux";

interface Props {
    open: boolean;
    close: (val: boolean) => void;
    onsave: (payload: any) => void;
}

interface FormItemProps {
    label: string;
    children: ReactNode;
    labelWidth?: string;
}

const FormItem: React.FC<FormItemProps> = ({ label, children, labelWidth }) => (
    <div className="flex flex-row items-center my-2">
        <label
            className="text-black dark:text-white font-semibold text-end px-10"
            style={{ width: labelWidth || '13rem' }}
        >
            {label}
        </label>
        {children}
    </div>
);

const pmMethods = [
    { code: 'CLEAN', name: 'การ Cleaning' },
    { code: 'REPLACE', name: 'การเปลี่ยน Part' },
];

function CreateStandard(props: Props) {
    const { open, close, onsave } = props;
    const empdata = useSelector((state: any) => state.login.user);
    const empcode = empdata.code;

    const [Form, setForm] = useState<AddPMStandard>({
        mdCode: '',
        pmType: '',
        pmShot: 0,
        pmAlrtshot: 0,
        pmPeriod: 0,
        pmAlrtperiod: 0,
        pmExplain: '',
        pmCost: 0,
        seq: 0,
        pmMethod: '',
        pmDetail: '',
        prtCode: '',
        prtQty: 0,
        um: '',
        unitPrice: 0,
        amount: 0,
        remark: '',
        empcode: '',
    });

    const [pmDetail, setpmDetail] = useState<AddPMStandard[]>([]);
    const [partList, setPartList] = useState<PartListDetail[]>([]);
    const [partName, setPartName] = useState('');
    const [mdList, setMDList] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await API_GETPARTLIST();
            if (res && res.length > 0) setPartList(res);

            API_GETMDLIST()
                .then((res) => {
                    setMDList(res);
                    console.log(res)
                })
        };

        fetchData();
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string | number) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        if (!Form.pmMethod) {
            alert('กรุณาเลือกวิธีการ PM และกรอกข้อมูล');
            return;
        }

        if (Form.pmMethod !== 'REPLACE') {
            const hasNonReplace = pmDetail.some(d => d.pmMethod !== 'REPLACE');
            if (hasNonReplace) {
                alert('สามารถเพิ่มได้แค่รายการเดียว');
                return;
            }
        }

        if (Form.amount == 0) {
            alert('กรุณาระบุจำนวนค่าใช้จ่าย');
            return;
        }

        let amount = 0;
        if (Form.pmMethod === 'REPLACE') {
            amount = (Form.unitPrice || 0) * (Form.prtQty || 0);
        } else {
            amount = Form.amount || 0;
        }

        const newDetail: AddPMStandard = {
            ...Form,
            seq: pmDetail.length + 1,
            amount
        };

        const updatedDetails = [...pmDetail, newDetail];
        setpmDetail(updatedDetails);

        const totalCost = updatedDetails.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
        setForm(prev => ({ ...prev, pmCost: totalCost }));

        setForm(prev => ({
            ...prev,
            pmMethod: '',
            pmDetail: '',
            prtCode: '',
            prtQty: 0,
            unitPrice: 0,
            amount: 0,
            remark: '',
        }));
        setPartName('');
    };

    const handleDelete = (index: number) => {
        const updated = pmDetail
            .filter((_, i) => i !== index)
            .map((item, idx) => ({
                ...item,
                seq: idx + 1,
            }));

        setpmDetail(updated);

        const totalCost = updated.reduce((sum, d) => sum + (d.amount || 0), 0);
        setForm(prev => ({ ...prev, pmCost: totalCost }));
    };

    const handleClose = () => {
        close(false);
        setForm({
            mdCode: '',
            pmType: '',
            pmShot: 0,
            pmAlrtshot: 0,
            pmPeriod: 0,
            pmAlrtperiod: 0,
            pmExplain: '',
            pmCost: 0,
            seq: 0,
            pmMethod: '',
            pmDetail: '',
            prtCode: '',
            prtQty: 0,
            um: '',
            unitPrice: 0,
            amount: 0,
            remark: '',
            empcode: '',
        });
        setpmDetail([]);
        setPartName('');
    };

    const handleSave = () => {
        if (!Form.mdCode || !Form.pmType) {
            alert('กรุณาระบุ Mold Code และประเภทการ PM');
            return;
        }

        const standard: AddPMStandard = {
            ...Form,
            empcode: empcode
        };

        const payload = {
            standard,
            details: pmDetail
        };
        console.log(payload)

        onsave(payload);
        handleClose();
    };

    const columns: ColumnsType<AddPMStandard> = [
        { title: '#', dataIndex: 'seq', key: 'seq', align: 'center' },
        {
            title: 'วิธีการ PM', dataIndex: 'pmMethod', key: 'pmMethod', align: 'center', render: (value: string) => {
                const method = pmMethods.find(m => m.code === value);
                return method ? method.name : value;
            }
        },
        { title: 'Part', dataIndex: 'prtCode', key: 'prtCode', align: 'center' },
        { title: 'จำนวน', dataIndex: 'prtQty', key: 'prtQty', align: 'center' },
        { title: 'ราคาต่อหน่วย', dataIndex: 'unitPrice', key: 'unitPrice', align: 'center' },
        { title: 'ราคารวม', dataIndex: 'amount', key: 'amount', align: 'center' },
        { title: 'เพิ่มเติม', dataIndex: 'remark', key: 'remark', align: 'center' },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_text, _record, index) => (
                <button className="text-red-500" onClick={() => handleDelete(index)}>
                    Delete
                </button>
            )
        }
    ];

    const isLocked = pmDetail.length > 0;

    return (
        <Modal open={open} onCancel={handleClose} footer={null} width="75%">
            <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <h1 className="font-semibold text-lg mb-3">เงื่อนไขและรายละเอียดการ Preventive Mainternance (PM)</h1>
                <div className="flex flex-col xl:flex-row gap-4">
                    {/* ---------------- เงื่อนไขการ Preventive ---------------- */}
                    <div className="flex-1 p-4 border border-gray-200 rounded-xl shadow">
                        <h2 className="font-semibold mb-3">เงื่อนไขการ Preventive Mainternance (PM)</h2>

                        <FormItem label="Mold Code:">
                            <Select
                                className={`w-full ${isLocked
                                    ? '[&_.ant-select-selector]:!bg-amber-50'
                                    : '[&_.ant-select-selector]:!bg-amber-100'
                                    }`}
                                showSearch
                                value={Form.mdCode}
                                disabled={isLocked}
                                placeholder="Select or type Mold Code"
                                onChange={(val: string) => {
                                    handleSelectChange('mdCode', val);
                                }}
                                options={mdList.map(p => ({
                                    value: p.prtCode,
                                    label: `${p.prtCode} - ${p.prtName}`

                                }))}
                                filterOption={(input, option) =>
                                    option ? option.label.toLowerCase().includes(input.toLowerCase()) : false
                                }
                            >

                            </Select>
                        </FormItem>

                        <FormItem label="ประเภทการ PM:">
                            <Select
                                value={Form.pmType}
                                onChange={(val) => {
                                    handleSelectChange('pmType', val);
                                    if (val === 'S') {
                                        handleSelectChange('pmPeriod', 0);
                                        handleSelectChange('pmAlrtperiod', 0);
                                    } else {
                                        handleSelectChange('pmShot', 0);
                                        handleSelectChange('pmAlrtshot', 0);
                                    }
                                }}
                                className={`w-full ${isLocked
                                    ? '[&_.ant-select-selector]:!bg-amber-50'
                                    : '[&_.ant-select-selector]:!bg-amber-100'
                                    }`}
                                disabled={isLocked}
                                options={[
                                    { value: 'T', label: 'ระยะเวลา' },
                                    { value: 'S', label: 'จำนวนรอบ Shot' },
                                ]}
                            />
                        </FormItem>

                        {Form.pmType === 'S' && (
                            <div className="flex gap-4">
                                <FormItem label="จำนวน Shot:">
                                    <div className="flex items-center">
                                        <Input
                                            type="number"
                                            name="pmShot"
                                            value={Form.pmShot}
                                            onChange={handleChange}
                                            disabled={isLocked}
                                            className={`${isLocked ? '!bg-amber-50' : '!bg-amber-100'} w-24`}
                                        />
                                        <span className="pl-2">Shot</span>
                                    </div>
                                </FormItem>

                                <FormItem label="จำนวน Shot แจ้งเตือน:">
                                    <div className="flex items-center">
                                        <Input
                                            type="number"
                                            name="pmAlrtshot"
                                            value={Form.pmAlrtshot}
                                            onChange={handleChange}
                                            disabled={isLocked}
                                            className={`${isLocked ? '!bg-amber-50' : '!bg-amber-100'} w-24`}
                                        />
                                        <span className="pl-2">Shot</span>
                                    </div>
                                </FormItem>
                            </div>
                        )}

                        {Form.pmType === 'T' && (
                            <div className="flex gap-4">
                                <FormItem label="จำนวนวัน:">
                                    <div className="flex items-center">
                                        <Input
                                            type="number"
                                            name="pmPeriod"
                                            value={Form.pmPeriod}
                                            onChange={handleChange}
                                            disabled={isLocked}
                                            className={`${isLocked ? '!bg-amber-50' : '!bg-amber-100'} w-24`}
                                        />
                                        <span className="pl-2">วัน</span>
                                    </div>
                                </FormItem>

                                <FormItem label="จำนวนวันแจ้งเตือน:">
                                    <div className="flex items-center">
                                        <Input
                                            type="number"
                                            name="pmAlrtperiod"
                                            value={Form.pmAlrtperiod}
                                            onChange={handleChange}
                                            disabled={isLocked}
                                            className={`${isLocked ? '!bg-amber-50' : '!bg-amber-100'} w-24`}
                                        />
                                        <span className="pl-2">วัน</span>
                                    </div>
                                </FormItem>
                            </div>
                        )}

                        <FormItem label="คำอธิบาย:">
                            <Input name="pmExplain" value={Form.pmExplain} onChange={handleChange} />
                        </FormItem>

                        <FormItem label="ค่าใช้จ่ายในการ PM:" >
                            <Input type="number" value={Form.pmCost} readOnly className="!bg-blue-100" />
                        </FormItem>
                    </div>

                    {/* ---------------- รายละเอียดการ Preventive ---------------- */}
                    <div className="flex-1 p-4 border border-gray-200 rounded-xl shadow">
                        <h2 className="font-semibold mb-3">รายละเอียดการ Preventive Mainternance (PM)</h2>

                        <FormItem label="วิธีการ PM:">
                            <Select
                                value={Form.pmMethod}
                                onChange={(val) => handleSelectChange('pmMethod', val)}
                                className="w-full [&_.ant-select-selector]:!bg-amber-100"

                                options={pmMethods.map(m => ({ value: m.code, label: m.name }))}
                            />
                        </FormItem>

                        {Form.pmMethod === 'REPLACE' ? (
                            <>
                                <FormItem label="Part Code:">
                                    <Select
                                        showSearch
                                        value={Form.prtCode}
                                        placeholder="Select or type Part Code"
                                        onChange={(val: string) => {
                                            handleSelectChange('prtCode', val);
                                            const partItem = partList.find(p => p.prtCode === val);
                                            if (partItem) {
                                                setPartName(partItem.prtName);
                                                handleSelectChange('unitPrice', partItem.price);
                                                handleSelectChange('prtQty', 1);
                                                handleSelectChange('amount', partItem.price * 1);
                                            }
                                        }}
                                        className="w-full"
                                        options={partList.map(p => ({
                                            value: p.prtCode,
                                            label: `${p.prtCode} - ${p.prtName}`
                                        }))}
                                        filterOption={(input, option) =>
                                            option ? option.label.toLowerCase().includes(input.toLowerCase()) : false
                                        }
                                    />
                                </FormItem>

                                <FormItem label="Part Name:">
                                    <Input value={partName} readOnly />
                                </FormItem>

                                <FormItem label="จำนวน:">
                                    <Input
                                        type="number"
                                        name="prtQty"
                                        value={Form.prtQty}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleSelectChange('amount', (Form.unitPrice || 0) * Number(e.target.value));
                                        }}
                                    />
                                </FormItem>

                                <FormItem label="ราคาต่อหน่วย:">
                                    <Input type="number" name="unitPrice" value={Form.unitPrice} onChange={handleChange} />
                                </FormItem>

                                <FormItem label="ราคารวม:">
                                    <Input type="number" name="amount" value={Form.amount} readOnly />
                                </FormItem>
                            </>
                        ) : Form.pmMethod != 'REPLACE' && Form.pmMethod != "" ? (
                            <FormItem label="ราคารวม:">
                                <div className="flex flex-col w-full">
                                    <Input type="number" name="amount" value={Form.amount} onChange={(e) => {
                                        const value = Number(e.target.value) || 0;
                                        handleChange(e);
                                        handleSelectChange('prtCode', "-");
                                        handleSelectChange('unitPrice', value);
                                        handleSelectChange('prtQty', 1);
                                        handleSelectChange('amount', value * 1);
                                    }} />
                                    <span className="text-red-500 text-sm">*โปรดระบุจำนวนค่าใช้จ่าย</span>
                                </div>
                            </FormItem>
                        ) : (
                            <div></div>
                        )}

                        <FormItem label="รายละเอียด:">
                            <Input name="remark" value={Form.remark} onChange={handleChange} />
                        </FormItem>

                        <div className="flex justify-end mt-3">
                            <button
                                type="button"
                                onClick={handleAdd}
                                className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-full"
                            >
                                <AddIcon />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="mt-3">
                    <Table
                        dataSource={pmDetail}
                        columns={columns}
                        rowKey={(record) => record.seq}
                        bordered
                        pagination={false}
                    />
                </div>

                <div className="flex justify-center mt-3">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                        onClick={handleSave}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </Modal >
    );
}

export default CreateStandard;
