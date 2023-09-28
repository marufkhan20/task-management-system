import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import TaskItem from "./TaskItem";

const TasksContainer = ({
  status,
  setCurrentActiveTask,
  currentActiveTask,
  allTasks,
  setAllTasks,
  allTasksWithStatus,
  setTaskUpdate,
}) => {
  const [showAllTask, setShowAllTasks] = useState(false);
  return (
    <div>
      <div className="hidden sm:block">
        {/* header */}
        <div className="flex items-center justify-between gap-5 py-5 border-b border-light-secondary">
          <div className="flex items-center gap-2">
            {status === "ongoing" && (
              <h3 className="text-[#4A3093] font-semibold text-lg">
                Ongoing tasks ({allTasks?.length})
              </h3>
            )}

            {status === "upcoming" && (
              <h3 className="text-warning font-semibold text-lg">
                Upcoming tasks ({allTasks?.length})
              </h3>
            )}

            {status === "future" && (
              <h3 className="text-purple-500 font-semibold text-lg">
                Future tasks ({allTasks?.length})
              </h3>
            )}

            {status === "completed" && (
              <h3 className="text-success font-semibold text-lg">
                Completed tasks ({allTasks?.length})
              </h3>
            )}
            <BsThreeDots className="text-lg cursor-pointer" />
          </div>
          {/* {status === "ongoing" && <h4>4h 52m</h4>} */}
        </div>

        {/* all tasks */}
        <div className="my-[18px] table-container">
          <table class="min-w-full table">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left leading-4 text-heading font-semibold tracking-wider">
                  <input
                    type="checkbox"
                    checked={status === "completed"}
                    name=""
                    id=""
                  />
                </th>
                <th class="px-6 py-3 text-left leading-4 text-heading font-semibold tracking-wider">
                  Task Name
                </th>
                <th class="px-6 py-3 text-left leading-4 text-heading font-semibold tracking-wider">
                  Description
                </th>
                <th class="px-6 py-3 text-left leading-4 text-heading font-semibold tracking-wider">
                  Created On
                </th>
                <th class="px-6 py-3 text-left leading-4 text-heading font-semibold tracking-wider">
                  Tags
                </th>
                <th class="px-6 py-3 text-left leading-4 text-heading font-semibold tracking-wider">
                  Timer
                </th>
                <th class="px-6 py-3 text-left leading-4 text-heading font-semibold tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {showAllTask
                ? allTasks
                    ?.filter((task) => currentActiveTask?._id !== task?._id)
                    .map((item) => (
                      <TaskItem
                        key={item?._id}
                        setCurrentActiveTask={setCurrentActiveTask}
                        status={status}
                        task={item}
                        setAllTasks={setAllTasks}
                        allTasks={allTasks}
                        allTasksWithStatus={allTasksWithStatus}
                        setTaskUpdate={setTaskUpdate}
                      />
                    ))
                : allTasks
                    ?.slice(0, 4)
                    ?.filter((task) => currentActiveTask?._id !== task?._id)
                    .map((item) => (
                      <TaskItem
                        key={item?._id}
                        setCurrentActiveTask={setCurrentActiveTask}
                        status={status}
                        task={item}
                        setAllTasks={setAllTasks}
                        allTasks={allTasks}
                        allTasksWithStatus={allTasksWithStatus}
                        setTaskUpdate={setTaskUpdate}
                      />
                    ))}
            </tbody>
          </table>
        </div>

        {!showAllTask && allTasks?.length > 4 && (
          <div className="flex items-center justify-center gap-2">
            <span
              className="text-[#777777] font-semibold cursor-pointer"
              onClick={() => setShowAllTasks(true)}
            >
              Show More
            </span>
            <BiChevronDown className="cursor-pointer" />
          </div>
        )}

        {showAllTask && (
          <div className="flex items-center justify-center gap-2">
            <span
              className="text-[#777777] font-semibold cursor-pointer"
              onClick={() => setShowAllTasks(false)}
            >
              Show Less
            </span>
            <BiChevronUp className="cursor-pointer" />
          </div>
        )}
      </div>

      {/* for mobile device */}
      <div className="flex sm:hidden flex-col gap-3">
        {allTasks
          ?.filter((task) => currentActiveTask?._id !== task?._id)
          .map((item) => (
            <TaskItem
              key={item?._id}
              setCurrentActiveTask={setCurrentActiveTask}
              status={status}
              task={item}
              setAllTasks={setAllTasks}
              allTasks={allTasks}
              allTasksWithStatus={allTasksWithStatus}
            />
          ))}
      </div>
    </div>
  );
};

export default TasksContainer;
