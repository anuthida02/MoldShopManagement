
export interface Response<T> {
    result: number;
    message: string;
    data: T;
}
export interface Machinedata {
    mcid: string;
    mcno: string;
    mcname: string;
    model: string;
    serialno: string;
    budgetno: string;
    maker: string;
    vender: string;
    status: string;
    elecquantity: string;
    water: string;
    air: string;
    steam: string;
    gas: string;
    boimachine: string;
    boiproject: string;
    needarea: string;
    lineused: string;
    processid: string;
    cycletime: string;
    remark: string;
    fixedasset: string;
    linename: string;
}

//use create and edit bom
export interface Addprtbom {
    formular: string | undefined;
    part_code: string;
    part_name: string;
    qty: string;
    level?: string;
    // seq?: string;
    rev?: string;
    crby: string;
}

export interface Addrmbom {
    formular: string;
    part_level: number | undefined;
    part_code: string;
    part_name: string;
    rm_code: string;
    rm_name: string;
    qty: string;
    level?: string;
    // seq?: string;
    rev?: string;
    crby: string;
}

export interface BomData {
    id: string;
    formular: string;
    part_code: string;
    part_name: string;
    child_code: string;
    child_name: string;
    qty: string;
    level: string;
    seq: string;
    rev: string;
    start_date: string;
    end_date: string;
    crby: string;
    crdate: string;
}

//use with table show bom and parameter of get data to edit info
export interface BomCount {
    formular: string;
    parent: string;
    child: string;
    qtypart: string;
}

export interface getDetailBom {
    formular: string;
}

export interface getPartBom {
    formular: string;
    level: number;
}

export interface getBomname {
    part_code: string;
}

export interface Editbom {
    id: string;
    formular: string;
    part_code: string;
    part_name: string;
    rm_code: string;
    rm_name: string;
    qty: string;
    level: string;
    rev: string;
    crby: string;
}

export interface GetPartMst {
    prtmsttype: string;
}

export interface CreatePartMst {
    prtcode: string;
    prtname: string;
    prttype: string | undefined;
    prtdwg: string;
    model: string;
    budgetno?: string;
    invno: string;
    maker: string;
    vender: string;
    recdate: string;
    price: string;
    currency: string;
    strdate: string;
    type: string;
    dimension: string;
    weight: string;
    cavity: string;
    runnersyt: string;
    maxshot?: string;
    shotperday?: string;
    material: string;
    fixedasset?: string;
    FilePath?: string;
    FROMFILE?: File | null;
    crby: string;
}