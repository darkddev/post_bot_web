
// export const API_PATH = "http://localhost:5000/api";
// export const SERVER_PATH = "http://localhost:5000";
export const API_PATH = `http://${window.location.host}/api`;
export const SERVER_PATH = `http://${window.location.host}`;
export const Platform = {
    ALL: "ALL",
    F2F: "F2F",
    FNC: "FNC"
}

export const PostType = {
    FREE: 1,
    FAN: 2,
    PAID: 3,
}

export const AdminRole = {
    MANAGER: 1,
    AGENCY: 2,
}