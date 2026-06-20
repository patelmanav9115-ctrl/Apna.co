import React from "react";
import JobCard from "../JobCard/JobCard";

const RelatedJobs = ({ currentJob, jobs }) => {
  const relatedJobs = jobs.filter(
    (item) =>
      item.category === currentJob.category &&
      item.id !== currentJob.id
  );

  if (relatedJobs.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-6 text-center">
        <p className="text-gray-500 text-sm">
          No related jobs found
        </p>
      </div>
    );
  }

  const jobsToShow = relatedJobs.slice(0, 4);

  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        shadow-sm
        p-6
        mt-6
      "
      aria-label="Related Jobs Section"
    >
      <h2
        className="
          text-xl
          font-semibold
          mb-6
          text-gray-900
        "
      >
        Related Jobs
      </h2>
      <div className="flex flex-col gap-4">
        {jobsToShow.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedJobs;