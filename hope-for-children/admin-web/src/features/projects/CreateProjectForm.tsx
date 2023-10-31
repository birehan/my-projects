import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import ProjectContentInput from "./Inputs/ProjectContentInput";
import TextInput from "../../components/inputs/TextInput";
import TextAreaInput from "../../components/inputs/TextAreaInput";
import ImageInput from "../../components/inputs/ImageInput";
import { useDispatch, useSelector } from "react-redux";
import { CleanStatusProject, CreateProjectAction } from "../redux/projectSlice";
import Notification from "../../components/common/Notification";
import SubmitButton from "../../components/common/SubmitButton";
interface CreateProject {
  title: string;
  description: string;
  file: File;
  content: string;
}

const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const methods = useForm<CreateProject>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { isLoading, isCreateSuccess, error } = useSelector(
    (state: any) => state.projects
  );

  const onSubmit: SubmitHandler<CreateProject> = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("File", data.file);
    formData.append("content", data.content);

    console.log("content: ", data.content);

    // dispatch(CreateProjectAction(formData));
  };
  useEffect(() => {
    return () => {
      dispatch(CleanStatusProject());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isCreateSuccess) {
      methods.reset();
      setSelectedImage(null);
    }
  }, [isCreateSuccess, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {isCreateSuccess && (
          <Notification
            success={isCreateSuccess}
            message="Project Created succesffully"
          />
        )}

        {error && <Notification success={isCreateSuccess} message={error} />}

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
            isImageReqired={true}
          />
          <ProjectContentInput name="content" />
          <SubmitButton text="Create Project" isLoading={isLoading} />
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateProjectForm;
