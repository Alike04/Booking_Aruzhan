import React from "react";

const Main = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center h-[85vh] main-image"></div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-opacity-60 bg-black p-10 border-2 border-white">
        <div className="space-y-20 text-center text-white">
          <h1 className="text-5xl">"A-Class" language center</h1>
          <h1 className="text-3xl">
            Achieving Excellence in Language: IELTS, SAT & Beyond
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-32">
        <h1 className="text-2xl font-bold">why choose us?</h1>
        <div className="flex justify-around gap-10 w-[80%]">
          <h1 className="text-lg">
            Experienced Instructors: Our highly qualified and experienced
            instructors are dedicated to helping students achieve their language
            goals through personalized and effective teaching methods.
          </h1>
          <h1 className="text-lg">
            Comprehensive Curriculum: Our IELTS, SAT, and English language
            acquisition courses are designed to provide students with a
            comprehensive and well-rounded learning experience that covers all
            necessary language skills.
          </h1>
          <h1 className="text-lg">
            Proven Results: We have a track record of success in helping
            students achieve their language goals and reach their full potential
            on IELTS, SAT and other language proficiency exams, as well as in
            their personal and professional lives.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Main;
