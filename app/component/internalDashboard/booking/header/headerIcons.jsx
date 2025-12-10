import {
  UserOutlined,
  CheckOutlined,
  HistoryOutlined,
  SaveOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import { RocketOutlined } from "@ant-design/icons";

const HeaderIcons = ({ handleIconClick }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleIconClick("walkIn")}
        className="px-4 py-1 text-black hover:bg-gray-100 rounded"
      >
        Manage
      </button>
      <div className="flex flex-row gap-1">
        <UserOutlined
          className="text-black cursor-pointer hover:text-gray-600"
          onClick={() => handleIconClick("user")}
        />
        <RocketOutlined
          className="text-black cursor-pointer hover:text-gray-600"
          onClick={() => handleIconClick("running")}
        />
        <CheckOutlined
          className="text-black cursor-pointer hover:text-gray-600"
          onClick={() => handleIconClick("userCheck")}
        />
        <HistoryOutlined
          className="text-black cursor-pointer hover:text-gray-600"
          onClick={() => handleIconClick("history")}
        />
        <SaveOutlined
          className="text-black cursor-pointer hover:text-gray-600"
          onClick={() => handleIconClick("save")}
        />
        <ZoomInOutlined
          className="text-black cursor-pointer hover:text-gray-600"
          onClick={() => handleIconClick("search")}
        />
      </div>
    </div>
  );
};

export default HeaderIcons;
