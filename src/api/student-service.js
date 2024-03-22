import bimetri from "./api-instance";


export const getAllCities = () => {
    return bimetri.get("cities");
}
export const addCity = (city) => {
    return bimetri.post("cities", city);
}
export const updateCity = (id, city) => {
    return bimetri.put(`cities/${id}`, city);
}
export const deleteCity = (id) => {
    return bimetri.delete(`cities/${id}`);
}