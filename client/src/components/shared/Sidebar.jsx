import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { BsChevronDown, BsFolder2, BsThreeDotsVertical } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { HiOutlineFolder } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";
import { useGetCategoriesByUserQuery } from "../../features/category/categoryApi";
import CreateCategory from "../Home/CreateCategory";
import CreateTask from "../Home/CreateTask";
import Button from "../ui/Button";

const Sidebar = ({ category, setCategory, setShowSidebar }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [createCategory, setCreateCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [logoutOpt, setLogoutOpt] = useState(false);

  const [showCrateOpt, setShowCreateOpt] = useState(false);

  const dispatch = useDispatch();

  // get all categories
  const { data } = useGetCategoriesByUserQuery();

  useEffect(() => {
    if (data?.length > 0) {
      setCategories(data);
    }
  }, [data]);

  // logout handler
  const logoutHandler = () => {
    dispatch(userLoggedOut());
    toast.success("Logged out successfully");
    setLogoutOpt(false);
  };
  return (
    <>
      <div className="bg-light-bg min-h-full py-8 flex flex-col gap-6 z-50">
        <div className="relative">
          <div
            className={`hidden md:flex items-center gap-2 font-semibold text-heading px-[18px] cursor-pointer transition-all ${
              logoutOpt ? "bg-white" : "hover:bg-white"
            } py-2`}
            onClick={() => setLogoutOpt(!logoutOpt)}
          >
            <img src="/img/avatar.png" alt="user" />
            <span>John Doe</span>
            <BsChevronDown />
          </div>

          <div
            className={`absolute top-14 transition-all duration-300 ${
              logoutOpt ? "left-2 right-2" : "-left-[150%]"
            }  bg-white box-shadow p-2 rounded-lg`}
          >
            <button
              className="p-[10px] flex items-center gap-2 text-alert justify-center w-full border border-alert rounded-lg transition-all hover:bg-alert hover:text-white font-semibold"
              onClick={logoutHandler}
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="hidden md:block px-[18px]">
          <Button onClick={() => setCreateTask(true)}>
            <div className="flex items-center justify-center gap-2">
              <FaPlus className="text-white" />
              <span>New Task</span>
            </div>
          </Button>
        </div>

        <div className="hidden md:flex items-center gap-2 py-2 px-4 bg-white rounded-lg border border-light-secondary mx-[18px]">
          <img src="/img/icons/search.png" alt="search" className="w-5" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent"
          />
        </div>

        {/* for mobile device */}
        <div className="flex md:hidden items-center gap-10 mx-5 border-b border-light-secondary pb-4">
          <GrClose
            className="cursor-pointer text-xl"
            onClick={() => setShowSidebar(false)}
          />
          <img src="/img/logo-black.png" alt="logo" />
        </div>

        <div>
          <li
            className={`flex items-center gap-4 py-[10px] px-[18px] transition-all hover:bg-white cursor-pointer ${
              category?._id === "all-tasks" && "bg-white"
            }`}
            onClick={() => {
              setCategory({
                _id: "all-tasks",
                title: "All Tasks",
              });
              setShowSidebar(false);
            }}
          >
            <img className="w-5 h-5" src="/img/icons/Calender.svg" alt="icon" />
            <span className="text-heading font-semibold">All Tasks</span>
          </li>
          <li
            className={`flex items-center gap-4 py-[10px] px-[18px] transition-all hover:bg-white cursor-pointer ${
              category?._id === "inbox" && "bg-white"
            }`}
            onClick={() => {
              setCategory({
                _id: "inbox",
                title: "Inbox",
              });
              setShowSidebar(false);
            }}
          >
            <img className="w-5 h-5" src="/img/icons/email.svg" alt="icon" />
            <span className="text-heading font-semibold">Inbox</span>
          </li>
        </div>

        <div className="md:relative">
          <h3 className="flex items-center justify-between mb-2 px-[18px]">
            Categories{" "}
            <img
              src="/img/icons/add-folder.svg"
              alt="icon"
              className="w-5 h-5 cursor-pointer"
              onClick={() => setCreateCategory(true)}
            />
          </h3>

          {/* Create category */}
          <CreateCategory
            setCreateCategory={setCreateCategory}
            createCategory={createCategory}
            setCategories={setCategories}
            categories={categories}
          />

          <div className="flex flex-col gap-[5px]">
            {showAllCategories
              ? categories?.map((item) => (
                  <li
                    key={item?._id}
                    className={`flex items-center gap-4 category font-semibold py-[10px] px-[18px] transition-all hover:bg-white cursor-pointer  justify-between ${
                      category?._id === item?._id && "bg-white"
                    }`}
                    onClick={() => {
                      setCategory(item);
                      setShowSidebar(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <HiOutlineFolder
                        className={`text-lg`}
                        color={item?.color}
                      />
                      <span color={item?.color}>{item?.title}</span>
                    </div>
                    <BsThreeDotsVertical className="icon opacity-0" />
                  </li>
                ))
              : categories.slice(0, 5)?.map((item) => (
                  <li
                    key={item?._id}
                    className={`flex items-center gap-4 font-semibold py-[10px] px-[18px] transition-all hover:bg-white cursor-pointer ${
                      category?._id === item?._id && "bg-white"
                    }`}
                    onClick={() => {
                      setCategory(item);
                      setShowSidebar(false);
                    }}
                  >
                    <HiOutlineFolder
                      className={`text-lg`}
                      color={item?.color}
                    />
                    <span color={item?.color}>{item?.title}</span>
                  </li>
                ))}
          </div>

          {categories?.length > 5 && (
            <button
              className="flex items-center justify-center w-full mt-2 py-2 text-secondary font-semibold gap-[15px] cursor-pointer hover:bg-white transition-all"
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              <span>
                {showAllCategories ? "Hide Categories" : "View all categories"}
              </span>
              <BsChevronDown className={showAllCategories && "rotate-180"} />
            </button>
          )}
        </div>

        <div>
          <h3 className="px-[18px] mb-2">More</h3>
          <li className="flex items-center gap-4 font-semibold text-[#F32626] py-[10px] px-[18px] transition-all hover:bg-white cursor-pointer">
            <img src="/img/icons/trash.svg" alt="icon" />
            <span>Trash</span>
          </li>
        </div>
      </div>

      {/* create new task */}
      <CreateTask createTask={createTask} setCreateTask={setCreateTask} />

      {/* for mobile device */}
      <div className="md:hidden fixed bottom-[50px] right-8 z-30 flex flex-col items-end">
        <div
          className={`transition-all duration-300 ${
            showCrateOpt ? "visible opacity-100" : "invisible opacity-0"
          } bg-white rounded box-shadow mb-2`}
        >
          <li
            className="px-4 py-[10px] flex items-center gap-2 transition-all hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              setCreateCategory(true);
              setShowCreateOpt(false);
            }}
          >
            <BsFolder2 className="text-lg" />
            <span>New Category</span>
          </li>
          <li
            className="px-4 py-[10px] flex items-center gap-2 transition-all hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              setCreateTask(true);
              setShowCreateOpt(false);
            }}
          >
            <CgFileDocument className="text-lg" />
            <span>New Task</span>
          </li>
        </div>

        <div
          className="h-14 w-14 rounded-full bg-secondary text-white text-2xl flex items-center justify-center cursor-pointer"
          onClick={() => setShowCreateOpt(!showCrateOpt)}
        >
          <AiOutlinePlus />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
