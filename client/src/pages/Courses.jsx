import React from "react";

const Courses = () => {
  return (
    <div className="mx-[200px] space-y-10">
      <h1 className="text-center text-2xl mt-10">Courses offered</h1>
      <div>
        <div>
          <h1 className="text-lg">Academic English</h1>
          <ul className="list-disc text-lg ml-10">
            <li>----------------</li>
            <li>----------------</li>
            <li>----------------</li>
            <li>----------------</li>
            <li>----------------</li>
          </ul>
        </div>
        <div>
          <h1 className="text-lg">IELTS preparation courses</h1>
          <ul className="list-disc text-lg ml-10">
            <li>----------------</li>
            <li>----------------</li>
            <li>----------------</li>
            <li>----------------</li>
            <li>----------------</li>
          </ul>
        </div>
        <div>
          <h1 className="text-lg">SAT preparation courses</h1>
          <ul className="list-disc text-lg ml-10">
            <li>----------------</li>
            <li>----------------</li>
            <li>----------------</li>
            <li>----------------</li>
            <li>----------------</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Courses;
