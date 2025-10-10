// import { Input, Modal } from "antd";
// import { useEffect, useState, type ReactNode } from "react";
// import type { Addbommaster } from "../../interface/mParam";

// interface Props {
//     open: boolean;
//     close: (val: boolean) => void;
//     onsave: () => void;
//     data: Addbommaster[]
// }

// interface FormItem {
//     label: string;
//     children: ReactNode;
//     labelWidth: string;
// }

// const FormItem: React.FC<FormItem> = ({ label, children, labelWidth }) => (
//     <div className="flex flex-row items-center my-2">
//         <label
//             className="text-black dark:text-white font-semibold text-end px-10"
//             style={{ width: labelWidth || '13rem' }}
//         >
//             {label}
//         </label>
//         {children}
//     </div>
// )

// function EditBoomMD(props: Props) {

//     const { open, close, onsave, data } = props;

//     const [FormEdit, setEditForm] = useState<Addbommaster>({
//         formular: '',
//         part: '',

//         rm: '',
//         qty: '',
//         level: '',
//         seq: ''
//     })

//     useEffect(() => {
//         if (data.length > 0) {
//             setEditForm({
//                 molddie: data[0]?.molddie ?? "",
//                 part: data[0]?.part ?? "",
//                 rm: data[0]?.rm ?? "",
//                 qty: data[0]?.qty ?? "",
//                 level: data[0].level ?? "",
//                 seq: data[0].seq ?? ""
//             });
//         }
//     }, [data]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setEditForm(prev => ({
//             ...prev,
//             [name]: value
//         }))
//     }


//     const handleClose = () => {
//         close(false)
//     }

//     return (
//         <Modal open={open} onCancel={() => handleClose()} footer={<></>} width='50%' height='80%'>
//             <div className="flex flex-col h-full rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold">
//                 BOOM MASTER DATA
//                 <br />
//                 แก้ไขข้อมูล (booms master)
//             </div>
//             <hr className="text-gray-200 my-3" />
//             <div className="flex flex-col gap-3 my-2">
//                 <form action="" className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg shadow-md text-sm overflow-auto">
//                     {data && data.length > 0 ? (

//                         <div>
//                             <FormItem label="Mold & Die:" labelWidth="">
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter Mold & Die"
//                                     className="!bg-sky-50 !border-sky-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
//                                     name="molddie"
//                                     value={FormEdit.molddie}
//                                     onChange={handleChange}
//                                 />
//                             </FormItem>
//                             <FormItem label="Part:" labelWidth="">
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter Mold & Die"
//                                     className="!bg-sky-50 !border-sky-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
//                                     name="part"
//                                     value={FormEdit.part}
//                                     onChange={handleChange}
//                                 />
//                             </FormItem>
//                             <FormItem label="Rm:" labelWidth="">
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter Mold & Die"
//                                     className="!bg-sky-50 !border-sky-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
//                                     name="rm"
//                                     value={FormEdit.rm}
//                                     onChange={handleChange}
//                                 />
//                             </FormItem>
//                             <FormItem label="Qty:" labelWidth="">
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter Mold & Die"
//                                     className="!bg-sky-50 !border-sky-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
//                                     name="qty"
//                                     value={FormEdit.qty}
//                                     onChange={handleChange}
//                                 />
//                             </FormItem>
//                             <FormItem label="Lavel:" labelWidth="">
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter Mold & Die"
//                                     className="!bg-sky-50 !border-sky-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
//                                     name="level"
//                                     value={FormEdit.level}
//                                     onChange={handleChange}
//                                 />
//                             </FormItem>
//                             <FormItem label="Seq:" labelWidth="">
//                                 <Input
//                                     type="text"
//                                     placeholder="Enter Mold & Die"
//                                     className="!bg-sky-50 !border-sky-200 hover:!bg-amber-50 hover:!border-amber-200 focus:ring-2 focus:ring-amber-200"
//                                     name="seq"
//                                     value={FormEdit.seq}
//                                     onChange={handleChange}
//                                 />
//                             </FormItem>
//                         </div>
//                     )

//                         : (
//                             <p>Data Not Found...</p>
//                         )}

//                 </form>
//                 <div className="flex justify-center mt-3">
//                     <button
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
//                     >
//                         SAVE
//                     </button>
//                 </div>
//             </div>
//         </Modal>
//     )
// }

// export default EditBoomMD