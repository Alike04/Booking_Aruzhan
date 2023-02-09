import React from "react";

const Courses = () => {
  const data = [
    {
      name: "IELTS Preparation Course",
      description:
        "Our IELTS preparation course covers all four language skills tested on the IELTS exam (reading, writing, speaking, and listening), providing students with a comprehensive and effective study experience. Students will receive individualized attention and support to help them master the skills and strategies needed to succeed on the IELTS exam.",
    },
    {
      name: "SAT Preparation Course",
      description:
        "Our SAT preparation course is designed to help students master the skills and strategies needed to achieve a high score on the SAT exam. This comprehensive course covers all sections of the test (reading, writing, and math) and focuses on building students’ critical thinking and problem-solving skills, as well as their overall test-taking strategy.",
    },
    {
      name: "English Language Acquisition Course",
      description:
        "Our English language acquisition course is designed for students who are looking to improve their overall English language skills. This comprehensive course covers all aspects of the language, including grammar, vocabulary, speaking, writing, reading, and listening. The course is tailored to meet the individual needs and goals of each student, providing them with the tools and skills they need to achieve fluency in English.",
    },
  ];

  const Card = ({ card }) => {
    return (
      <div className="shadow-xl p-10 border-2 border-slate-200">
        <h1 className="text-lg font-bold">{card.name}</h1>
        <hr className="h-[2px] bg-black mb-9" />
        <p>{card.description}</p>
      </div>
    );
  };
  return (
    <div className="mx-[200px] space-y-10">
      <h1 className="text-center text-2xl mt-10">Courses offered</h1>
      <div className="flex justify-around gap-10">
        {data.map((el, index) => {
          return <Card card={el} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Courses;
