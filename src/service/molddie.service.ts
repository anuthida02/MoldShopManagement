import { mdurl } from "../constants";
import axios from "axios";
import type { Machinedata, BomData, getDetailBom, BomCount, Response, getBomname, Addprtbom, Addrmbom, getPartBom, Editbom, GetPartMst, CreatePartMst } from "../interface/mParam";
import type { ResDetPartmst, ResPartBom, ResPartMst, SpStockData } from "../interface/dbRes";
const http = axios.create({
    baseURL: mdurl,
    headers: {
        'Content-Type' : 'application/json;charset=UTF-8;json/html; charset=UTF-8'
    }
})

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export function API_MACHAINE_DATA() {
    return new Promise<Response<Machinedata[]>>(resolve => {
        http.get(`/machinedata`).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.log('Error API', e)
        })
    })
}

export function API_CRPARTBOM(mParam: Addprtbom[]) {
    return new Promise<Response<[]>>(resolve => {
        http.post(`/crpartbom`, mParam).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.log('Error API:', e)
        })
    })
}

export function API_CRRMBOM(mParam: Addrmbom[]) {
    return new Promise<Response<[]>>(resolve => {
        http.post(`/crrmbom`, mParam).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            resolve(e)
        })
    })
}

export function API_GET_LEVELPART(mParam: getDetailBom) {
    return new Promise<Response<ResPartBom[]>>(resolve => {
        http.post(`/levelpart`, mParam).then((res) => {
            resolve(res.data)
        }).catch((e) => {
            console.log('Error API:',e)
        })
    })
}

export function API_GET_PARTBOM(mParam: getPartBom) {
    return new Promise<Response<ResPartBom[]>>(resolve => {
        http.post(`/partbom`, mParam).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.log('Error API:', e)
        })
    })
}

export function API_DETAILBOM(mParam: getDetailBom) {
    return new Promise<Response<BomData[]>>(resolve => {
        http.post(`/detailbom`, mParam).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.log('Error API:', e)
        })
    })
}

export function API_GETCOUNT_BOM() {
    return new Promise<Response<BomCount[]>>(resolve => {
        http.get(`/countbom`).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.log('Error API:', e)
        })
    })
}

export function API_GETDATA_EDIT(mParam: BomCount) {
    return new Promise<Response<BomData[]>>(resolve => {
        http.post(`/gtdataedit`, mParam).then((res) => {
            resolve(res.data)
        }).catch((e) => {
            console.log('Error API:', e)
        })
    })
}

export function API_GETNAME_BOM(mParam: getBomname) {
    return new Promise<Response<SpStockData[]>>(resolve => {
        http.post(`/gtbomname`, mParam).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.log('Error API:', e)
        })
    })
}

export function API_EDITBOM(mParam: Editbom) {
    return new Promise<Response<[]>>(resolve => {
        http.post(`/editbommst`, mParam).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.log('Error API:', e)
        })
    })
}

export function API_GETPARTMASTER(mParam: GetPartMst) {
    return new Promise<Response<ResPartMst[]>>(resolve => {
        http.post(`/gtmoldprtmst`, mParam).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.log(e)
        })
    })
}

export function API_GETPARTTYPE() {
    return new Promise<Response<GetPartMst[]>>(resolve => {
        http.get(`/parttype`).then((res) => {
            resolve(res.data)
        }).catch((e) => {
            console.log(e)
        })
    })
}

export function API_CREATEPART_MASETER(mParam: CreatePartMst){
    return new Promise<Response<[]>>(resolve => {
        http.post(`/crpartmst`, mParam, config).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            resolve(e);
        })
    })
}

export function API_GETMOLD_MASTER(){
    return new Promise<Response<[]>>(resolve => {
        http.get(`/gtmastermold`).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            resolve(e)
        })
    })
}

export function API_GETDETAIL_PARTMASTER(mParam: getDetailBom){
    return new Promise<Response<Editbom[]>>(resolve => {
        http.post(`/detpartmst`, mParam).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            resolve(e);
        })
    })
}

export function API_GETDATA_PARTMASTER(mParam: getDetailBom) {
    return new Promise<Response<ResDetPartmst[]>>(resolve => {
        http.post(`/datapartmst`, mParam).then((res) => {
            resolve(res.data)
        }).catch((e) => {
            resolve(e)
        })
    })
}

export function API_EDIT_PARTMASTER(mParam: CreatePartMst) {
    return new Promise<Response<[]>>(resolve => {
        http.post(`/editpartmst`, mParam, config).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            resolve(e);
        })
    });
}