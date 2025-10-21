import { DatePicker, Input, Modal, Popover, Select, Table } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { API_GETMDLIST, API_GETMOLDSTD, API_GETMOLDSTDDET, API_GETSHOTDETBYMD } from "../../service/pm.service";
import dayjs from "dayjs";
import type { PMPlanForm } from "../../interface/pmParam";


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
            className="text-black dark:text-white font-semibold text-end px-3"
            style={{ width: labelWidth || '10rem' }}
        >
            {label}
        </label>
        {children}
    </div>
);

const initialForm = {
    mdCode: '',
    mdName: '',
    std_ID: '',
    startDate: '',
    endDate: '',
    pmType: '',
    value: '',
    alertValue: '',
    pmExplain: '',
    pmCost: ''
};

const columns = [
    {
        title: "#",
        dataIndex: "Seq",
        key: "Seq",
    },
    {
        title: "ประเภทการ PM",
        dataIndex: "PM_Method",
        key: "Seq",
    },
    {
        title: "Part",
        dataIndex: "Prt_Code",
        key: "Prt_Code",
    },
    {
        title: "จำนวน",
        dataIndex: "Prt_Qty",
        key: "Prt_Qty",
    },
    {
        title: "ราคาต่อหน่วย",
        dataIndex: "Unit_Price",
        key: "Unit_Price",
    },
    {
        title: "ราคารวม",
        dataIndex: "Amount",
        key: "Amount",
    },
    {
        title: "รายละเอียด",
        dataIndex: "Remark",
        key: "Remark",
    },
];


function Create_PMPlan(props: Props) {
    const { open, close, onsave } = props;
    const empdata = useSelector((state: any) => state.login.user);
    const empcode = empdata.code;
    const [mdList, setMDList] = useState<any[]>([]);
    const [stdList, setStdList] = useState<any[]>([]);
    const [Form, setForm] = useState<PMPlanForm>(initialForm);
    const [pmDetail, setpmDetail] = useState<any[]>([]);
    const [generateplans, setGeneratedPlans] = useState<any[]>([])
    const isLocked = generateplans.length > 0;
    const [openDetail, setOpenDetail] = useState<number | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            API_GETMDLIST().then((res) => {
                setMDList(res);
                console.log(res)
            })
        };
        fetchData();
    }, [open]);

    useEffect(() => {
        if (!Form.mdCode) return;
        setForm(prev => ({
            ...prev,
            std_ID: '',
            startDate: '',
            endDate: '',
            pmType: '',
            value: '',
            alertValue: '',
            pmExplain: '',
            pmCost: ''
        }));
        setStdList([])
        setpmDetail([])
        API_GETMOLDSTD(Form.mdCode).then((res) => {
            setStdList(res)
        })
    }, [Form.mdCode])

    useEffect(() => {
        if (!Form.std_ID) return;
        const selectedStd = stdList.find(p => p.PMS_ID === Form.std_ID);
        if (!selectedStd) return;

        API_GETMOLDSTDDET(Form.std_ID).then((res) => {
            setpmDetail(res)
        })

        setForm(prev => ({
            ...prev,
            pmType: selectedStd.PM_Type,
            value: selectedStd.PM_Type === 'T' ? selectedStd.PM_Period : selectedStd.PM_Shot,
            alertValue: selectedStd.PM_Type === 'T' ? selectedStd.PM_AlertPeriod : selectedStd.PM_AlertShot,
            pmExplain: selectedStd.PM_Explain[0],
            pmCost: selectedStd.PM_Cost,
        }));

    }, [Form.std_ID])

    const handleSelectChange = (name: string, value: string | number) => {
        setForm((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleClose = () => {
        close(false);
        setForm(initialForm)
        setStdList([])
        setpmDetail([])
        setGeneratedPlans([])
    };

    const handleGenerate = () => {
        console.log("Stddate:", Form.startDate,
            "enddate:", Form.endDate,
            "type:", Form.pmType,
            "Value:", Form.value,
            "Alert:", Form.alertValue,
        )

        if (Form.pmType === 'T') {
            const start = dayjs(Form.startDate);
            const end = dayjs(Form.endDate);

            if (!start.isValid() || !end.isValid()) {
                alert("กรุณาเลือกวันที่เริ่มต้นและสิ้นสุดให้ถูกต้อง");
                return;
            }

            const diffDays = end.diff(start, 'day');
            const period = parseInt(Form.value || "0");


            if (period <= 0) {
                alert("รอบเวลาไม่ถูกต้อง");
                return;
            }


            const totalPlans = Math.floor(diffDays / period);

            console.log(`สามารถสร้างได้ทั้งหมด ${totalPlans} แผน`);

            const plans = [];

            for (let i = 1; i <= totalPlans; i++) {
                const nextDate = start.add(period * i, 'day');
                const alertDate = nextDate.subtract(parseInt(Form.alertValue || "0"), 'day');
                plans.push({
                    prt_code: Form.mdCode,
                    round: i,
                    planDate: nextDate.format("YYYY-MM-DD"),
                    alertDate: alertDate.format("YYYY-MM-DD"),
                    planCost: parseFloat(Form.pmCost) || 0,
                    details: [...pmDetail],
                });
            }
            const totalCost = plans.reduce((sum, p) => sum + p.planCost, 0);

            console.log("Generated Plans:", plans);
            console.log("Plan Total Cost:", totalCost);

            // console.log("Generated Plans:", plans);

            setGeneratedPlans(plans);
        } else if (Form.pmType === 'S') {
            const start = dayjs(Form.startDate);
            const end = dayjs(Form.endDate);

            if (!start.isValid() || !end.isValid()) {
                alert("กรุณาเลือกวันที่เริ่มต้นและสิ้นสุดให้ถูกต้อง");
                return;
            }

            API_GETSHOTDETBYMD(Form.mdCode).then((shotData: any) => {
                const pmShot = parseInt(Form.value || "0");
                if (pmShot <= 0) {
                    alert("จำนวน Shot ต่อรอบไม่ถูกต้อง");
                    return;
                }

                const alertShot = parseInt(Form.alertValue || "0");

                const plans: any[] = [];
                let currentShot = shotData[0].RunShot || 0;
                let round = 1;
                let currentDate = start;

                while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
                    currentShot += shotData[0].Cal_ShotPerDay || 0;

                    if (currentShot >= pmShot) {
                        const alertDate = currentDate.subtract(Math.ceil(alertShot / shotData[0].Cal_ShotPerDay), 'day');
                        plans.push({
                            prt_code: Form.mdCode,
                            round: round,
                            planDate: currentDate.format("YYYY-MM-DD"),
                            alertDate: alertDate.format("YYYY-MM-DD"),
                            planCost: parseFloat(Form.pmCost) || 0,
                            details: pmDetail ? [...pmDetail] : [],
                        });
                        round++;
                        currentShot = 0;
                    }

                    currentDate = currentDate.add(1, 'day');
                }

                const totalCost = plans.reduce((sum, p) => sum + p.planCost, 0);

                console.log("Generated Shot Plans:", plans);
                console.log("Plan Total Cost:", totalCost);

                setGeneratedPlans(plans);
            });
        }
    }

    const handleSavePlans = () => {
        if (!Form.mdCode || !Form.std_ID) {
            return;
        }

        const payload = {
            mdCode: Form.mdCode,
            mdname: Form.mdName,
            pmS_ID: Form.std_ID,
            strDate: Form.startDate,
            endDate: Form.endDate,
            pmType: Form.pmType,
            pmValue: Form.value.toString(),
            pmAlertValue: Form.alertValue.toString(),
            empcode: empcode,
            schedule: generateplans.map(p => ({
                mdCode: Form.mdCode,
                pmPlanDate: p.planDate,
                pmPlanAlertDate: p.alertDate || "",
                pmCost: p.planCost.toString(),
                scheduledetails: p.details || []
            }))
        };

        console.log("Payload to save:", payload);
        onsave(payload);
        setpmDetail([]);
        setForm(initialForm)
        setStdList([])
        setGeneratedPlans([])
        close(false);

    };

    const handleClosePopover = () => {
        setOpenDetail(null);
    };

    const handleView = (record: any) => {
        setOpenDetail(record.round);
    };

    const handleDelete = (round: number) => {
        console.log("ลบแผนรอบ:", round);
        setGeneratedPlans((prev) => prev.filter(p => p.round !== round));
    };


    const detailcolumn = [
        {
            title: "#",
            dataIndex: "Seq",
            key: "Seq",
        },
        {
            title: "ประเภทการ PM",
            dataIndex: "PM_Method",
            key: "Seq",
        },
        {
            title: "Part",
            dataIndex: "Prt_Code",
            key: "Prt_Code",
        },
        {
            title: "จำนวน",
            dataIndex: "Prt_Qty",
            key: "Prt_Qty",
        },
        {
            title: "ราคาต่อหน่วย",
            dataIndex: "Unit_Price",
            key: "Unit_Price",
        },
        {
            title: "ราคารวม",
            dataIndex: "Amount",
            key: "Amount",
        },
        {
            title: "รายละเอียด",
            dataIndex: "Remark",
            key: "Remark",
        },
    ]

    const GeneratePlancolumns = [
        {
            title: "#",
            dataIndex: "round",
            key: "round",
            width: 60,
            align: "center" as const,
        },
        {
            title: "วันที่วางแผน",
            dataIndex: "planDate",
            key: "planDate",
            align: "center" as const,
        },
        {
            title: "ค่าใช้จ่าย (฿)",
            dataIndex: "planCost",
            key: "planCost",
            align: "right" as const,
            render: (value: number) => value.toLocaleString(),
        },
        {
            title: "การจัดการ",
            key: "actions",
            align: "center" as const,
            render: (_: any, record: any) => (
                <div className="flex flex-col gap-1">
                    <Popover
                        content={
                            <div className="w-[480px] max-h-[420px] overflow-y-auto p-3 text-sm">
                                <div className="font-semibold mb-1 text-blue-700">
                                    รายละเอียดแผน #{record.round}
                                </div>
                                <div className="text-gray-700 mb-2">
                                    <p>📅 วันที่วางแผน: {record.planDate}</p>
                                    <p>💰 ค่าใช้จ่าย: {record.planCost.toLocaleString()} ฿</p>
                                    {record.alertDate && (
                                        <p>🔔 แจ้งเตือนล่วงหน้า: {record.alertDate} วัน</p>
                                    )}
                                </div>
                                <Table
                                    columns={detailcolumn}
                                    dataSource={record.details}
                                    pagination={false}
                                    size="middle"
                                    bordered
                                    rowKey="round"
                                />
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={handleClosePopover}
                                        className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                                    >
                                        ปิด
                                    </button>
                                </div>
                            </div>
                        }
                        title={null}
                        trigger="click"
                        open={openDetail === record.round}
                        onOpenChange={(visible) =>
                            visible ? handleView(record) : handleClosePopover()
                        }
                        placement="left"
                    >
                        <button
                            className="w-full text-blue-500 border border-blue-500 rounded-lg 
                            hover:bg-blue-500 hover:text-white transition-colors duration-200 shadow-sm"
                        >
                            ดูรายละเอียด
                        </button>
                    </Popover>

                    <button
                        className="w-full text-red-500 border border-red-500 rounded-lg
                        hover:bg-red-500 hover:text-white transition-colors duration-200 shadow-sm"
                        onClick={() => handleDelete(record.round)}
                    >
                        ลบ
                    </button>
                </div>
            ),
        },
    ];



    return (
        <Modal open={open} onCancel={handleClose} footer={null} width="70%">
            <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <h1 className="font-bold text-lg mb-3">สร้างแผนการ Preventive Mainternance</h1>
                <div className="flex flex-col lg:flex-row w-full h-full gap-4">

                    {/* Left Side */}
                    <div className="flex-1/2 h-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex-1 p-6 border border-gray-300 rounded-2xl shadow-lg bg-white">
                                <h2 className="text-lg font-semibold mb-5">เงื่อนไขการ Preventive Maintenance (PM)</h2>

                                {/* Mold Code */}
                                <FormItem label="Mold Code:">
                                    <Select
                                        className={`w-full ${isLocked
                                            ? '[&_.ant-select-selector]:!bg-yellow-50'
                                            : '[&_.ant-select-selector]:!bg-yellow-100'
                                            }`}
                                        showSearch
                                        value={Form.mdCode}
                                        disabled={isLocked}
                                        placeholder="Select or type Mold Code"
                                        onChange={(val: string) => {
                                            const selected = mdList.find(p => p.prtCode === val);
                                            setForm(prev => ({
                                                ...prev,
                                                mdCode: val,
                                                mdName: selected ? selected.prtName : ''
                                            }));
                                        }}
                                        options={mdList.map(p => ({
                                            value: p.prtCode,
                                            label: `${p.prtCode} - ${p.prtName}`
                                        }))}
                                        filterOption={(input, option) =>
                                            option ? option.label.toLowerCase().includes(input.toLowerCase()) : false
                                        }
                                    />
                                </FormItem>

                                {/* วันที่เริ่มและสิ้นสุด */}
                                <div className="flex gap-4 ">
                                    <FormItem label="Start Date:" labelWidth="14rem">
                                        <DatePicker
                                            value={Form.startDate ? dayjs(Form.startDate) : null}
                                            onChange={(_, dateString) => setForm({ ...Form, startDate: String(dateString) })}
                                            format="YYYY-MM-DD"
                                            className={`w-full ${isLocked
                                                ? '!bg-yellow-50'
                                                : '!bg-yellow-100'
                                                }`}
                                            disabled={isLocked}
                                        />
                                    </FormItem>

                                    <FormItem label="End Date:" labelWidth="10rem">
                                        <DatePicker
                                            value={Form.endDate ? dayjs(Form.endDate) : null}
                                            onChange={(_, dateString) => setForm({ ...Form, endDate: String(dateString) })}
                                            format="YYYY-MM-DD"
                                            className={`w-full ${isLocked
                                                ? '!bg-yellow-50'
                                                : '!bg-yellow-100'
                                                }`}
                                            disabled={isLocked}
                                        />
                                    </FormItem>
                                </div>

                                <FormItem label="Standard:">
                                    <Select
                                        className={`w-full ${isLocked
                                            ? '[&_.ant-select-selector]:!bg-yellow-50'
                                            : '[&_.ant-select-selector]:!bg-yellow-100'
                                            }`}
                                        showSearch
                                        value={Form.std_ID}
                                        disabled={isLocked}
                                        placeholder="Select or type Mold Code"
                                        onChange={(val: string) => handleSelectChange('std_ID', val)}
                                        options={stdList.map(p => ({
                                            value: p.PMS_ID,
                                            label: `${p.PM_Type === 'T' ? `รอบ ${p.PM_Period} วัน` : `รอบ ${p.PM_Shot} shot`}`
                                        }))}
                                        filterOption={(input, option) =>
                                            option ? option.label.toLowerCase().includes(input.toLowerCase()) : false
                                        }
                                    />
                                </FormItem>

                                {/* <FormItem label="ประเภทการ PM:">
                                    <Input name="pmType" value={Form.pmType} readOnly className="!bg-gray-200 !mt-2" />
                                </FormItem> */}

                                <FormItem label="จำนวนแจ้งเตือน:" labelWidth="11rem">
                                    <Input name="pmType" value={Form.alertValue} readOnly className="!bg-gray-200 !mt-2" />
                                    {Form.pmType && (
                                        <span className="pl-2">
                                            {Form.pmType === 'S' ? 'Shot' : 'วัน'}
                                        </span>
                                    )}
                                </FormItem>

                                <FormItem label="คำอธิบาย:">
                                    <Input name="pmExplain" value={Form.pmExplain} readOnly className="!bg-gray-200 !mt-2" />
                                </FormItem>

                                <FormItem label="ค่าใช้จ่ายต่อรอบ:">
                                    <Input name="pm_Cost" value={Form.pmCost} readOnly className="!bg-gray-200" />
                                    <span className="font-bold text-lg ml-2">฿</span>
                                </FormItem>

                            </div>

                            <div className="h-[30%] p-4 border border-gray-300 rounded-xl shadow-xl flex flex-col">
                                <h2 className="font-semibold mb-3">รายละเอียดการ Preventive Mainternance (PM)</h2>
                                <Table
                                    columns={columns}
                                    dataSource={pmDetail}
                                    pagination={false}
                                    bordered
                                    size="middle"
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg items-end mt-2 cursor-pointer shadow-md transition-all duration-200"
                                    onClick={handleGenerate}
                                >
                                    GENERATE
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex-1/3 p-4 h-full border border-gray-300 rounded-xl shadow-xl">
                        <h2 className="font-semibold mb-3 text-lg">Preventive Mainternance (PM) Plan List</h2>
                        <div className="overflow-y-auto max-h-[465px] border border-gray-300 rounded-xl shadow-sm">
                            <Table
                                columns={GeneratePlancolumns}
                                dataSource={generateplans}
                                pagination={false}
                                size="middle"
                                bordered
                                rowKey="round"
                            />
                        </div>
                        <div className="mt-3 flex justify-between items-center bg-blue-50 p-3 rounded-xl shadow-sm border border-blue-200">
                            <div className="text-blue-800 font-semibold">
                                📅 PM Period:&nbsp;
                                <span className="text-gray-800">
                                    {Form.startDate} - {Form.endDate}
                                </span>
                            </div>
                            <div className="text-green-700 font-semibold">
                                💰 Total Cost:&nbsp;
                                <span className="text-gray-900">
                                    {generateplans.length > 0
                                        ? `${generateplans.reduce((sum, p) => sum + (p.planCost || 0), 0).toLocaleString()} ฿`
                                        : "-"}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleSavePlans}
                                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 cursor-pointer"
                                disabled={generateplans.length === 0}
                            >
                                SAVE
                            </button>
                        </div>
                    </div>
                </div>


            </div>

        </Modal>
    )
}

export default Create_PMPlan;