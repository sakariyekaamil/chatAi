"use client";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  // useState

  const [count, setCount] = useState(0);

  // increment

  const incHandler = () => {
    setCount(count + 1);
  };

  // dicrement

  if (count < 0) return alert("error")
  const dicHandler = () => {
    setCount(+count - 1);
  };

  return (
    <div className="w-full h-[80vh] items-center justify-center flex  overflow-y-hidden ">
      <div className="bg-gray-600 w-80  flex gap-10  items-center justify-center rounded-md text-white h-32 ">
        <button
          onClick={dicHandler}
          className="py-3 px-4 rounded-lg bg-amber-500  cursor-pointer"
        >
          -
        </button>
        <h1> {count} </h1>
        <button
          onClick={incHandler}
          className="py-3 px-4 rounded-lg bg-amber-500  cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default page;
