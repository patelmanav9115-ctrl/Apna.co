import { Routes, Route } from "react-router-dom";
import JobList from "../pages/JobList";
import JobDetails from "../pages/JobDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JobList />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
    </Routes>
  );
};

export default AppRoutes;