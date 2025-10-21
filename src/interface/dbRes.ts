export interface SpStockData {
    prt_Code: string;
    grp_id: string;
    prt_Name: string;
    spect: string;
    drawing: string;
    can_Rework: string;
    material: string;
    maker: string;
    lifeTime: number;
    saftStock: number;
    minimum: number;
    currentStock: number;
    stockNew: number;
    stockRework: number;
    price: number;
    currency: string;
    um: string;
    keep_Aria: string;
    cancel: string;
    cancel_dt: string;
    incharge: string;
    quatation_No: string;
    remark: string;
    cr_by: string;
    cr_dt: string;
    upd_by: string;
    upd_dt: string;
    prt_Status: string;
    priceUpdate: number;
    vender: string;
    replaceBy: string;
    leadTime: string;
    nor_Tool_Life: number;
    keep_Position: string;
    sub_Pack: string;
    sub_Unit: string;
    ratio: number;
    stock_Ven: string;
    re_Part: string;
    req_by: string;
    drAcc: string;
    orderStatus: string;
    issuePolicy: string;
    site: string;
    subAccount: string;
}

export interface ResPartBom {
    formular: string;
    partcode: string;
    partname: string;
    seq: string;
    level: string;
}

export interface ResPartMst {
    prtcode: string;
    prtname: string;
    prttype: string;
    vender: string;
    runshot: string;
    currentmc: string;
    status: string;
    mcno: string;
    mcname: string;
    lineid: string;
    linename: string;
    linecode: string;
    factory: string;
}

export interface ResMoldMst {
    partcode: string;
}

export interface ResDetPartmst {
    prt_Code: string;
    prt_Name: string;
    prt_Type: string;
    prt_DWG: string;
    prt_Model: string;
    budgetNo: string;
    invoiceNo: string;
    maker: string;
    venderCode: string;
    vender: string;
    receiveDate: string;
    price: string;
    currency: string;
    startDate: string;
    endDate: string;
    type: string;
    dimension: string;
    dimension_UM: string;
    weight: string;
    weight_UM: string;
    cavity:  string;
    run_SYS: string;
    maX_SHOT: string;
    cal_ShotPerDay: string;
    totalShot: string;
    runShot: string;
    currentMC: string;
    prt_Status: string;
    status: string;
    material: string;
    fixedAsset: string;
    cby: string;
    cdate: string;
    uby: string;
    udate: string;
    fileName: string;
    fileNameOrg: string;
    fileType: string;
    filePath: string; 
}