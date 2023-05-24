import request from "../request";

export const listApi = {
  getRolesUrl: "/role/all",
};

// create roles
export function createRoles(data) {
  return request({
    url: "/role/create",
    method: "post",
    data: data,
  });
}
// edit roles
export function updateRoles(data) {
  return request({
    url: "/role/edit",
    method: "post",
    data: data,
  });
}
// delete roles
export function deleteRoles(data) {
  return request({
    url: "/role/delete",
    method: "post",
    data: data,
  });
}