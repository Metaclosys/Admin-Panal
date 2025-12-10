import { Form, Input, Radio } from "antd";


const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  
function StepThree() {
  return (
    <div>
      <h2 className="text-blue-600 font-medium mb-6">Select Package Price</h2>
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          <Form.Item
            label="Total Package Price"
            name="totalPackagePrice"
            required
            className="mb-4"
          >
            <div className="flex items-center gap-2">
              <span>$</span>{" "}
              <Input placeholder="Enter Price" className="py-2" />
              <span>(USD)</span>
            </div>
          </Form.Item>

          <Form.Item label="Deposit" name="deposit" required className="mb-4">
            <Radio.Group className="flex flex-col gap-2">
              <Radio value="none">None</Radio>
              <Radio value="full">Full (100%)</Radio>
              <Radio value="full">
                <div className="flex items-center gap-2">
                  Percentage
                  <Input placeholder="" className="py-2" />%
                </div>
              </Radio>
              <Radio value="partial">
                <div className="flex items-center gap-2">
                  Amount$
                  <Input placeholder="" className="py-2" />
                  (USD)
                </div>
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="" name="image" className="mb-4">
            <div className="flex items-center gap-2">
              <span>Discount N/A:</span>
              <button className="text-blue-500 underline">Update</button>
            </div>
          </Form.Item>
        </div>
      </div>
    </div>
  );
}

export default StepThree;
