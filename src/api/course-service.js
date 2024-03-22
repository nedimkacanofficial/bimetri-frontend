import bimetri from "./api-instance";


export const allCourses = () => {
    return bimetri.get("courses");
}
export const addCourse = (cours) => {
  return bimetri.post("courses", cours);
}
export const updateCourse = (id, cours) => {
    return bimetri.put(`courses/${id}`, cours);
}
export const deleteCourse = (id) => {
    return bimetri.delete(`courses/${id}`);
}