
export interface Response<T> {
    result: number;
    massage: string;
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
export interface Addbommaster {
    formular: string;
    part: string;
    partname: string;
    rm?: string;
    rmname?: string;
    qty: string;
    level?: string;
    seq?: string;
}

export interface BomData {
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

//use with table show bom
export interface BomCount {
    formular: string;
    parent: string;
    child: string;
    qtypart: string;
}

export interface getDetailBom {
    formular: string;
}

export interface getBomname {
    part_code: string;
}

