import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import ProjectContentInput from "./Inputs/ProjectContentInput";
import TextInput from "../../components/inputs/TextInput";
import TextAreaInput from "../../components/inputs/TextAreaInput";
import ImageInput from "../../components/inputs/ImageInput";
import { useDispatch, useSelector } from "react-redux";
import {
  CleanStatusProject,
  GetProjectByIdAction,
  UpdateProjectAction,
} from "../redux/projectSlice";
import Notification from "../../components/common/Notification";
import SubmitButton from "../../components/common/SubmitButton";
import { useParams } from "react-router-dom";
import { UpdateProject } from "../../types/types";
import Loading from "../../components/common/Loading";

const UpdateProjectForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(GetProjectByIdAction(id));
    }
    return () => {
      dispatch(CleanStatusProject());
    };
  }, [dispatch, id]);

  const methods = useForm<UpdateProject>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { isLoading, isUpdateSuccess, error, project } = useSelector(
    (state: any) => state.projects
  );

  useEffect(() => {
    if (project) {
      methods.reset(project);
      setSelectedImage(project.photoUrl);
    }
  }, [project, methods]);

  const onSubmit: SubmitHandler<UpdateProject> = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    if (data.file) {
      formData.append("file", data.file);
    }

    dispatch(UpdateProjectAction({ formData, id: data.id }));
  };

  useEffect(() => {
    return () => {
      dispatch(CleanStatusProject());
    };
  }, [dispatch]);

  if (project === null) {
    return <Loading />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {isUpdateSuccess && (
          <Notification
            success={isUpdateSuccess}
            message="Project Updated Successfully"
          />
        )}

        {error && <Notification success={isUpdateSuccess} message={error} />}

        <div className="flex flex-col gap-4 w-full max-w-[60rem] mx-auto p-6">
          <h1 className="text-center text-4xl text-primaryColor font-[500]">
            Create Project
          </h1>
          <TextInput label="Title" name={"title"} />
          <TextAreaInput label="Introduction" name="description" />
          <ImageInput
            label="Cover Photo"
            name="file"
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isImageReqired={false}
          />
          <ProjectContentInput name="content" />
          <SubmitButton text="Create Project" isLoading={isLoading} />
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateProjectForm;
