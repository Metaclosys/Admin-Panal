import { Form, Checkbox, Spin, Empty } from "antd";
import { useEffect } from "react";

const SelectRooms = ({ form, rooms = [], loading }) => {
  useEffect(() => {
    console.log("SelectRooms - form values:", form.getFieldsValue(true));
  }, [form]);

  return (
    <>
      <h1 className="text-[22px] font-medium text-gray-800 mb-8">
        Select Rooms
      </h1>
      
      {rooms.length === 0 ? (
        <div className="text-center py-8">
          <Spin spinning={loading} />
          {rooms && <Empty description="No rooms found" />}
        </div>
      ) : (
        <Form.Item label="Rooms:" name="rooms">
          <Checkbox.Group className="flex flex-col gap-2">
            {rooms.map(room => (
              <Checkbox key={room._id || room.id} value={room._id || room.id}>
                {room.name}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
      )}
    </>
  );
};

export default SelectRooms;
