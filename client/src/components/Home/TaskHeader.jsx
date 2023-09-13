import React from "react";
import { HiOutlineFolder } from "react-icons/hi2";

const TaskHeader = ({ category }) => {
  return category === "all-tasks" ? (
    <div className="flex items-center gap-2 py-6 border-b border-light-secondary">
      <img className="w-7 h-7" src="/img/icons/Calender.svg" alt="all tasks" />
      <h3 className="text-xl">All Tasks</h3>
    </div>
  ) : category === "inbox" ? (
    <div className="flex items-center gap-2 py-6 border-b border-light-secondary">
      <img className="w-7 h-7" src="/img/icons/email.svg" alt="all tasks" />
      <h3 className="text-xl">Inbox</h3>
    </div>
  ) : (
    <div className="flex items-center gap-2 py-6 border-b border-light-secondary">
      <HiOutlineFolder className={`text-2xl`} color={category?.color} />
      <h3 className={`text-xl text-[${category?.color}]`}>{category?.title}</h3>
    </div>
  );
};

export default TaskHeader;
