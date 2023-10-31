import { CreateProject, Project, UpdateProject } from "../types/types";
import { requests } from "./request";

const Projects = {
  list: () => requests.get<Project[]>("/projects"),

  getDetail: (id: string) => requests.get<Project>(`/projects/${id}`),

  create: (project: FormData) =>
    requests.postFormData<Project>("/projects", project),
  update: (project: FormData, id: string) =>
    requests.putFormData<Project>(`/projects/${id}`, project),

  delete: (id: string) => requests.del<string>(`/projects/${id}`),
};

export default Projects;
