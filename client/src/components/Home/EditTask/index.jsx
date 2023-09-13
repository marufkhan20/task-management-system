/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCalendar, AiOutlineClose } from "react-icons/ai";
import { FiTag } from "react-icons/fi";
import { HiOutlineFolder } from "react-icons/hi2";
import { MdAccessTime } from "react-icons/md";
import { useGetCategoryQuery } from "../../../features/category/categoryApi";
import { useUpdateTaskMutation } from "../../../features/task/taskApi";
import Categories from "./Categories";
import SelectTimer from "./SelectTimer";

const EditTask = ({
  editTask,
  setEditTask,
  task,
  allTasksWithStatus,
  setAllTasks,
}) => {
  const [openTimer, setOpenTimer] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openTags, setOpenTags] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});
  const [getCategory, setGetCategory] = useState(false);

  // form data state
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [category, setCategory] = useState({});
  const [timerType, setTimerType] = useState();
  const [tags, setTags] = useState("");
  const [createdOn, setCreatedOn] = useState();
  const [description, setDescription] = useState();
  const [editableTime, setEditableTime] = useState({});

  // set time now
  const setTimeNow = (time) => {
    setSelectedTime(time);
    setOpenTimer(false);
  };

  // get category form server using category id
  const { data } = useGetCategoryQuery(task?.category, { skip: !getCategory });

  useEffect(() => {
    if (data?._id) {
      setCategory(data);
    }
  }, [data]);

  // set previous state
  useEffect(() => {
    if (task?._id) {
      setGetCategory(true);
      setName(task.name);
      setDescription(task.description);
      setStartTime(task?.startTime);
      setEndTime(task?.endTime);
      setTags(task?.tags);
      setCreatedOn(task?.createdOn);
      setSelectedTime(task?.editableTime);
      setEditableTime(task?.editableTime);
      setTimerType(task?.timerType);
    }

    if (task?.tags) {
      setOpenTags(true);
    }
  }, [task]);

  // api request prepare
  const [updateTask, { data: updatedTask, isError, error, isLoading }] =
    useUpdateTaskMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      console.log(error);
    }

    if (!isLoading && !isError && updatedTask?._id) {
      toast.success("Task updated successfully");
      const updatedTasks = allTasksWithStatus?.map((item) => {
        if (item?._id === updatedTask?._id) {
          return updatedTask;
        } else {
          return item;
        }
      });

      setAllTasks(updatedTasks);
      setEditTask(false);
    }
  }, [updatedTask, isError, error, isLoading, setEditTask]);

  // submit handler
  const submitHandler = () => {
    updateTask({
      id: task?._id,
      data: {
        name,
        startTime,
        endTime,
        createdOn,
        category,
        tags,
        description,
        editableTime,
        timerType,
      },
    });
  };
  return (
    <>
      <div
        className={`transition-all duration-300 ${
          editTask ? "visible opacity-100" : "invisible opacity-0"
        } fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-[#1D1D1D4D]/40 z-40`}
        onClick={() => setEditTask(false)}
      ></div>

      <div
        className={`transition-all duration-300 ${
          editTask ? "right-0" : "-right-[200%]"
        } fixed top-0 bottom-0 z-50 w-full md:w-[650px] min-h-full bg-white box-shadow`}
      >
        {/* header */}
        <div className="flex items-center justify-between gap-4 p-3 border-b border-light-secondary">
          <AiOutlineClose
            className="text-lg cursor-pointer"
            onClick={() => setEditTask(false)}
          />
          <button
            className="text-secondary font-semibold text-base transition-all hover:text-secondary/50"
            onClick={submitHandler}
          >
            Update
          </button>
        </div>

        {/* create form */}
        <div className="px-8 mt-8">
          <div className="flex items-center gap-5 pb-6 border-b border-light-secondary">
            <img src="/img/icons/task.svg" alt="task icon" />
            <input
              className="text-[#AFAFAF] placeholder:text-[#AFAFAF] font-semibold text-[32px] outline-none w-full"
              type="text"
              placeholder="Task Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="pt-8 pb-6 border-b border-light-secondary mb-8 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 w-[25%]">
                <MdAccessTime className="text-xl text-[#4A3093]" />
                <span className="text-heading font-semibold">Timer</span>
              </div>
              <div className="w-[75%] relative">
                <button
                  className="text-[#999999] text-base font-medium py-2 transition-all hover:bg-light-secondary px-3 rounded w-full text-left"
                  onClick={() => setOpenTimer(!openTimer)}
                >
                  {selectedTime?.startHour
                    ? `${selectedTime?.startHour} : ${selectedTime?.startMinute} - ${selectedTime?.endHour} : ${selectedTime?.endHour}`
                    : editableTime?.durationHour
                    ? `${editableTime?.startMinues} : ${editableTime?.intervals}`
                    : "Empty"}
                </button>

                <SelectTimer
                  setStartTime={setStartTime}
                  setEndTime={setEndTime}
                  openTimer={openTimer}
                  setOpenTimer={setOpenTimer}
                  setTimeNow={setTimeNow}
                  editableTime={editableTime}
                  setEditableTime={setEditableTime}
                  setTimerType={setTimerType}
                  task={task}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 w-[25%]">
                <HiOutlineFolder className="text-xl text-success" />
                <span className="text-heading font-semibold">Category</span>
              </div>
              <div className="w-[75%] relative">
                <button
                  className="text-[#999999] text-base font-medium py-2 transition-all hover:bg-light-secondary px-3 rounded w-full text-left"
                  onClick={() => setOpenCategory(!openCategory)}
                >
                  {category?.title ? category.title : "Empty"}
                </button>

                <Categories
                  setCategory={setCategory}
                  setOpenCategory={setOpenCategory}
                  openCategory={openCategory}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 w-[25%]">
                <AiOutlineCalendar className="text-xl text-secondary" />
                <span className="text-heading font-semibold">Created On</span>
              </div>
              <div className="w-[75%]">
                {/* <button className="text-[#999999] text-base font-medium py-2 transition-all hover:bg-light-secondary px-3 rounded w-full text-left">
                  Empty
                </button> */}
                <input
                  className="text-[#999999] text-base font-medium py-2 transition-all hover:bg-light-secondary px-3 rounded w-full text-left outline-none"
                  type="date"
                  name=""
                  id=""
                  value={createdOn}
                  onChange={(e) => setCreatedOn(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 w-[25%]">
                <FiTag className="text-xl text-warning" />
                <span className="text-heading font-semibold">Tags</span>
              </div>
              <div className="w-[75%]">
                {!openTags ? (
                  <button
                    className="text-[#999999] text-base font-medium py-2 transition-all hover:bg-light-secondary px-3 rounded w-full text-left border border-transparent"
                    onClick={() => setOpenTags(true)}
                  >
                    Empty
                  </button>
                ) : (
                  <input
                    className="text-[#999999] text-base font-medium py-2 transition-all px-3 rounded w-full text-left outline-none border border-light-secondary bg-gray-100"
                    placeholder="tag1, tag2"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>

          <textarea
            placeholder="Description"
            className="text-[#AFAFAF] placeholder:text-[#AFAFAF] text-2xl w-full block outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default EditTask;
