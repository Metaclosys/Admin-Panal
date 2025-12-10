"use client";
import React from "react";
import { Table } from "antd";

const UniversalTable = ({ columns, data, loading = false, rowClassName }) => {
  // Transform columns to match antd format if needed
  const antColumns = columns.map((column) => ({
    title: column.title,
    dataIndex: column.key,
    key: column.key,
    render: column.render,
    sorter: column.sorter,
    filters: column.filters,
    onFilter: column.onFilter,
  }));

  return (
    <>
      <Table
        columns={antColumns}
        dataSource={data}
        loading={loading}
        pagination={{
          total: data.length,
          pageSize: 10,
          // showSizeChanger: true,
          // showQuickJumper: true,
        }}
        bordered
        size="large"
        className="[&_.ant-table-space]:p-10 [&_.ant-table-pagination]:p-1 "
        rowClassName={
          typeof rowClassName === "function"
            ? (record) => `hover:bg-gray-50 ${rowClassName(record) || ""}`
            : "hover:bg-gray-50"
        }
      />
    </>
  );
};

export default UniversalTable;
