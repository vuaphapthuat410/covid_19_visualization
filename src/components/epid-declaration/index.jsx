import React from "react";
// import { COLUMNS_BY_USER } from "../utils/constant";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { EPID_FETCH } from "../utils/constant";
const data = EPID_FETCH.content;
for (let row of data) {
  row.arrTime = row.arrTime.slice(0, 10);
}
class EpidTable extends React.Component {
  constructor(props) {
    super(props);
    // for (let row of props.data) {
    //   row.arrTime = row.arrTime.slice(0, 10);
    // }
    this.state = {
      tableColumns: [],
      tableData: props.data || data,
      columnsByUser: [],
    };

    console.log("columns", props.columns);
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const columns = [
      {
        title: "UserID",
        dataIndex: "userId",
        ...this.getColumnSearchProps("userId"),
      },
      {
        title: "Điểm đến",
        dataIndex: "des",
        defaultSortOrder: "descend",
        ...this.getColumnSearchProps("des"),
      },
      {
        title: "Thời gian đến",
        dataIndex: "arrTime",
        defaultSortOrder: "descend",
        sorter: (a, b) => Date.parse(a.arrTime) - Date.parse(b.arrTime),
      },
      {
        title: "Phương tiện",
        dataIndex: "vehicle",
      },
      {
        title: "Thuốc sử dụng",
        dataIndex: "pharmacy",
      },
    ];
    return <Table columns={columns} dataSource={this.state.tableData} />;
  }
}

export default EpidTable;
