import { DeleteOutlined, SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Button, Input, InputNumber, Modal, Radio, Select, Table, Upload, type UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import type React from "react";
import type { ReactNode } from "react";

interface Props {
    open: boolean;
    close: (val: boolean) => void;
    onsave: () => void;
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

function CreateMD(props: Props) {

    const { open, close, onsave } = props;

    const handleClose = () => {
        close(false);
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

    const filelist: UploadFile[] = [
        {
            uid: '0',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ]

    const data = [
        { date: '20251003', fromline: 'abc', toline: 'cvf' }
    ]

    const columns = [
        {
            title: <div className="text-center text-black font-semibold dark:text-white">DATE</div>,
            dataIndex: 'date',
            key: 'date',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-center text-black font-semibold dark:text-white">FROM</div>,
            dataIndex: 'fromline',
            key: 'fromline',
            align: 'center' as 'center'
        },
        {
            title: <div className="text-center text-black font-semibold dark:text-white">TO</div>,
            dataIndex: 'toline',
            key: 'toline',
            align: 'center' as 'center'
        }
    ]

    return (
        <Modal open={open} onCancel={() => handleClose()} footer={<></>} width="60%" height="80%">
            <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <div className="text-black font-semibold dark:text-white text-sm">
                    MOLD & DIE DATA
                    <br />
                    เพิ่ม / แก้ไขข้อมูล (mold & die)
                </div>
                <hr className="text-gray-200 mt-2" />
                <div className="flex flex-col gap-3 mt-2">
                    <form className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg shadow-md text-xs overflow-auto" >

                        <Section title="MOLD/DIE INFORMATION">
                            <FormItem label="M/D CODE:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter M/D NO."
                                />
                            </FormItem>
                            <FormItem label="M/D NAME:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter M/D NAME"
                                />
                            </FormItem>
                            <FormItem label="M/D TYPE:" labelWidth="9.1rem">
                                <Select
                                    placeholder='SELECTED MD TYPE'
                                />
                            </FormItem>
                            <FormItem label="DWG:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter DWG"
                                />
                            </FormItem>
                            <FormItem label="MODEL:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter MODEL"
                                />
                            </FormItem>
                            <FormItem label="BUDGET NO.:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter BUDGET NO."
                                />
                            </FormItem>
                            <FormItem label="INVOICE NO.:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter INVOICE NO."
                                />
                            </FormItem>
                            <FormItem label="MAKER" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter MAKER"
                                />
                            </FormItem>
                            <FormItem label="VENDER" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter VENDER"
                                />
                            </FormItem>
                            <FormItem label="RECEIVE DATE:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter RECEIVE DATE"
                                />
                            </FormItem>
                            <FormItem label="PRICE:" labelWidth="13rem">
                                <InputNumber addonAfter="฿" defaultValue={100} className="w-full" />
                            </FormItem>
                            <FormItem label="CURRENCY:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter CURRENCY"
                                />
                            </FormItem>
                            <FormItem label="START DATE:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter START DATE"
                                />
                            </FormItem>
                            <FormItem label="END DATE:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter END DATE"
                                />
                            </FormItem>
                            <FormItem label="TYPE:" labelWidth="9rem">
                                <Radio></Radio>
                            </FormItem>
                            <FormItem label="DIMENSION:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter DIMENSION"
                                />
                            </FormItem>
                            <FormItem label="DIMENSION UM:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter DIMENSION UM"
                                />
                            </FormItem>
                            <FormItem label="WEIGHT:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter WEIGHT"
                                />
                            </FormItem>
                            <FormItem label="WEIGHT UM:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter WEIGHT UM"
                                />
                            </FormItem>
                            <FormItem label="CAVITY:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter CAVITY"
                                />
                            </FormItem>
                            <FormItem label="RUN SHOT:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter RUN SHOT"
                                />
                            </FormItem>
                            <FormItem label="MAX SHOT:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter MAX SHOT"
                                />
                            </FormItem>
                            <FormItem label="MATERAL:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter MATERAL"
                                />
                            </FormItem>
                            <FormItem label="FIXED ASSET:" labelWidth="13rem">
                                <Input
                                    type="text"
                                    placeholder="Enter FIXED ASSET"
                                />
                            </FormItem>
                        </Section>

                        {/* <Section title="MOLD/DIE PROPERTY">
                            <FormItem label="ELECTRICT QUANTY:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter ELECTRICT QUANTY"
                                />
                            </FormItem>
                            <FormItem label="NEED AREA:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter NEED AREA"
                                />
                            </FormItem>
                            <div className="flex flex-row gap-2">
                                <FormItem label="CYCLETIME:" labelWidth="18.5rem">
                                    <Input
                                        type="text"
                                        placeholder="Enter CYCLETIME"
                                    />
                                </FormItem>
                                <FormItem label="WEIGHT:" labelWidth="10rem">
                                    <Input
                                        type="text"
                                        placeholder="Enter WEIGHT"
                                    />
                                </FormItem>
                            </div>
                            <FormItem label="NC:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter NC"
                                />
                            </FormItem>
                            <div className="flex flex-row gap-2">
                                <FormItem label="WATER:" labelWidth="9.1rem">
                                    <Radio></Radio>
                                </FormItem>
                                <FormItem label="ATR:" labelWidth="14.9rem">
                                    <Radio></Radio>
                                </FormItem>
                            </div>
                            <FormItem label="PLC:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter PLC"
                                />
                            </FormItem>
                            <div className="flex flex-row gap-2">
                                <FormItem label="STREAM:" labelWidth="9.1rem">
                                    <Radio></Radio>
                                </FormItem>
                                <FormItem label="GAS:" labelWidth="14.9rem">
                                    <Radio></Radio>
                                </FormItem>
                            </div>
                            <FormItem label="TOUCH SCREEN:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter TOUCH SCREEN"
                                />
                            </FormItem>
                        </Section>

                        <Section title="FOR SPECIAL USE">
                            <FormItem label="DAILY CHECK SHEET:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter DAILY CHECK SHEET"
                                />
                            </FormItem>
                            <FormItem label="TOOL&EQUIPMENT:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter TOOL&EQUIPMENT"
                                />
                            </FormItem>
                            <FormItem label="MONTHLY CHECK SHEET:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter MONTHLY CHECK SHEET"
                                />
                            </FormItem>
                            <FormItem label="JIG&FIXTURE:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter JIG&FIXTURE"
                                />
                            </FormItem>
                            <FormItem label="PERIOD CHECK SHEET:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter PERIOD CHECK SHEET"
                                />
                            </FormItem>
                            <FormItem label="OTHER:" labelWidth="">
                                <Input
                                    type="text"
                                    placeholder="Enter OTHER"
                                />
                            </FormItem>
                        </Section> */}

                        <Section title="PICTURE">
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture"
                                defaultFileList={filelist}
                            >
                                <Button type="primary" icon={<UploadFileOutlined />} className="mt-2">
                                    Upload
                                </Button>
                            </Upload>
                        </Section>


                        {/* <div>
                                <div className="text-blue-900 text-sm font-bold dark:text-white mt-4">
                                    USING IN LINE
                                </div>
                                <hr className="text-gray-200 mt-2" />

                                <div className="flex flex-col gap-3 mt-2"> */}
                        {/* Row 1: LINE GROUP / LINE NO. / Button */}
                        {/* <div className="flex flex-row gap-2 items-center">
                                        <label
                                            htmlFor="linegroup"
                                            className="text-black font-semibold dark:text-white text-xs text-nowrap w-[22rem] text-end"
                                        >
                                            LINE GROUP:
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter LINE GROUP"
                                        />
                                        <label
                                            htmlFor="lineno"
                                            className="text-black font-semibold dark:text-white text-xs text-nowrap "
                                        >
                                            LINE NO.:
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter LINE NO."
                                        />
                                        <Button type="primary">Move</Button>
                                    </div> */}

                        {/* Row 2: CURRENT LINE */}
                        {/* <div className="flex flex-row gap-2 items-center">
                                        <label
                                            htmlFor="currentline"
                                            className="text-black font-semibold dark:text-white text-xs text-nowrap"
                                        >
                                            CURRENT LINE:
                                        </label>
                                        <Input type="text" placeholder="Enter CURRENT LINE" />
                                    </div> */}

                        {/* Row 3: PROCESS */}
                        {/* <div className="flex flex-row gap-2 items-center">
                                        <label
                                            htmlFor="process"
                                            className="text-black font-semibold dark:text-white text-xs text-nowrap w-[6.4rem] text-end"
                                        >
                                            PROCESS:
                                        </label>
                                        <Input type="text" placeholder="Enter PROCESS" />
                                    </div>
                                </div> */}

                        {/* Table */}
                        {/* <div className="mt-3">
                                    <Table dataSource={data} columns={columns} bordered />
                                </div>
                            </div> */}

                        <hr className="text-gray-200 mt-3" />
                        <div className="flex flex-row justify-between items-center">
                            <button className="m-2 p-2 bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 rounded-lg text-white font-semibold"><DeleteOutlined />DELETE</button>
                            <button className="m-2 p-2 bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 rounded-lg text-white font-semibold"><SaveOutlined />SAVE</button>
                        </div>
                    </form>
                </div>
            </div >
        </Modal >
    )
}

export default CreateMD