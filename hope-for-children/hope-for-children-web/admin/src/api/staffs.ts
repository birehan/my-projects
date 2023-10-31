import { Staff } from "../types/types";
import { requests } from "./request";

const Staffs = {
  list: () => requests.get<Staff[]>("/Staffs"),
  details: (staffType: string) =>
    requests.get<Staff>(`/staffs/sector?sector=${staffType}`),

  create: (staff: FormData) =>
    requests.postFormData<FormData>("/staffs", staff),

  getDtail: (id: string) => requests.get<Staff>(`/staffs/${id}`),

  update: (staff: FormData, id: string) =>
    requests.putFormData<FormData>(`/staffs/${id}`, staff),

  delete: (id: string) => requests.del<string>(`/staffs/${id}`),
};

export default Staffs;
