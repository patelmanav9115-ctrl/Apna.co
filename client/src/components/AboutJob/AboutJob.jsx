import SectionCard from "../SectionCard/SectionCard";
import { ClipboardList, CheckSquare, Sparkles } from "lucide-react";

const AboutJob = ({ job }) => {
  return (
    <>
      <SectionCard 
        title="Responsibilities" 
        icon={<ClipboardList size={20} />}
      >
        <ul className="list-disc ml-5 space-y-1.5">
          {job.responsibilities?.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard 
        title="Requirements" 
        icon={<CheckSquare size={20} />}
      >
        <ul className="list-disc ml-5 space-y-1.5">
          {job.requirements?.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard 
        title="Benefits" 
        icon={<Sparkles size={20} />}
      >
        <ul className="list-disc ml-5 space-y-1.5">
          {job.benefits?.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
};

export default AboutJob;