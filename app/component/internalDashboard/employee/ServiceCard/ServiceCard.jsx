const ServiceCard = ({ title, image, onViewServices }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-[300px]">
      <div className="aspect-square w-full h-[180px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 bg-[#B7E3FF] text-center">
        <h3 className="text-gray-800 font-medium mb-2 text-sm">{title}</h3>
        <button
          onClick={onViewServices}
          className="bg-[#0F172A] text-white px-3 py-1.5 rounded-full text-xs hover:bg-opacity-90 transition-colors"
        >
          View Services
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
