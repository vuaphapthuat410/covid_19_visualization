// const GET_TEST_BY_QUARANTINE_ID = "";

const IP = "192.168.43.81";
const PORT = "8080";
const GET_ALL_QUARANTINE = `http://${IP}:${PORT}/covid19/api/v1/quarantine`;
const GET_ALL_HEALTH = `http://${IP}:${PORT}/covid19/api/v1/health`;
const GET_ALL_EPID = `http://${IP}:${PORT}/covid19/api/v1/epidemiology`
const GET_PROVINCE_STATUS = "https://disease.sh/v3/covid-19/gov/Vietnam";
export {
  GET_PROVINCE_STATUS,
  GET_ALL_QUARANTINE,
  GET_ALL_HEALTH,
  GET_ALL_EPID
};
