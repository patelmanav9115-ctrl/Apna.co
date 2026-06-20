const HighlightCard = ({ title, value, icon }) => {
  return (
    <div
      className="
      border
      rounded-xl
      p-4
      bg-white
      hover:shadow-md
      transition
    "
    >
      <div className="text-gray-600">{icon}</div>

      <h4 className="mt-2 text-sm text-gray-500">{title}</h4>

      <p className="font-medium">{value}</p>
    </div>
  );
};

export default HighlightCard;