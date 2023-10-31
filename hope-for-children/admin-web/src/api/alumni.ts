import { Alumni } from "../types/types";
import { requests } from "./request";

const Alumnis = {
  list: () => requests.get<Alumni[]>("/Alumnis"),

  create: (alumni: FormData) =>
    requests.postFormData<FormData>("/Alumnis", alumni),

  getDetail: (id: string) => requests.get<Alumni>(`/Alumnis/${id}`),

  update: (alumni: FormData, id: string) =>
    requests.putFormData<FormData>(`/Alumnis/${id}`, alumni),

  delete: (id: string) => requests.del<string>(`/Alumnis/${id}`),
};

export default Alumnis;
