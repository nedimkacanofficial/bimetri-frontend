import bimetri from "./api-instance";

export const allCourses = () => {
  return bimetri.get("courses");
};
export const coursesWithoutStudents = () => {
  return bimetri.get("courses/courses-without-students");
};
export const coursesEnroll = (studentId, courseId) => {
  return bimetri.post(
    `courses/enroll?studentId=${studentId}&courseId=${courseId}`
  );
};
export const addCourse = (cours) => {
  return bimetri.post("courses", cours);
};
export const updateCourse = (id, cours) => {
  return bimetri.put(`courses/${id}`, cours);
};
export const deleteCourse = (id) => {
  return bimetri.delete(`courses/${id}`);
};
