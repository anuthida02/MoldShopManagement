import { mdurl } from "../constants";
import axios from "axios";
import type { Machinedata, BomData, getDetailBom, BomCount, Response, getBomname } from "../interface/mParam";
import type { SpStockData } from "../interface/dbTable";
const http = axios.create({
    baseURL: mdurl,
    headers: {
        'Content-Type' : 'application/json;charset=UTF-8;json/html; charset=UTF-8'
    }
})

export function API_MACHAINE_DATA() {
    return new Promise<Response<Machinedata[]>>(resolve => {
        http.get(`/machinedata`).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.log('Error API', e)
        })
    })
}

export function API_ADDNEW_BOM(mParam: BomData) {
    return new Promise<Response<[]>>(resolve => {
        http.post(`/crmasterbom`, mParam).then((res) => {
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

export function API_GETNAME_BOM(mParam: getBomname) {
    return new Promise<Response<SpStockData[]>>(resolve => {
        http.post(`/gtbomname`, mParam).then((res) => {
            resolve(res.data);
        }).catch((e) => {
            console.log('Error API:', e)
        })
    })
}