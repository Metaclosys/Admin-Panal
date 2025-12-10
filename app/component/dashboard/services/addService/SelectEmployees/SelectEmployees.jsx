import { Form, Checkbox, Spin, Empty } from "antd";
import { useEffect } from "react";

const SelectEmployees = ({ form, employees = [], loading }) => {
  useEffect(() => {
    console.log("SelectEmployees - form values:", form.getFieldsValue(true));
  }, [form]);

  return (
    <>
      <h1 className="text-[22px] font-medium text-gray-800 mb-8">
        Select Employees
      </h1>
      
      {employees.length === 0 ? (
        <div className="text-center py-8">
          <Spin spinning={loading} />
          {employees && <Empty description="No employees found" />}
        </div>
      ) : (
        <Form.Item label="Employees:" name="employees" className="mb-0">
          <Checkbox.Group className="flex flex-col gap-2">
            {employees.map(employee => (
              <Checkbox key={employee._id || employee.id} value={employee._id || employee.id}>
                {employee.firstName} {employee.lastName}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
      )}
    </>
  );
};

export default SelectEmployees;
