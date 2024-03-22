import React from 'react'
import UserTemplate from '../../templates/user-template'
import StudentGrid from '../../components/student/student-grid'

const CoursePage = () => {
  return (
    <UserTemplate>
      <div
        className="row justify-content-center pt-2 pb-3"
        style={{ minHeight: "calc(100vh - 100px)", margin: 0 }}
      >
        <div className="col-10">
          <h2 className="text-center">Course Operations</h2>
          <StudentGrid />
        </div>
      </div>
    </UserTemplate>
  );
}

export default CoursePage