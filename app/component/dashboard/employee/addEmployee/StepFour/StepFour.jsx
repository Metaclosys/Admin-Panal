import {
  Select,
} from "antd";

function StepFour() {
  return (
    <>
      <h2 className="text-blue-600 font-medium mb-6">Default Schedule</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-transparent rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left w-32">Week 1</th>
              <th className="p-3 text-center">Work Hours</th>
              <th className="p-3 text-center" colSpan={2}>
                Lunch
              </th>
            </tr>
            <tr className="border-b text-gray-600">
              <th></th>
              <th className="p-2 text-center">Start Time - End Time</th>
              <th className="p-2 text-center">Start Time</th>
              <th className="p-2 text-center">End Time</th>
            </tr>
          </thead>
          <tbody>
            {[
              { day: "Monday (2/19)", status: "Workday" },
              { day: "Tuesday (2/20)", status: "Day Off" },
              { day: "Wednesday (2/21)", status: "Vacation" },
              { day: "Thursday (2/22)", status: "Personal Day" },
              { day: "Friday (2/23)", status: "Sick Day" },
              { day: "Saturday (2/24)", status: "Training Day" },
              { day: "Sunday (2/25)", status: "Workday" },
            ].map((row, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">
                  <div className="flex flex-col">
                    <span>{row.day}</span>
                    <Select
                      defaultValue={row.status}
                      className="w-full mt-1"
                      options={[
                        { value: "Workday", label: "Workday" },
                        { value: "Day Off", label: "Day Off" },
                        { value: "Vacation", label: "Vacation" },
                        {
                          value: "Personal Day",
                          label: "Personal Day",
                        },
                        { value: "Sick Day", label: "Sick Day" },
                        {
                          value: "Training Day",
                          label: "Training Day",
                        },
                      ]}
                    />
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <Select
                      defaultValue="10:00 AM"
                      className="w-32"
                      options={Array.from({ length: 24 }, (_, i) => {
                        const hour = i % 12 || 12;
                        const ampm = i < 12 ? "AM" : "PM";
                        return {
                          value: `${hour}:00 ${ampm}`,
                          label: `${hour}:00 ${ampm}`,
                        };
                      })}
                    />
                    <span className="mx-2">-</span>
                    <Select
                      defaultValue="08:00 PM"
                      className="w-32"
                      options={Array.from({ length: 24 }, (_, i) => {
                        const hour = i % 12 || 12;
                        const ampm = i < 12 ? "AM" : "PM";
                        return {
                          value: `${hour}:00 ${ampm}`,
                          label: `${hour}:00 ${ampm}`,
                        };
                      })}
                    />
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex justify-center">
                    <Select
                      defaultValue="02:00 PM"
                      className="w-32"
                      options={Array.from({ length: 24 }, (_, i) => {
                        const hour = i % 12 || 12;
                        const ampm = i < 12 ? "AM" : "PM";
                        return {
                          value: `${hour}:00 ${ampm}`,
                          label: `${hour}:00 ${ampm}`,
                        };
                      })}
                    />
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex justify-center">
                    <Select
                      defaultValue="03:00 PM"
                      className="w-32"
                      options={Array.from({ length: 24 }, (_, i) => {
                        const hour = i % 12 || 12;
                        const ampm = i < 12 ? "AM" : "PM";
                        return {
                          value: `${hour}:00 ${ampm}`,
                          label: `${hour}:00 ${ampm}`,
                        };
                      })}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StepFour;
