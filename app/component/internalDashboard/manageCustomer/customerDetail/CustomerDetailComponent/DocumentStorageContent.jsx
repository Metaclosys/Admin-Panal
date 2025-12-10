"use client";
import { Table } from "antd";

function DocumentStorageContent() {
  // Client Forms table columns
  const clientFormsColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "60%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      key: "submissionDate",
      width: "20%",
    },
  ];

  // Sample data for client forms
  const clientFormsData = [
    // Empty by default as shown in the image
  ];

  // Other Documents table columns (same structure as Client Forms)
  const otherDocumentsColumns = clientFormsColumns;
  const otherDocumentsData = [
    // Empty by default as shown in the image
  ];

  return (
    <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-230px)]">
      {/* Client Forms Section */}
      <div>
        <div className="bg-blue-500 text-white px-4 py-2 font-medium">
          CLIENT FORMS
        </div>
        <div className="mt-4">
          <Table 
            columns={clientFormsColumns} 
            dataSource={clientFormsData} 
            pagination={false}
            className="w-full"
          />
        </div>
      </div>

      {/* Other Documents Section */}
      <div>
        <div className="bg-blue-500 text-white px-4 py-2 font-medium">
          OTHER DOCUMENTS
        </div>
        <div className="mt-4">
          <Table 
            columns={otherDocumentsColumns} 
            dataSource={otherDocumentsData} 
            pagination={false}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default DocumentStorageContent;
