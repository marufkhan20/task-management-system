/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose, AiOutlinePause } from "react-icons/ai";
import { BsHourglassTop } from "react-icons/bs";
import { FiPlay } from "react-icons/fi";
import { IoCheckmarkSharp, IoReloadSharp } from "react-icons/io5";
import { PiTimer } from "react-icons/pi";
import { useUpdateTaskStatusMutation } from "../../features/task/taskApi";

const CurrentTask = ({
  setCurrentActiveTask,
  currentActiveTask,
  setAllTasks,
  allTasks,
}) => {
  // set currentActivePrevent taks
  const [preventTask, setPreventTask] = useState({});

  // set remaining time
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [taskBreak, setTaskBreak] = useState();
  const [pause, setPause] = useState(false);

  // calculate remaining task time
  useEffect(() => {
    setPreventTask(currentActiveTask);

    let taskRemainingTime;

    if (currentActiveTask?._id !== preventTask?._id) {
      clearInterval(taskRemainingTime);
    }

    if (pause) {
      clearInterval(taskRemainingTime);
    }

    if (currentActiveTask?._id && !pause) {
      taskRemainingTime = setInterval(() => {
        // Assuming you have start and end times in ISO 8601 format
        const startTimeStr = currentActiveTask?.startTime;
        const endTimeStr = currentActiveTask?.endTime;

        // Convert the time strings to Date objects
        const startTime = new Date(startTimeStr);
        const endTime = new Date(endTimeStr);

        // Get the current time
        const currentTime = new Date();

        // Calculate the time difference in milliseconds
        let timeDifference;

        if (currentActiveTask?.timerType === "stopwatch") {
          timeDifference = startTime + currentTime;
        } else {
          timeDifference =
            endTime - (currentTime >= startTime ? currentTime : startTime);
        }

        // Convert the time difference to hours, minutes, and seconds
        const hoursNow = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
        const minutesNow = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
        const secondsNow = Math.floor((timeDifference % 60000) / 1000); // 1 second = 1000 milliseconds

        if (currentActiveTask?.timerType === "pomodoro") {
          currentActiveTask?.intervalsBreakPoints?.forEach((item) => {
            // console.log(
            //   "item",
            //   new Date(item?.breakStart) >= new Date() &&
            //     new Date(item?.breakEnd) <= new Date()
            // );
            if (
              new Date() >= new Date(item?.breakStart) &&
              new Date() <= new Date(item?.breakEnd)
            ) {
              console.log("work");
              setTaskBreak(
                `This is task break for ${
                  currentActiveTask?.longBreakMinutes
                    ? currentActiveTask?.longBreakMinutes
                    : currentActiveTask?.shortBreakMinutes
                } minutes`
              );
            }
          });
        }

        if (!taskBreak) {
          setHours(hoursNow);
          setMinutes(minutesNow);
          setSeconds(secondsNow);
        }
      }, 1000);

      return () => {
        clearInterval(taskRemainingTime);
      };
    }
  }, [currentActiveTask, preventTask, pause]);

  const { _id, name, description, tags } = currentActiveTask || {};

  // update task status api request
  const [updateTaskStatus, { data: updatedTask }] =
    useUpdateTaskStatusMutation();

  useEffect(() => {
    if (updatedTask?._id) {
      toast.success("Task completed successfully");
      setCurrentActiveTask({});
      const updatedTasks = allTasks?.map((item) => {
        if (item?._id === updatedTask?._id) {
          return { ...item, status: updatedTask?.status };
        } else {
          return item;
        }
      });

      setAllTasks(updatedTasks);
    }
  }, [updatedTask]);

  const completeTask = () => {
    updateTaskStatus({ id: _id, status: "completed" });
  };
  return (
    <div className="mt-4">
      <h2 className="text-lg text-secondary border-b border-light-secondary py-3">
        Current task
      </h2>

      <div className="border-b border-light-secondary py-5">
        <div className="border border-success py-[38px] px-5 rounded flex items-center flex-wrap justify-between gap-7">
          {/* description */}
          <div>
            <h3>{name}</h3>
            <p className="my-3 text-xs">{description}</p>
            <div class="text-primary font-semibold flex items-center gap-1">
              {tags
                ?.split(",")
                .slice(0, 2)
                ?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#EAEAEA] text-xs font-semibold text-[#777777] py-1 px-[10px] rounded cursor-pointer transition-all hover:bg-[#c1c0c0]"
                  >
                    {tag}
                  </span>
                ))}
              {tags?.split(",").length > 2 && (
                <span className="bg-[#EAEAEA] text-xs font-semibold text-[#777777] py-1 px-[10px] rounded cursor-pointer transition-all hover:bg-[#c1c0c0]">
                  +{tags?.split(",").length - 2}
                </span>
              )}
            </div>
          </div>

          {/* timer */}
          <div className="flex items-center flex-wrap justify-between gap-3">
            <div className="p-[34px] bg-[#F8F8F8] rounded font-medium text-[40px]">
              <h2>{hours}</h2>
            </div>
            <h3 className="text-[40px]">:</h3>
            <div className="p-[34px] bg-[#F8F8F8] rounded font-medium text-[40px]">
              <h2>{minutes}</h2>
            </div>
            <h3 className="text-[40px]">:</h3>
            <div className="p-[34px] bg-[#F8F8F8] rounded font-medium text-[40px]">
              <h2>{seconds}</h2>
            </div>
            <div className="flex flex-col gap-4 text-lg ml-4">
              <PiTimer className="cursor-pointer" />
              <BsHourglassTop className="cursor-pointer" />
            </div>
          </div>

          {/* controller */}
          <div className="flex items-center gap-4">
            <button className="mr-4 font-semibold text-secondary flex items-center gap-2 cursor-pointer">
              <IoReloadSharp className="text-base" />
              <span>Restart</span>
            </button>
            <div className="flex flex-col gap-4">
              {!pause ? (
                <button
                  className="flex items-center gap-4 py-2 px-3 rounded bg-warning text-white font-medium cursor-pointer transition-all hover:bg-warning/70"
                  onClick={() => setPause(true)}
                >
                  <AiOutlinePause />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  className="flex items-center gap-4 py-2 px-3 rounded bg-green-500 text-white font-medium cursor-pointer transition-all hover:bg-green-500/70"
                  onClick={() => setPause(false)}
                >
                  <FiPlay />
                  <span>Start</span>
                </button>
              )}
              <button
                className="flex items-center gap-4 py-2 px-3 rounded bg-success text-white font-medium cursor-pointer transition-all hover:bg-success/70"
                onClick={completeTask}
              >
                <IoCheckmarkSharp />
                <span>Complete</span>
              </button>
            </div>
            <AiOutlineClose
              onClick={() => setCurrentActiveTask("")}
              className="cursor-pointer text-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentTask;
