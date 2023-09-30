/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} from "../../features/task/taskApi";
import EditTask from "./EditTask";
import ErrorAlert from "./ErrorAlter";

const TaskItem = ({
  task,
  status,
  setCurrentActiveTask,
  setAllTasks,
  allTasksWithStatus,
  setTaskUpdate,
}) => {
  // set remaining time
  // const [hours, setHours] = useState("00");
  // const [minutes, setMinutes] = useState("00");
  // const [seconds, setSeconds] = useState("00");

  // mobile device
  const [openTask, setOpenTask] = useState("");

  // edit task
  const [editTask, setEditTask] = useState(false);

  // set completed task time
  const [completedTaskTime, setCompletedTaskTime] = useState({});

  // error alert
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // update task status api request
  const [updateTaskStatus, { data: updatedTask }] =
    useUpdateTaskStatusMutation();

  // console.log("all task", allTasksWithStatus);

  useEffect(() => {
    if (updatedTask?._id) {
      const updatedTasks = allTasksWithStatus?.map((item) => {
        if (item?._id === updatedTask?._id) {
          return { ...item, status: updatedTask?.status };
        } else {
          return item;
        }
      });

      setAllTasks(updatedTasks);
    }
  }, [updatedTask]);

  // calculate remaining task time
  useEffect(() => {
    if (task?._id) {
      // update task status
      if (new Date(task?.startTime) > new Date()) {
        // don't update task status
      } else if (
        new Date(task?.startTime) <= new Date() &&
        new Date(task?.endTime) >= new Date() &&
        task?.status === "upcoming"
      ) {
        updateTaskStatus({ id: task?._id, status: "ongoing" });
      }

      // Assuming you have start and end times in ISO 8601 format
      const startTimeStr = task?.startTime;
      // const endTimeStr = task?.endTime;

      // Convert the time strings to Date objects
      const startTime = new Date(startTimeStr);
      // const endTime = new Date(endTimeStr);

      // Get the current time
      const currentTime = new Date();

      // Calculate the time difference in milliseconds
      // const timeDifference =
      // task?.timerType === "stopwatch"
      //   ? endTime - (currentTime >= startTime ? currentTime : startTime)
      //   : endTime - startTime;

      const timeDifference = currentTime - startTime;

      // Convert the time difference to hours, minutes, and seconds
      const hoursNow = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
      const minutesNow = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
      const secondsNow = Math.floor((timeDifference % 60000) / 1000); // 1 second = 1000 milliseconds

      setCompletedTaskTime({
        hours: hoursNow,
        minutes: minutesNow,
        seconds: secondsNow,
      });
    }
  }, [task, allTasksWithStatus]);

  // error submit Handler
  const [deleteTask, { data: deletedTask }] = useDeleteTaskMutation();

  useEffect(() => {
    if (deletedTask?._id) {
      toast.success("Task deleted successfully");
      const deletedAllTasks = allTasksWithStatus.filter(
        (task) => task?._id !== deletedTask?._id
      );
      setAllTasks(deletedAllTasks);
      setShowErrorAlert(false);
    }
  }, [allTasksWithStatus, deletedTask, setAllTasks]);

  const deleteSubmitHandler = () => {
    deleteTask(task?._id);
  };

  // update task handler
  const updateTaskHandler = () => {
    if (task?.status === "completed") {
      console.log("completed");
      updateTaskStatus({ id: task?._id, status: "ongoing" });
    }

    if (task?.status === "future" || task?.status === "upcoming") {
      console.log("future || upcoming");
      updateTaskStatus({
        id: task?._id,
        status: "ongoing",
        startTime: new Date(),
      });
    }
  };
  return (
    <>
      <tr
        className={`w-0 h-0 invisible opacity-0 sm:w-full sm:h-full sm:visible sm:opacity-100 ${
          status === "completed" && "text-decoration: line-through"
        }`}
      >
        <td class="px-6 py-2 whitespace-no-wrap text-primary font-semibold">
          <input
            type="checkbox"
            checked={task?.status === "completed"}
            name=""
            id=""
            onChange={updateTaskHandler}
          />
        </td>
        <td class="px-6 py-2 whitespace-no-wrap text-primary font-semibold">
          {task?.name}
        </td>
        <td class="px-6 py-2 whitespace-no-wrap text-primary font-semibold">
          {task?.description?.length > 20
            ? task?.description?.substring(0, 20) + " ..."
            : task?.description}
        </td>
        <td class="px-6 py-2 whitespace-no-wrap text-primary font-semibold">
          {task?.createdOn}
        </td>
        <td class="px-6 py-2 whitespace-no-wrap text-primary font-semibold flex items-center gap-1">
          {task?.tags?.split(",")[0].length > 0 ? (
            task?.tags
              ?.split(",")
              .slice(0, 2)
              ?.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#EAEAEA] text-xs font-semibold text-[#777777] py-1 px-[10px] rounded cursor-pointer transition-all hover:bg-[#c1c0c0]"
                >
                  {tag}
                </span>
              ))
          ) : (
            <p>No Tag</p>
          )}
          {task?.tags?.split(",").length > 2 && (
            <span className="bg-[#EAEAEA] text-xs font-semibold text-[#777777] py-1 px-[10px] rounded cursor-pointer transition-all hover:bg-[#c1c0c0]">
              +{task?.tags?.split(",").length - 2}
            </span>
          )}
        </td>
        <td class="px-6 py-2 whitespace-no-wrap text-primary font-semibold">
          {/* {task?.timerType === "stopwatch" && `Stop Watch`} */}

          {status === "upcoming" && "N/A"}

          {status === "future" && "N/A"}

          {status === "completed" &&
            `${completedTaskTime?.hours}h ${completedTaskTime?.minutes}m ${completedTaskTime?.seconds}s`}

          {status === "ongoing" &&
            `${completedTaskTime?.hours}h ${completedTaskTime?.minutes}m ${completedTaskTime?.seconds}s`}
        </td>
        <td class="px-6 py-2 whitespace-no-wrap flex items-center gap-2">
          <FaPlay
            className={`text-sm ${
              status === "ongoing"
                ? "text-success cursor-pointer"
                : "text-success/30 cursor-not-allowed"
            }`}
            onClick={
              status === "ongoing" ? () => setCurrentActiveTask(task) : () => {}
            }
          />
          <BiSolidPencil
            className={`text-xl ${
              status !== "completed"
                ? "text-secondary cursor-pointer"
                : "text-secondary/30 cursor-not-allowed"
            }`}
            onClick={
              status !== "completed" ? () => setEditTask(true) : () => {}
            }
          />
          <AiOutlineDelete
            className="text-xl cursor-pointer text-alert"
            onClick={() => setShowErrorAlert(true)}
          />
        </td>
      </tr>

      {/* task switch alert */}
      <ErrorAlert
        title="Are you sure you want to delete?"
        description="You won’t be able to reverse this action."
        icon="trash-white"
        closeHandler={() => setShowErrorAlert(false)}
        submitHandler={deleteSubmitHandler}
        open={showErrorAlert}
      />

      {/* edit task */}
      <EditTask
        editTask={editTask}
        setEditTask={setEditTask}
        task={task}
        allTasksWithStatus={allTasksWithStatus}
        setAllTasks={setAllTasks}
        setTaskUpdate={setTaskUpdate}
      />

      {/* for mobile device */}
      <div className="block sm:hidden bg-[#F8F8F8] rounded-bl-md rounded-br-md overflow-hidden">
        <div className="flex items-center justify-between gap-5 bg-[#EDEDED] p-3 rounded-tl-md rounded-tr-md">
          <div className="flex items-center gap-5">
            <input
              checked={status === "completed"}
              type="checkbox"
              name=""
              id=""
              onChange={() =>
                status === "completed" &&
                updateTaskStatus({ id: task?._id, status: "completed" })
              }
            />
            <h3
              className={
                status === "completed" && "text-decoration: line-through"
              }
            >
              {task?.name}
            </h3>
          </div>
          <div
            className="w-6 h-6 rounded bg-white flex items-center justify-center text-xl text-secondary cursor-pointer"
            onClick={() => setOpenTask(openTask === task?._id ? "" : task?._id)}
          >
            <MdOutlineKeyboardArrowDown
              className={`transition-all duration-300 ${
                openTask === task?._id ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>

        <div className={`${openTask === task?._id ? "h-full" : "h-0"}`}>
          <div className="p-3 flex flex-col gap-4">
            <div className="flex justify-between">
              <p>Description</p>
              <p
                className={`text-right ${
                  status === "completed" && "text-decoration: line-through"
                }`}
              >
                {task?.description?.length > 20
                  ? task?.description?.substring(0, 20) + " ..."
                  : task?.description}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Created On</p>
              <p
                className={`text-right ${
                  status === "completed" && "text-decoration: line-through"
                }`}
              >
                {task?.createdOn}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs">Tags</p>
              <div>
                {task?.tags
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
                {task?.tags?.split(",").length > 2 && (
                  <span className="bg-[#EAEAEA] text-xs font-semibold text-[#777777] py-1 px-[10px] rounded cursor-pointer transition-all hover:bg-[#c1c0c0]">
                    +{task?.tags?.split(",").length - 2}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <p>Timer</p>
              <div>
                {/* {task?.timerType === "stopwatch" && `Stop Watch`} */}

                {status === "upcoming" && "N/A"}

                {status === "future" && "N/A"}

                {status === "completed" &&
                  `${completedTaskTime?.hours}h ${completedTaskTime?.minutes}m ${completedTaskTime?.seconds}s`}

                {status === "ongoing" &&
                  `${completedTaskTime?.hours}h ${completedTaskTime?.minutes}m ${completedTaskTime?.seconds}s`}
              </div>
            </div>
            <div className="flex justify-between">
              <p className="">Actions</p>
              <div className="flex items-center gap-3">
                <FaPlay
                  className={`text-sm ${
                    status === "ongoing"
                      ? "text-success cursor-pointer"
                      : "text-success/30 cursor-not-allowed"
                  }`}
                  onClick={
                    status === "ongoing"
                      ? () => setCurrentActiveTask(task)
                      : () => {}
                  }
                />
                <BiSolidPencil
                  className={`text-xl ${
                    status !== "completed"
                      ? "text-secondary cursor-pointer"
                      : "text-secondary/30 cursor-not-allowed"
                  }`}
                  onClick={
                    status !== "completed" ? () => setEditTask(true) : () => {}
                  }
                />
                <AiOutlineDelete
                  className="text-xl cursor-pointer text-alert"
                  onClick={() => setShowErrorAlert(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
