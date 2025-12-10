import React from "react";
import { Table } from "antd";

// {
//     title: 'Name',
//     dataIndex: 'name',
//     showSorterTooltip: {
//       target: 'full-header',
//     },
//     filters: [
//       {
//         text: 'Joe',
//         value: 'Joe',
//       },
//       {
//         text: 'Jim',
//         value: 'Jim',
//       },
//       {
//         text: 'Submenu',
//         value: 'Submenu',
//         children: [
//           {
//             text: 'Green',
//             value: 'Green',
//           },
//           {
//             text: 'Black',
//             value: 'Black',
//           },
//         ],
//       },
//     ],
//     onFilter: (value, record) => record.name.indexOf(value) === 0,
//     sorter: (a, b) => a.name.length - b.name.length,
//     sortDirections: ['descend'],
//   },

// const onChange = (pagination, filters, sorter, extra) => {
//   console.log("params", pagination, filters, sorter, extra);
// };

const ReportTable = ({ columns, data, loading = false }) => {
  const antColumns = columns.map((column) => {
    const columnConfig = {
      title: column.title,
      dataIndex: column.dataIndex,
      key: column.dataIndex,
      render: column.render,
      sorter: column.sorter,
      filters: column.filters,
      onFilter: column.onFilter,
      sortDirections: column.sortDirections || ["descend", "ascend"],
    };
    if (column.children) {
      columnConfig.children = column.children.map((childColumn) => ({
        title: childColumn.title,
        dataIndex: childColumn.dataIndex,
        key: childColumn.dataIndex,
        render: childColumn.render,
        sorter: childColumn.sorter,
        filters: childColumn.filters,
        onFilter: childColumn.onFilter,
        sortDirections: childColumn.sortDirections || ["descend", "ascend"],
      }));
    }

    return columnConfig;
  });

  return (
    <div className="p-2">
      <Table
        columns={antColumns}
        dataSource={data}
        loading={loading}
        pagination={{
          total: data?.length,
          pageSize: 10,
        }}
        bordered
        size="large"
        className="[&_.ant-table-space]:p-10 [&_.ant-table-pagination]:p-1 [&_.ant-table-thead>tr>th]:bg-blue-500 [&_.ant-table-thead>tr>th]:text-white"
        rowClassName="hover:bg-gray-50"
      />
    </div>
  );
};

export default ReportTable;
