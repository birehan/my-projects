import { PiStudentBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AlumniList from "../components/AlumniList";
import CommonLanding from "../components/CommonLanding";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import { getAlumniStudents } from "../api/ApiActions";

const AlumniPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.reducer);

  useEffect(() => {
    dispatch(getAlumniStudents());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div id="scroll">
        <CommonLanding title="HFC Alumni Students" icon={PiStudentBold} />
        <AlumniList />
      </div>
    </Layout>
  );
};

export default AlumniPage;
