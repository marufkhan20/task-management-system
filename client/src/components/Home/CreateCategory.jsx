/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiCheckMark } from "react-icons/gi";
import { useCreateCategoryMutation } from "../../features/category/categoryApi";
import Button from "../ui/Button";

const CreateCategory = ({
  createCategory,
  setCreateCategory,
  setCategories,
  categories,
}) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [errors, setErrors] = useState({});

  // create new category
  const [createNewCategory, { data: category, isError, error, isLoading }] =
    useCreateCategoryMutation();

  useEffect(() => {
    if (!isLoading && isError) {
      setErrors(error);
    }

    if (!isLoading && category?._id) {
      toast.success("Category created successfully");
      setCategories([...categories, category]);
      setCreateCategory(false);
      setColor("");
      setTitle("");
    }
  }, [category, error, isError, isLoading, setCreateCategory]);

  // submitHandler
  const submitHandler = () => {
    // validation
    const validationErrors = {};

    if (!title) {
      validationErrors.title = "Category Name is required!!";
    }

    if (!color) {
      validationErrors.color = "Color is required!!";
    }

    if (Object.keys(validationErrors)?.length > 0) {
      return setErrors(validationErrors);
    }

    createNewCategory({
      title,
      color,
    });
  };
  return (
    <>
      <div
        className={`transition-all duration-300 ${
          createCategory ? "visible opacity-100" : "invisible opacity-0"
        } fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-[#1D1D1D4D]/40`}
        onClick={() => setCreateCategory(false)}
      ></div>
      <div
        className={`transition-all duration-300 ${
          createCategory ? "visible opacity-100" : "invisible opacity-0"
        } fixed md:absolute top-[50%] md:top-0 translate-x-[50%] md:translate-x-0 translate-y-[-50%] md:translate-y-0 right-[50%] md:-right-[122%] w-[300px] bg-white box-shadow rounded-lg border border-light-secondary`}
      >
        <h3 className="p-3 border-b border-light-secondary">
          Create new Category
        </h3>
        <div className="py-4 px-3">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              id="name"
              className="w-full block px-5 py-[14px] rounded-lg border border-light-secondary mt-2 text-[#A0AEC0] placeholder:text-[#A0AEC0] outline-none"
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors?.title && (
              <p className="mt-1 text-red-500">{errors?.title}</p>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-medium">Color</h3>
            <div className="mt-2 grid grid-cols-6 items-center gap-4 w-[80%]">
              <div
                className="w-5 h-5 rounded-full bg-heading cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#101010")}
              >
                {color === "#101010" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-secondary cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#1796E3")}
              >
                {color === "#1796E3" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-success cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#519330")}
              >
                {color === "#519330" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-[#366AEF] cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#366AEF")}
              >
                {color === "#366AEF" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-[#9747FF] cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#9747FF")}
              >
                {color === "#9747FF" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-[#B2E461] cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#B2E461")}
              >
                {color === "#B2E461" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-[#5F319A] cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#5F319A")}
              >
                {color === "#5F319A" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-[#27AAC7] cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#27AAC7")}
              >
                {color === "#27AAC7" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-[#F59A31] cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#F59A31")}
              >
                {color === "#F59A31" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-[#AB5FB1] cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#AB5FB1")}
              >
                {color === "#AB5FB1" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-[#E461C7] cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#E461C7")}
              >
                {color === "#E461C7" && <GiCheckMark className="text-white" />}
              </div>
              <div
                className="w-5 h-5 rounded-full bg-[#FFCC02] cursor-pointer flex items-center justify-center"
                onClick={() => setColor("#FFCC02")}
              >
                {color === "#FFCC02" && <GiCheckMark className="text-white" />}
              </div>
            </div>
          </div>

          {errors?.color && (
            <p className="mt-1 text-red-500">{errors?.color}</p>
          )}

          <div className="mt-6 w-[50%] ml-auto">
            <Button
              className="flex items-center gap-3 justify-center"
              onClick={submitHandler}
            >
              <span className="text-lg">+</span> Create
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
