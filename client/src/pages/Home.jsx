import React, { useEffect, useState } from "react";
import Tasks from "../components/Home/Tasks";
import MainLayout from "../components/layout/MainLayout";

const Home = () => {
  const [category, setCategory] = useState({
    _id: "all-tasks",
    title: "All Tasks",
  });

  useEffect(() => {
    console.log(category);
  }, [category]);
  return (
    <MainLayout setCategory={setCategory} category={category}>
      {category?._id ? (
        <div>
          <Tasks category={category} />
        </div>
      ) : (
        <div className="w-full content-height flex items-center justify-center flex-col text-center gap-3">
          <img
            className="w-20 h-20"
            src="/img/icons/category.svg"
            alt="category"
          />
          <h2 className="text-2xl">Select a category to view</h2>
          <p className="font-medium">
            Choose a category from the list on the left to view its contents, or{" "}
            <br />
            create a new note to add to your collection.
          </p>
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
