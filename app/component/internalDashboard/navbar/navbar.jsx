import RightSide from "./rightSide/RightSide";
import PathHeader from "./pathHeader/pathHeader";

function Navbar() {
  return (
    <div>
      <div className="flex items-center justify-end bg-white w-full p-3 rounded-b-xl sticky top-0 z-50">
        <RightSide />
      </div>

      <PathHeader />
    </div>
  );
}

export default Navbar;