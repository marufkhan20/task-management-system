/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose, AiOutlinePause } from "react-icons/ai";
import { BsHourglassTop } from "react-icons/bs";
import { FiPlay } from "react-icons/fi";
import { IoCheckmarkSharp, IoReloadSharp } from "react-icons/io5";
import { PiTimer } from "react-icons/pi";
import {
  useRestartTaskMutation,
  useStartTaskMutation,
  useUpdateTaskBreakMutation,
  useUpdateTaskIntervalsMutation,
  useUpdateTaskStatusMutation,
} from "../../features/task/taskApi";

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
  const [pauseStartTime, setPauseStartTime] = useState("");
  const [breakTime, setBreakTime] = useState();

  let taskRemainingTime;

  // check task break time
  useEffect(() => {
    if (
      currentActiveTask?.timerType === "pomodoro" &&
      currentActiveTask?.intervals !== currentActiveTask?.completedIntervals
    ) {
      if (
        new Date(currentActiveTask?.breakStart).toTimeString() >=
          new Date().toTimeString() &&
        new Date(currentActiveTask?.breakEnd).toTimeString() <=
          new Date().toTimeString()
      ) {
        setBreakTime(true);
      }
    }
  }, [currentActiveTask]);

  // update task break
  const [updateTaskBreak, { data: updatedBreakTask }] =
    useUpdateTaskBreakMutation();

  useEffect(() => {
    if (updatedBreakTask?._id) {
      setCurrentActiveTask(updatedBreakTask);
      setBreakTime(true);
      const updatedTasks = allTasks?.map((item) => {
        if (item?._id === updatedBreakTask?._id) {
          return updatedBreakTask;
        } else {
          return item;
        }
      });

      setAllTasks(updatedTasks);
    }
  }, [updatedBreakTask]);

  // update task intervals
  const [updateTaskIntervals, { data: updatedIntervalsTask }] =
    useUpdateTaskIntervalsMutation();

  useEffect(() => {
    if (updatedIntervalsTask?._id) {
      console.log("updated intervals", updatedIntervalsTask);
      clearInterval(taskRemainingTime);
      if (
        updatedIntervalsTask?.intervals <=
        updatedIntervalsTask?.completedIntervals
      ) {
        toast.success("Task completed successfully");
        setBreakTime(true);
      }
      setBreakTime(false);
      setCurrentActiveTask(updatedIntervalsTask);
      const updatedTasks = allTasks?.map((item) => {
        if (item?._id === updatedIntervalsTask?._id) {
          return updatedIntervalsTask;
        } else {
          return item;
        }
      });

      setAllTasks(updatedTasks);
    }
  }, [updatedIntervalsTask]);

  // calculate remaining task time
  useEffect(() => {
    setPreventTask(currentActiveTask);

    if (currentActiveTask?._id !== preventTask?._id) {
      clearInterval(taskRemainingTime);
      setPauseStartTime("");
      setBreakTime("");
    }

    if (pauseStartTime) {
      clearInterval(taskRemainingTime);
    }

    if (currentActiveTask?._id && !pauseStartTime) {
      taskRemainingTime = setInterval(() => {
        if (currentActiveTask?.timerType === "pomodoro") {
          const currentDate = new Date();
          const endTime = new Date(currentActiveTask?.endTime);

          if (currentDate.toTimeString() >= endTime.toTimeString()) {
            if (
              currentActiveTask?.intervals !==
              currentActiveTask?.completedIntervals
            ) {
              if (
                !breakTime &&
                new Date(currentActiveTask?.breakEnd).toTimeString() !==
                  currentDate.toTimeString()
              ) {
                console.log("break request");
                setBreakTime(true);
                // set break timer
                updateTaskBreak(currentActiveTask?._id);
              }

              if (
                currentDate.getSeconds() >=
                  new Date(currentActiveTask?.breakEnd).getSeconds() &&
                currentDate.getMinutes() >=
                  new Date(currentActiveTask?.breakEnd).getMinutes() &&
                currentDate.getHours() >=
                  new Date(currentActiveTask?.breakEnd).getHours()
              ) {
                console.log("send intervals request");
                // update task invertals
                updateTaskIntervals(currentActiveTask?._id);
              }
            }
          }
        }

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
          timeDifference = currentTime - startTime;
        } else {
          timeDifference =
            endTime - (currentTime >= startTime ? currentTime : startTime);
        }

        // Convert the time difference to hours, minutes, and seconds
        const hoursNow = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
        const minutesNow = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
        const secondsNow = Math.floor((timeDifference % 60000) / 1000); // 1 second = 1000 milliseconds

        if (!breakTime) {
          setHours(hoursNow);
          setMinutes(minutesNow);
          setSeconds(secondsNow);
        }
      }, 1000);

      return () => {
        clearInterval(taskRemainingTime);
      };
    }
  }, [currentActiveTask, preventTask, pauseStartTime]);

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

  // task start handler
  const [startTask, { data: startedTask }] = useStartTaskMutation();

  useEffect(() => {
    if (startedTask?._id) {
      setCurrentActiveTask(startedTask);
      setPauseStartTime("");
    }
  }, [startedTask]);

  const taskStartHandler = () => {
    startTask({
      id: currentActiveTask?._id,
      data: {
        pauseStartTime,
        pauseEndTime: new Date(),
      },
    });
    setPauseStartTime("");
  };

  // restart task time
  const [restartTask, { data: restartedTask }] = useRestartTaskMutation();

  useEffect(() => {
    if (restartedTask?._id) {
      setBreakTime(false);
      toast.success("Task Restarted Successfully");
      setCurrentActiveTask(restartedTask);
      const restartedTasks = allTasks?.map((item) => {
        if (item?._id === restartedTask?._id) {
          return restartedTask;
        } else {
          return item;
        }
      });

      setAllTasks(restartedTasks);
    }
  }, [restartedTask]);
  return (
    <div className="mt-4">
      <h2 className="text-lg text-secondary border-b border-light-secondary py-3">
        Current task
      </h2>

      <div className="border-b border-light-secondary py-5">
        <div className="border border-success py-[38px] px-5 rounded">
          <div className="flex items-center flex-wrap justify-between gap-7">
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
              <div className="p-[34px] bg-[#F8F8F8] rounded font-medium text-[40px] relative min-w-[112px] text-center">
                {currentActiveTask?.intervals && (
                  <p className="text-xs px-3 py-1 border rounded-full border-heading absolute right-0 top-1">
                    {currentActiveTask?.completedIntervals}/
                    {currentActiveTask?.intervals} interval
                  </p>
                )}
                <h2>{hours}</h2>
              </div>
              <h3 className="text-[40px]">:</h3>
              <div className="p-[34px] bg-[#F8F8F8] rounded font-medium text-[40px] min-w-[112px] text-center relative">
                {currentActiveTask?.longBreakMinutes && (
                  <p className="text-xs px-3 py-1 border rounded-full border-heading absolute right-0 top-1">
                    +{currentActiveTask?.longBreakMinutes}m
                  </p>
                )}
                <h2>{minutes}</h2>
              </div>
              <h3 className="text-[40px]">:</h3>
              <div className="p-[34px] bg-[#F8F8F8] rounded font-medium text-[40px] min-w-[112px] text-center relative">
                {currentActiveTask?.shortBreakMinutes && (
                  <p className="text-xs px-3 py-1 border rounded-full border-heading absolute right-0 top-1">
                    +{currentActiveTask?.shortBreakMinutes}m
                  </p>
                )}
                <h2>{seconds}</h2>
              </div>
              <div className="flex flex-col gap-4 text-lg ml-4">
                <PiTimer className="cursor-pointer" />
                <BsHourglassTop className="cursor-pointer" />
              </div>
            </div>

            {/* controller */}
            <div className="flex items-center gap-4">
              <button
                className="mr-4 font-semibold text-secondary flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  restartTask(currentActiveTask?._id);
                }}
              >
                <IoReloadSharp className="text-base" />
                <span>Restart</span>
              </button>
              <div className="flex flex-col gap-4">
                {!pauseStartTime ? (
                  <button
                    className="flex items-center gap-4 py-2 px-3 rounded bg-warning text-white font-medium cursor-pointer transition-all hover:bg-warning/70"
                    onClick={() => setPauseStartTime(new Date())}
                  >
                    <AiOutlinePause />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-4 py-2 px-3 rounded bg-green-500 text-white font-medium cursor-pointer transition-all hover:bg-green-500/70"
                    onClick={taskStartHandler}
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

          {breakTime && (
            <p className="text-lg mt-3 font-medium text-center">
              Now It's Break Time
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentTask;
