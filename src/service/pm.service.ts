import { pmurl } from "../constants";
import axios from "axios";
import type { AddPMSTDPayload, PartListDetail, PMSavePayload } from "../interface/pmParam";

const http = axios.create({
    baseURL: pmurl,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8'
    }
})


export function API_GETMDLIST(): Promise<any> {
    return new Promise(resolve => {
        http.get(`/GetMDList`).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GETPARTLIST(): Promise<PartListDetail[]> {
    return new Promise(resolve => {
        http.get(`/GetPartList`).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_INSERTPMSTD(payload: AddPMSTDPayload): Promise<any> {
  return new Promise((resolve, reject) => {
    http.post(`/InsertPMStandard`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}


export function API_GETSTDLIST(): Promise<any> {
    return new Promise((resolve => {
         http.get(`/GetStandardList`).then((res) => {
            resolve(res.data);
        })
    }))
}

export function API_GETMOLDSTD(moldcode: string): Promise<any> {
    return new Promise((resolve => {
         http.get(`/GetMoldStandard?moldcode=${moldcode}`).then((res) => {
            resolve(res.data);
        })
    }))
}

export function API_GETMOLDSTDDET(std_ID: string): Promise<any> {
    return new Promise((resolve => {
         http.get(`/GetMoldStandardDetail?std_ID=${std_ID}`).then((res) => {
            resolve(res.data);
        })
    }))
}

export function API_INSERTPlan(payload: PMSavePayload ): Promise<any> {
  return new Promise((resolve, reject) => {
    http.post(`/AddPMPlan`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}


export function API_GETPLANLIST(): Promise<any> {
    return new Promise((resolve => {
         http.get(`/GetPlanList`).then((res) => {
            resolve(res.data);
        })
    }))
}

export function API_GETSHOTDETBYMD(mdcode:string): Promise<any> {
    return new Promise((resolve => {
         http.get(`/GetShotDetailByMold?mdcode=${mdcode}`).then((res) => {
            resolve(res.data);
        })
    }))
}