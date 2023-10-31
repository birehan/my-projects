import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetail } from "../api/ApiActions";
import CommonLanding from "../components/CommonLanding";
import Loading from "../components/Loading";
import Layout from "../components/Layout";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectDetail(id));
  }, [dispatch, id]);

  const { project, loading } = useSelector((state: any) => state.reducer);

  if (loading || project === null) {
    return <Loading />;
  }

  return (
    <Layout>
      <div>
        <CommonLanding title={project.title} icon={null} />

        <div className="flex flex-col gap-4 px-6 mt-8 xl:mt-16">
          <div
            className="mx-auto mt-4 grid w-full max-w-[80rem] gap-10  grid-cols-1 bg-white p-8 rounded-md"
            dangerouslySetInnerHTML={{
              __html: project.content,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetailPage;
