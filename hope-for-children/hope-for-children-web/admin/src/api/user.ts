import { RegisterUser, User } from "../types/types";
import { requests } from "./request";

const Users = {
  register: (user: RegisterUser) =>
    requests.post<RegisterUser>("/Account/register", user),
  update: (user: User) => requests.put<User>(`/Account/updateUser`, user),

  list: () => requests.get<User>("/Account/users"),

  getDetail: (id: string) => requests.get<User>(`/Account/${id}`),

  delete: (id: string) => requests.del<string>(`/Account/${id}`),
};

export default Users;
