import SalesSource from "./Bars/SalesSource";

const LowerSection = () => {
  const salesSources = [
    { title: 'Online Booking Site', amount: '6,277', percentage: 75 },
    { title: 'Internal', amount: '2,214', percentage: 45 },
    { title: 'Booker Customer App', amount: '0', percentage: 15 },
    { title: 'Booker on Facebook', amount: '0', percentage: 15 },
    { title: 'Booker on Yelp', amount: '0', percentage: 15 },
    { title: 'Booker Profile Page', amount: '0', percentage: 15 },
  ];

  return (
    <div className="mt-8">
      <div className="space-y-6">
        {salesSources.map((source, index) => (
          <SalesSource
            key={index}
            title={source.title}
            amount={source.amount}
            percentage={source.percentage}
          />
        ))}
      </div>
    </div>
  );
};

export default LowerSection;