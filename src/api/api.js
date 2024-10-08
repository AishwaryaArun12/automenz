import BulkInstance from "./config";


export const NewClient = async (data) => {
    return await BulkInstance.post("clients/add",data);
  };
  export const login = async (data) => {
    return await BulkInstance.post("login",data);
  };
  export const updateToken = async (token) => {
    return await BulkInstance.put("update/token",{fcmToken :token});
  };
  export const getClientData = async (search,page) => {
    return await BulkInstance.get(`clients/all?search=${search}&&page=${page}`);
  };
  export const getClientDetails = async (id) => {
    return await BulkInstance.get(`clients/get/${id}`);
  };
  export const EditClient = async (data) => {
    return await BulkInstance.put(`clients/update/${data._id}`,data);
  };
  export const EditVehicle = async (data) => {
    return await BulkInstance.put(`vehicles/update/${data._id}`,data);
  };
  export const getVehicleDetails = async (id) => {
    return await BulkInstance.get(`vehicles/get/${id}`);
  };
  export const NewVehicle = async (data) => {
    return await BulkInstance.post("vehicles/add",data);
  };
  export const getVehicleData = async (search,page) => {
    return await BulkInstance.get(`vehicles/all?search=${search}&&page=${page}`);
  };
  export const EditSpare = async (data) => {
    return await BulkInstance.put(`spare/update/${data._id}`,data);
  };
  export const NewSpare = async (data) => {
    return await BulkInstance.post("spare/add",data);
  };
  export const getSpareData = async (search,page) => {
    return await BulkInstance.get(`spare/all?search=${search}&&page=${page}`);
  };
  export const DeleteSpare = async (id) => {
    return await BulkInstance.delete(`spare/delete/${id}`);
  };
  export const DeleteVehicle = async (id) => {
    return await BulkInstance.delete(`vehicles/delete/${id}`);
  };
  export const getServiceData = async (search, page) => {
    return await BulkInstance.get(`service/all?search=${search}&&page=${page}`);
  };
  export const NewService = async (data) => {
    return await BulkInstance.post("service/add",data);
  };
  export const EditService = async (data) => {
    return await BulkInstance.put(`service/update/${data._id}`,data);
  };
  export const DeleteService = async (id) => {
    return await BulkInstance.delete(`service/delete/${id}`);
  };
  export const getDashboard = async () => {
    return await BulkInstance.get('vehicles/getDashboard');
  };
  export const getNotification = async (page = 1) => {
    return await BulkInstance.get(`notification/all?page=${page}`);
  };
  
  export const readNotification = async (id) => {
    return await BulkInstance.put(`notification/read/${id}`);
  };
  export const getNotcount = async () => {
    return await BulkInstance.get("notification/count");
  };
  export const getServiceDetails = async (id) => {
    return await BulkInstance.get(`service/get/${id}`);
  };
  export const EditCategory = async (data) => {
    return await BulkInstance.put(`spare/update/category/${data._id}`,data);
  };
  export const NewCategory = async (data) => {
    return await BulkInstance.post("spare/add/category",data);
  };
  export const getCategoryData = async (search,page) => {
    return await BulkInstance.get(`spare/all/category?search=${search}&&page=${page}`);
  };
  export const DeleteCategory = async (id) => {
    return await BulkInstance.delete(`spare/delete/category/${id}`);
  };