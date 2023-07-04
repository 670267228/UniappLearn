import req from "../untils/request";

export function apiGetBanner(data) {
  return req.request({
    url: "/banner",
    method: "GET",
    data: data,
    authType: "None",
  });
}



