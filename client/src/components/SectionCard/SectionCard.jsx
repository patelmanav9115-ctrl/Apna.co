const SectionCard = ({ title, children, icon }) => {
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
    >
      <h2
        className="
          text-lg
          font-bold
          text-gray-900
          flex
          items-center
          gap-2
          border-b
          border-gray-100
          pb-3
        "
      >
        {icon && <span className="text-primary shrink-0">{icon}</span>}
        <span>{title}</span>
      </h2>

      <div className="mt-4 text-gray-700 leading-relaxed text-sm">{children}</div>
    </div>
  );
};

export default SectionCard;