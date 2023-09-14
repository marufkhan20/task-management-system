import React, { useEffect, useState } from "react";
import { useGetTasksByCategoryQuery } from "../../features/task/taskApi";

const Header = ({ category }) => {
  const [currentDate, setCurrentDate] = useState();
  const [previousCategory, setPreviousCategory] = useState("");

  // set remaining time
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

  // set current date
  useEffect(() => {
    const nowDate = new Date();

    // find day name
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let currentDayName = daysOfWeek[nowDate.getDay()];
    currentDayName = currentDayName?.slice(0, 3);

    // find month name
    let monthName = nowDate.toLocaleString("default", { month: "long" });
    monthName = monthName?.slice(0, 3);

    setCurrentDate(
      `${currentDayName} ${monthName} ${nowDate?.getDate()} ${nowDate?.getFullYear()}`
    );
  }, []);

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

  // calculate remaining task time
  useEffect(() => {
    const completedTasks = allTasks?.filter(
      (item) => item?.status === "completed"
    );

    let totalTimeHours = 0;
    let totalTimeMinutes = 0;

    if (completedTasks?.length > 0) {
      // eslint-disable-next-line array-callback-return
      completedTasks?.map((task) => {
        // Assuming you have start and end times in ISO 8601 format
        const startTimeStr = task?.startTime;
        const endTimeStr = task?.endTime;

        // Convert the time strings to Date objects
        const startTime = new Date(startTimeStr);
        const endTime = new Date(endTimeStr);

        // Calculate the time difference in milliseconds
        const timeDifference = endTime - startTime;

        // Convert the time difference to hours, minutes, and seconds
        const hoursNow = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
        const minutesNow = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds

        totalTimeHours += Number(hoursNow);
        totalTimeMinutes += Number(minutesNow);
      });
    }

    // convert minute to hours
    const remainingMinutes = totalTimeMinutes % 60;
    const totalMinutesForHours = (totalTimeMinutes - remainingMinutes) / 60;

    const totalHours = totalTimeHours + totalMinutesForHours;

    setHours(totalHours);
    setMinutes(remainingMinutes);
  }, [allTasks]);
  return (
    <header className="py-8 border-b border-light-secondary flex items-center justify-between gap-5">
      <h3>{currentDate}</h3>
      <div className="flex items-center gap-[6px]">
        <span>Total time today:</span>
        <h3 className="text-base">
          {category?._id ? `${hours}h ${minutes}m` : "N/A"}
        </h3>
      </div>
    </header>
  );
};

export default Header;
