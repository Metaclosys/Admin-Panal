import React from "react";
import { Modal, Checkbox } from "antd";

function ServiceModal({
  isOpen,
  onClose,
  serviceType,
  services = [],
  selectedServices = [],
  onServiceSelect,
}) {
  return (
    <Modal
      title={`${serviceType} Services`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="max-h-[60vh] overflow-y-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-4 border-b hover:bg-gray-50"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedServices.some((s) => s.id === service.id)}
                  onChange={(e) => onServiceSelect(service)}
                >
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-600">
                      Duration: {service.duration} mins
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ${service.price?.toFixed(2)}
                    </p>
                  </div>
                </Checkbox>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ServiceModal;
