import React from "react";

const Main = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center h-[85vh] main-image">
        <div className="space-y-20 text-center">
          <h1 className="text-5xl">"A-Class" language center</h1>
          <h1 className="text-3xl">SLOGAN</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-32">
        <h1 className="text-2xl">why choose us?</h1>
        <div className="flex justify-around w-[80%]">
          <h1 className="text-lg">Reason 1</h1>
          <h1 className="text-lg">Reason 2</h1>
          <h1 className="text-lg">Reason 3</h1>
        </div>
      </div>
    </div>
  );
};

export default Main;
