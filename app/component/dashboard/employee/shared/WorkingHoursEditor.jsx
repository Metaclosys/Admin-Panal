"use client";

import { useEffect, useState } from "react";
import { Button, Card, Form, TimePicker } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const normalizeToDayjs = (value) => {
  if (!value) return undefined;
  if (typeof value === "string") {
    const parsed = dayjs(value, "HH:mm", true);
    if (parsed.isValid()) {
      return parsed;
    }
  }
  if (dayjs.isDayjs(value) && value.isValid()) {
    return value;
  }
  return undefined;
};

const serializeTime = (value) => {
  if (!value) return undefined;
  if (dayjs.isDayjs(value) && value.isValid()) {
    return value.format("HH:mm");
  }
  if (typeof value === "string") {
    const parsed = dayjs(value, "HH:mm", true);
    if (parsed.isValid()) {
      return parsed.format("HH:mm");
    }
  }
  return undefined;
};

const WorkingHoursEditor = ({ form, fieldPath = "workingHours", initialWorkingHours }) => {
  if (!form) {
    console.error("WorkingHoursEditor requires a form instance");
    return null;
  }

  const [selectedDay, setSelectedDay] = useState("monday");

  useEffect(() => {
    if (!initialWorkingHours) return;

    const workingHoursPayload = Object.entries(initialWorkingHours).reduce(
      (acc, [day, slots]) => {
        if (!Array.isArray(slots)) {
          acc[day] = [];
          return acc;
        }

        acc[day] = slots.map((slot) => ({
          start: normalizeToDayjs(slot?.start || slot?.[0]),
          end: normalizeToDayjs(slot?.end || slot?.[1]),
        }));
        return acc;
      },
      {},
    );

    form.setFieldsValue({
      [fieldPath]: workingHoursPayload,
    });
  }, [form, fieldPath, initialWorkingHours]);

  const handleAddSlot = (add) => {
    add({ start: undefined, end: undefined });
  };

  return (
    <>
      <h3 className="text-blue-600 font-medium mt-6 mb-4">Working Hours</h3>

      <div className="flex gap-4 mb-4">
        {DAYS_OF_WEEK.map((day) => {
          const label = day.charAt(0).toUpperCase() + day.slice(1);
          const isSelected = selectedDay === day;
          return (
            <Button
              key={day}
              type={isSelected ? "primary" : "default"}
              onClick={() => setSelectedDay(day)}
              className={isSelected ? "bg-blue-600" : ""}
            >
              {label}
            </Button>
          );
        })}
      </div>

      <Card className="mb-4">
        <Form.List name={[fieldPath, selectedDay]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => {
                const { key, ...restField } = field;
                return (
                  <div key={key} className="flex items-center gap-4 mb-4">
                    <Form.Item
                      {...restField}
                      name={[field.name, "start"]}
                      label="Start Time"
                      className="mb-0 flex-1"
                      rules={[{ required: true, message: "Start time is required" }]}
                    >
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[field.name, "end"]}
                      label="End Time"
                      className="mb-0 flex-1"
                      rules={[{ required: true, message: "End time is required" }]}
                    >
                      <TimePicker format="HH:mm" className="w-full" />
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      className="text-red-500 text-xl mt-8"
                    />
                  </div>
                );
              })}

              <Form.Item>
                <Button type="dashed" onClick={() => handleAddSlot(add)} block icon={<PlusOutlined />}>
                  Add Time Slot
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>
    </>
  );
};

export const serializeWorkingHours = (workingHours = {}) => {
  return Object.entries(workingHours).reduce((acc, [day, slots]) => {
    if (!Array.isArray(slots)) {
      acc[day] = [];
      return acc;
    }

    acc[day] = slots
      .map((slot) => {
        const start = serializeTime(slot?.start ?? slot?.[0]);
        const end = serializeTime(slot?.end ?? slot?.[1]);
        if (!start || !end) return null;
        return { start, end };
      })
      .filter(Boolean);

    return acc;
  }, {});
};

export default WorkingHoursEditor;
