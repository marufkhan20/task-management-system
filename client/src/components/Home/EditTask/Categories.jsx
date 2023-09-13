import React, { useEffect, useState } from "react";
import { useGetCategoriesByUserQuery } from "../../../features/category/categoryApi";

const Categories = ({ openCategory, setOpenCategory, setCategory }) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  // get all categories
  const { data } = useGetCategoriesByUserQuery();

  useEffect(() => {
    if (data?.length > 0) {
      setCategories(data);
    }
  }, [data]);
  return (
    <div
      className={`transition-all duration-500 ${
        openCategory ? "visible opacity-100" : "invisible opacity-0"
      } absolute top-10 left-2 w-[300px] bg-white  box-shadow rounded-lg z-50 py-[10px] px-3`}
    >
      <input
        type="text"
        className="w-full border border-light-secondary outline-none rounded px-2 py-3 text-[#7D8588] placeholder:text-[#7D8588]"
        placeholder="Find category..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-5">
        <h3 className="text-base mb-2">Categories</h3>

        <ul>
          {categories
            ?.filter((item) =>
              search
                ? item?.title
                    ?.toLocaleLowerCase()
                    ?.includes(search?.toLocaleLowerCase())
                : item
            )
            .map((category) => (
              <li
                className={`text-[${category?.color}] flex items-center gap-2 font-medium p-2 transition-all hover:bg-light-secondary cursor-pointer rounded`}
                key={category?._id}
                onClick={() => {
                  setCategory({ title: category?.title, _id: category?._id });
                  setOpenCategory(false);
                }}
              >
                <div className="w-1 h-1 bg-secondary rounded-full"></div>
                {category?.title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
