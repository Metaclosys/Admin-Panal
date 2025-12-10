import React from "react";
import { Modal, Checkbox } from "antd";

function ServiceModal({ isOpen, onClose, serviceType, services = [] }) {
  const [selectedServices, setSelectedServices] = React.useState([]);

  const handleServiceSelect = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSave = () => {
    // Here you can handle saving the selected services
    console.log("Selected services:", selectedServices);
    onClose();
  };

  return (
    <Modal
      title={`Select ${serviceType} Services`}
      open={isOpen}
      onCancel={onClose}
      onOk={handleSave}
      width={600}
      okText="Save"
      cancelText="Cancel"
      className="service-modal"
      okButtonProps={{ style: { backgroundColor: "#06283D" } }}
    >
      <div className="max-h-[400px] overflow-y-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
          >
            <Checkbox
              checked={selectedServices.includes(service)}
              onChange={() => handleServiceSelect(service)}
              className="mr-2"
            >
              {service}
            </Checkbox>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ServiceModal;
