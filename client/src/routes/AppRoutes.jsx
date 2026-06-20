import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import JobList from "../pages/JobList";
import JobDetails from "../pages/JobDetails";

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;