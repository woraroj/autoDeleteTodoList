"use client";
import { useState, useEffect } from "react";
import { listData } from "../constants";
export default function Home() {
  const [list, setList] = useState([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-9">
        <div className="flex flex-col gap-3">
          {listData.map((data, index) => {
            if (!list.some((eachList) => eachList.name === data.name)) {
              return (
                <div
                  key={index}
                  className="flex justify-center items-center w-full h-10 bg-rose-950 cursor-pointer"
                  onClick={() =>
                    setList([
                      ...list,
                      {
                        ...data,
                        createdAt: Math.round(Date.now() / 1000),
                        expiredAt: Math.round(Date.now() / 1000) + 5,
                      },
                    ])
                  }
                >
                  <p className="text-slate-50">{data.name}</p>
                </div>
              );
            }
          })}
        </div>
        <div className="flex min-h-screen flex-col items-center  border-solid border-2 border-indigo-600">
          <div className="flex justify-center items-center w-full h-10 bg-indigo-600">
            <p className="text-slate-50">Fruit</p>
          </div>
          <div className="flex flex-col w-full mt-3 px-3 gap-3">
            {list
              .filter((data) => data.type === "Fruit")
              .map((data, index) => {
                return (
                  <AutoDeleteDiv data={data} key={index} setList={setList} />
                );
              })}
          </div>
        </div>
        <div className="flex min-h-screen flex-col items-center  border-solid border-2 border-pink-300">
          <div className="flex justify-center items-center w-full h-10 bg-pink-300">
            <p className="text-slate-50">Vegetable</p>
          </div>
          <div className="flex flex-col w-full mt-3 px-3 gap-3">
            {list
              .filter((data) => data.type === "Vegetable")
              .map((data, index) => {
                return (
                  <AutoDeleteDiv data={data} key={index} setList={setList} />
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}

const AutoDeleteDiv = ({ data, setList }) => {
  useEffect(() => {
    const countdown = setInterval(() => {
      let dateInSecs = Math.round(Date.now() / 1000);
      if (dateInSecs >= data.expiredAt) {
        handleRemove();
      }
    }, 1000);

    return () => clearInterval(countdown);
  });

  const handleRemove = () => {
    setList((prevState) => prevState.filter((list) => list.name !== data.name));
  };
  return (
    <div
      className={`flex flex-col justify-center items-center w-full min-h-10 ${
        data.type === "Fruit" ? "bg-indigo-600" : "bg-pink-300"
      } cursor-pointer py-2`}
      onClick={() => handleRemove()}
    >
      <p className="text-slate-50">{data.name}</p>
    </div>
  );
};
