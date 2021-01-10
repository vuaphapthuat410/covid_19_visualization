import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Modal, Button } from "antd";
// import "react-pro-sidebar/dist/css/styles.css";
import "./cussidebar.scss";
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import DichTe from "../form-dich-te";
import Isolation from "../form-isolation";
import Health from "../form-health";
import IsolationDeclarationTable from "../isolation-declaration";
import EpidTable from "../epid-declaration"
import HealthTable from "../health-declaration"
import {
  GET_ALL_HEALTH,
  GET_ALL_QUARANTINE,
  GET_ALL_EPID,
} from "../../plugins/api";
class Aside extends Component {
  state = {
    loading: false,
    visible: false,
    dichTeVisible: false,
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
        dichTeVisible: false,
        healthVisible: false,
        isolationVisible: false,
      });
    }, 300);
  };

  handleCancel = () => {
    this.setState({
      dichTeVisible: false,
      healthVisible: false,
      isolationVisible: false,
    });
  };

  handleGetAllQuanrantine() {
    fetch(GET_ALL_QUARANTINE)
      .then((res) => res.json())
      .then((res) => {
        console.log("All Quaran Res", res);
        // if(res.content[0])
        // {}
        const columns = Object.keys(res.content[0]);
        const refactoredColumns = columns.map((column) => {
          return {
            title: column.charAt(0).toUpperCase() + column.slice(1),
            dataIndex: column,
            key: column,
          };
        });
        const valueData = res.content.map((data, index) => {
          return {
            key: index,
            ...data,
          };
        });
        this.setState({
          isolationTableColumns: refactoredColumns,
          isolationTableData: valueData,
        });
      });
  }
  handleGetAllEpid() {
    fetch(GET_ALL_EPID)
      .then((res) => res.json())
      .then((res) => {
        let valueData = res.content
        for (let row of valueData) {
          row.arrTime = row.arrTime.slice(0, 10);
        }
        console.log("epid", valueData)
        this.setState({
          epidData: valueData,
        });
      });
  }
  handleGetAllHealth() {
    fetch(GET_ALL_HEALTH)
      .then((res) => res.json())
      .then((res) => {
        let valueData = res.content;
        for (let row of valueData) {
          row["tags"] = [];
          row["disease"] = [];
          if (row.fever) row.tags.push("Sốt");
          if (row.cough) row.tags.push("Ho");
          if (row.shortWinded) row.tags.push("Khó thở");
          if (row.pneumonia) row.tags.push("Viêm phổi");
          if (row.soreThroat) row.tags.push("Viêm họng");
          if (row.tired) row.tags.push("Mệt");
          if (row.chronicBlood) row.disease.push("Máu mãn tính");
          if (row.chronicKidney) row.disease.push("Thận mãn tính");
          if (row.chronicLiver) row.disease.push("Gan mãn tính");
          if (row.chronicLung) row.disease.push("Phổi mãn tính");
          if (row.heartRelatedDiseases) row.disease.push("Tim mạch");
        }
        console.log("epid", valueData);
        this.setState({
          healthData: valueData,
        });
      });
  }
  componentDidMount() {
    this.handleGetAllQuanrantine();
    this.handleGetAllHealth();
    this.handleGetAllEpid();
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <div className="fixed block inset-y-0  border-r-2 w-10">
          <ProSidebar>
            <SidebarContent>
              <Menu>
                <MenuItem icon={<DashboardOutlined />}>Dashboard</MenuItem>
              </Menu>
              <Menu>
                <SubMenu title="Quản lý" icon={<UserOutlined />}>
                  <MenuItem
                    type="primary"
                    onClick={() => {
                      this.setState({ dichTeVisible: true });
                    }}
                  >
                    Quản lý Khai báo Dịch tễ
                  </MenuItem>

                  <MenuItem
                    type="primary"
                    onClick={() => {
                      this.setState({ healthVisible: true });
                    }}
                  >
                    Quản lý Khai báo Sức khỏe
                  </MenuItem>

                  <MenuItem
                    type="primary"
                    onClick={() => {
                      this.setState({ isolationVisible: true });
                    }}
                  >
                    Quản lý Khai báo Cách ly
                  </MenuItem>
                </SubMenu>
                <SubMenu title="Cập nhật cách ly" icon={<UserOutlined />}>
                  <MenuItem type="primary">
                    Khai báo Dịch tễ
                    <Link to="/dichte" />
                  </MenuItem>
                  <MenuItem type="primary">
                    Khai báo Sức khỏe
                    <Link to="/suckhoe" />
                  </MenuItem>
                  <MenuItem type="primary">
                    Khai báo Cách ly
                    <Link to="/cachly" />
                  </MenuItem>
                </SubMenu>
              </Menu>
            </SidebarContent>

            <SidebarFooter>
              <Menu>
                <MenuItem icon={<SettingOutlined />}>Settings</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>

        <Modal
          width="60vw"
          visible={this.state.healthVisible}
          title="Quản lý Khai Báo Sức Khỏe"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              OK
            </Button>,
          ]}
        >
          <HealthTable
            columns={this.state.healthColumns}
            data={this.state.healthData}
          />
        </Modal>

        <Modal
          width="60vw"
          visible={this.state.dichTeVisible}
          title="Quản lý Khai Báo Dịch Tễ"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              OK
            </Button>,
          ]}
        >
          <EpidTable
            columns={this.state.epidColumns}
            data={this.state.epidData}
          />
        </Modal>

        <Modal
          width="60vw"
          visible={this.state.isolationVisible}
          title="Quản lý Khai Báo Cách Ly"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              OK
            </Button>,
          ]}
        >
          <IsolationDeclarationTable
            columns={this.state.isolationTableColumns}
            data={this.state.isolationTableData}
          />
        </Modal>
      </>
    );
  }
}

export default Aside;
