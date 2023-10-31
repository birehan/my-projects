import { Gallery, GalleryDetail } from "../types/types";
import { requests } from "./request";

const Galleries = {
  list: () => requests.get<Gallery[]>("/Categories"),

  create: (Gallery: FormData) =>
    requests.postFormData<FormData>("/Categories", Gallery),

  getDetail: (id: string) => requests.get<GalleryDetail>(`/Categories/${id}`),

  update: (Gallery: FormData, id: string) =>
    requests.putFormData<FormData>(`/Categories/${id}`, Gallery),

  delete: (id: string) => requests.del<string>(`/Categories/${id}`),
};

export default Galleries;
