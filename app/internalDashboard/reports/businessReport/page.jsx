import LowerSection from "../../../component/internalDashboard/reports/BusinessReport/LowerSection/LowerSection";
import MiddleSection from "../../../component/internalDashboard/reports/BusinessReport/MiddleSection/MiddleSection";
import UpperSection from "../../../component/internalDashboard/reports/BusinessReport/UpperSection/UpperSection";

function BusinessReportPage() {
  return (
    <div className="p-6">
      <UpperSection />
      <MiddleSection />
      <LowerSection />
    </div>
  );
}

export default BusinessReportPage;
