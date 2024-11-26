import { get, post } from "../helpers/api_helper";
import { IUserPayload } from "../types/User";

const BASE_URL = "http://localhost:4000/reports";

export const getReportsService = (params: string) =>
  get(`${BASE_URL}/${params}`);

export const generateDownloadLinkService = (payload: IUserPayload) =>
  post(`${BASE_URL}/generate-download-link`, payload, {});

export const downloadReportService = (url: string) =>
  get(`${url}`, { responseType: "arraybuffer" });
