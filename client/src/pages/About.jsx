import React from "react";
import { nanoid } from "nanoid";
import avatar from "../assets/img/avatar.png";
import { teachers } from "../assets/teachers";

const About = () => {
  const foundersData = [
    {
      photo: avatar,
      firstName: "Alisher",
      lastName: "Shamenov",
      description: "NISA Ib student",
    },
    {
      photo: avatar,
      firstName: "Alisher",
      lastName: "Shamenov",
      description: "NISA Ib student",
    },
  ];
  const founders = foundersData.map((el) => {
    return <div className="flex justify-center">{photo(el)}</div>;
  });
  const teachersEl = teachers.map((el) => {
    return <div className="flex justify-center">{photo(el)}</div>;
  });
  return (
    <div className="flex flex-col space-y-10 w-[80%] mx-auto">
      <h1 className="text-center text-4xl mt-6">Out team</h1>
      <div>
        <h1 className="text-2xl text-center mb-8">Founders:</h1>
        <div className="grid grid-cols-2">{founders}</div>
      </div>
      <div>
        <h1 className="text-2xl text-center mb-8">Teachers:</h1>
        <div className="grid grid-cols-4 gap-4">{teachersEl}</div>
      </div>
      <div className="h-[50px]" />
    </div>
  );
};

function photo(data) {
  return (
    <div
      className="max-w-[300px] h-[400px] bg-gray-300 shadow-md p-10 space-y-10"
      key={nanoid()}
    >
      <img src={data.photo} className="w-[80%] mx-auto" alt="" />
      <div>
        <p className="text-center text-xl mb-4">{`${data.firstName} ${data.lastName}`}</p>
        <p className="text-center">{data.description}</p>
      </div>
    </div>
  );
}

export default About;
