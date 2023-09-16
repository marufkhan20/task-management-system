import React, { useEffect, useState } from "react";
import { useGetTasksByCategoryQuery } from "../../features/task/taskApi";
import AlertLayout from "../layout/AlertLayout";
import CurrentTask from "./CurrentTask";
import TaskHeader from "./TaskHeader";
import TasksContainer from "./TasksContainer";

const Tasks = ({ category }) => {
  const [currentActiveTask, setCurrentActiveTask] = useState({});
  const [currentQueueTask, setCurrentQueueTask] = useState({});
  // switch task
  const [openSwitchAlert, setOpenSwitchAlert] = useState(false);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState("ongoing");

  const [previousCategory, setPreviousCategory] = useState();

  // current active task handler
  const currentActiveTaskHandler = (id) => {
    if (currentActiveTask?._id) {
      setOpenSwitchAlert(true);
      setCurrentQueueTask(id);
    } else {
      setCurrentActiveTask(id);
    }
  };

  // switch task close handler
  const switchTaskCloseHandler = () => {
    setOpenSwitchAlert(false);
  };

  // switch task submit handler
  const switchTaskSubmitHandler = () => {
    setCurrentActiveTask(currentQueueTask);
    switchTaskCloseHandler();
  };

  // get all tasks by category
  const [allTasks, setAllTasks] = useState([]);
  const [getTasks, setGetTasks] = useState(false);

  const { data, refetch } = useGetTasksByCategoryQuery(category?._id, {
    skip: !getTasks,
  });

  useEffect(() => {
    if (category?._id) {
      setGetTasks(true);
      setPreviousCategory(category?._id);
    }

    if (previousCategory && previousCategory !== category?._id) {
      refetch();
    }
  }, [category, previousCategory, refetch]);

  useEffect(() => {
    setAllTasks([]);
    if (data?.length > 0) {
      setAllTasks(data);
    }
  }, [data]);

  // set tasks status
  const ongoingTasks = allTasks?.filter((item) => item?.status === "ongoing");
  const upcomingTasks = allTasks?.filter((item) => item?.status === "upcoming");
  const completedTasks = allTasks?.filter(
    (item) => item?.status === "completed"
  );
  const futureTasks = allTasks?.filter((item) => item?.status === "future");
  return (
    <div>
      <TaskHeader category={category} />

      {/* current active task */}
      {currentActiveTask?._id && (
        <CurrentTask
          setCurrentActiveTask={setCurrentActiveTask}
          currentActiveTask={currentActiveTask}
          setAllTasks={setAllTasks}
          allTasks={allTasks}
        />
      )}

      {/* for mobile device */}
      <div className="sm:hidden mt-6">
        <div className="flex items-center justify-between border-b border-light-secondary">
          <button
            className={`transition-all duration-300 w-full pb-[10px] border-b-2 ${
              selectedTaskStatus === "ongoing"
                ? "font-bold text-[#4A3093] border-[#4A3093]"
                : "font-medium text-[#373D3F] border-transparent"
            }`}
            onClick={() => setSelectedTaskStatus("ongoing")}
          >
            Ongoing ({ongoingTasks?.length})
          </button>
          <button
            className={`transition-all duration-300 w-full pb-[10px] border-b-2 ${
              selectedTaskStatus === "upcoming"
                ? "font-bold text-[#4A3093] border-[#4A3093]"
                : "font-medium text-[#373D3F] border-transparent"
            }`}
            onClick={() => setSelectedTaskStatus("upcoming")}
          >
            Upcoming ({upcomingTasks?.length})
          </button>
          <button
            className={`transition-all duration-300 w-full pb-[10px] border-b-2 ${
              selectedTaskStatus === "future"
                ? "font-bold text-[#4A3093] border-[#4A3093]"
                : "font-medium text-[#373D3F] border-transparent"
            }`}
            onClick={() => setSelectedTaskStatus("future")}
          >
            Future ({futureTasks?.length})
          </button>
          <button
            className={`transition-all duration-300 w-full pb-[10px] border-b-2 ${
              selectedTaskStatus === "completed"
                ? "font-bold text-[#4A3093] border-[#4A3093]"
                : "font-medium text-[#373D3F] border-transparent"
            }`}
            onClick={() => setSelectedTaskStatus("completed")}
          >
            Completed ({completedTasks?.length})
          </button>
        </div>

        <div>
          {selectedTaskStatus === "ongoing" && ongoingTasks?.length > 0 && (
            <TasksContainer
              status="ongoing"
              setCurrentActiveTask={currentActiveTaskHandler}
              allTasks={ongoingTasks}
              setAllTasks={setAllTasks}
              currentActiveTask={currentActiveTask}
              allTasksWithStatus={allTasks}
            />
          )}

          {selectedTaskStatus === "upcoming" && upcomingTasks?.length > 0 && (
            <TasksContainer
              status="upcoming"
              setCurrentActiveTask={currentActiveTaskHandler}
              allTasks={upcomingTasks}
              setAllTasks={setAllTasks}
              currentActiveTask={currentActiveTask}
              allTasksWithStatus={allTasks}
            />
          )}

          {selectedTaskStatus === "future" && futureTasks?.length > 0 && (
            <TasksContainer
              status="future"
              setCurrentActiveTask={currentActiveTaskHandler}
              allTasks={futureTasks}
              setAllTasks={setAllTasks}
              currentActiveTask={currentActiveTask}
              allTasksWithStatus={allTasks}
            />
          )}

          {selectedTaskStatus === "completed" && completedTasks?.length > 0 && (
            <TasksContainer
              status="completed"
              setCurrentActiveTask={currentActiveTaskHandler}
              allTasks={completedTasks}
              setAllTasks={setAllTasks}
              currentActiveTask={currentActiveTask}
              allTasksWithStatus={allTasks}
            />
          )}
        </div>
      </div>

      {/* all tasks */}
      <div className="mt-5 hidden sm:flex flex-col gap-8 pb-10">
        {ongoingTasks?.length > 0 && (
          <TasksContainer
            status="ongoing"
            setCurrentActiveTask={currentActiveTaskHandler}
            allTasks={ongoingTasks}
            setAllTasks={setAllTasks}
            currentActiveTask={currentActiveTask}
            allTasksWithStatus={allTasks}
          />
        )}
        {upcomingTasks?.length > 0 && (
          <TasksContainer
            status="upcoming"
            setCurrentActiveTask={currentActiveTaskHandler}
            allTasks={upcomingTasks}
            setAllTasks={setAllTasks}
            currentActiveTask={currentActiveTask}
            allTasksWithStatus={allTasks}
          />
        )}
        {futureTasks?.length > 0 && (
          <TasksContainer
            status="future"
            setCurrentActiveTask={currentActiveTaskHandler}
            allTasks={futureTasks}
            setAllTasks={setAllTasks}
            currentActiveTask={currentActiveTask}
            allTasksWithStatus={allTasks}
          />
        )}
        {completedTasks?.length > 0 && (
          <TasksContainer
            status="completed"
            setCurrentActiveTask={currentActiveTaskHandler}
            allTasks={completedTasks}
            setAllTasks={setAllTasks}
            currentActiveTask={currentActiveTask}
            allTasksWithStatus={allTasks}
          />
        )}
      </div>

      {/* task switch alert */}
      <AlertLayout
        title="Are you sure you want to switch task?"
        description="You current task would be swapped with this task."
        icon="switch"
        closeHandler={switchTaskCloseHandler}
        submitHandler={switchTaskSubmitHandler}
        open={openSwitchAlert}
      />
    </div>
  );
};

export default Tasks;
