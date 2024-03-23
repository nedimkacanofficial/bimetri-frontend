import bimetri from "./api-instance";

export const allStudents = () => {
  return bimetri.get("students");
};
export const studentsWithoutCourses = () => {
  return bimetri.get("students/students-without-courses");
};
export const getStudentAndCourses = () => {
  return bimetri.get("students/student-and-courses");
};
export const addStudent = (student) => {
  return bimetri.post("students", student);
};
export const updateStudent = (id, student) => {
  return bimetri.put(`students/${id}`, student);
};
export const deleteStudent = (id) => {
  return bimetri.delete(`students/${id}`);
};
