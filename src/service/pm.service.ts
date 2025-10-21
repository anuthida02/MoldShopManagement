import { mdurl } from "../constants";
import axios from "axios";
import type { AddPMSTDPayload, PartListDetail, PMSavePayload } from "../interface/pmParam";

const http = axios.create({
    baseURL: mdurl,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8'
    }
})


export function API_GETMDLIST(): Promise<any> {
    return new Promise(resolve => {
        http.get(`/Preventive/GetMDList`).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GETPARTLIST(): Promise<PartListDetail[]> {
    return new Promise(resolve => {
        http.get(`/Preventive/GetPartList`).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_INSERTPMSTD(payload: AddPMSTDPayload): Promise<any> {
  return new Promise((resolve, reject) => {
    http.post(`/Preventive/InsertPMStandard`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}


export function API_GETSTDLIST(): Promise<any> {
    return new Promise((resolve => {
         http.get(`/Preventive/GetStandardList`).then((res) => {
            resolve(res.data);
        })
    }))
}

export function API_GETMOLDSTD(moldcode: string): Promise<any> {
    return new Promise((resolve => {
         http.get(`/Preventive/GetMoldStandard?moldcode=${moldcode}`).then((res) => {
            resolve(res.data);
        })
    }))
}

export function API_GETMOLDSTDDET(std_ID: string): Promise<any> {
    return new Promise((resolve => {
         http.get(`/Preventive/GetMoldStandardDetail?std_ID=${std_ID}`).then((res) => {
            resolve(res.data);
        })
    }))
}

export function API_INSERTPlan(payload: PMSavePayload ): Promise<any> {
  return new Promise((resolve, reject) => {
    http.post(`/Preventive/AddPMPlan`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}


export function API_GETPLANLIST(): Promise<any> {
    return new Promise((resolve => {
         http.get(`/Preventive/GetPlanList`).then((res) => {
            resolve(res.data);
        })
    }))
}