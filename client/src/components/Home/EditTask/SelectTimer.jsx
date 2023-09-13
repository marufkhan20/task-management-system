/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const SelectTimer = ({
  setTimeNow,
  openTimer,
  setStartTime,
  setEndTime,
  editableTime,
  setEditableTime,
  setTimerType,
  task,
}) => {
  const [selectOpt, setSelectOpt] = useState("countdown");

  // Set custom time state
  const [startHour, setStartHour] = useState();
  const [startMinute, setStartMinute] = useState();
  const [endHour, setEndHour] = useState();
  const [endMinute, setEndMinute] = useState();

  // Convert Input to Actual Time
  useEffect(() => {
    if (startHour && startMinute) {
      const startTime = new Date();
      startTime.setHours(startHour, startMinute, 0, 0);
      setStartTime(startTime);
    }

    if (endHour && endMinute) {
      const endTime = new Date();
      endTime.setHours(endHour, endMinute, 0, 0);
      setEndTime(endTime);
    }

    // set editable time
    setEditableTime({
      startHour,
      startMinute,
      endHour,
      endMinute,
    });
  }, [
    startHour,
    startMinute,
    endHour,
    endMinute,
    setStartTime,
    setEndTime,
    setEditableTime,
  ]);

  // set pomodoro timer state and functionlities
  const [durationHour, setDurationHour] = useState();
  const [durationMinute, setDurationMinute] = useState();
  const [intervals, setIntervals] = useState();
  const [shortBreakMinutes, setShortBreakMinutes] = useState();
  const [shortBreakSeconds, setShortBreakSeconds] = useState();
  const [longBreakMinutes, setLongBreakMinutes] = useState();
  const [longBreakSeconds, setLongBreakSeconds] = useState();
  const [breakError, setBreakError] = useState();

  useEffect(() => {
    if (
      (shortBreakMinutes || shortBreakSeconds) &&
      (longBreakMinutes || longBreakSeconds)
    ) {
      setBreakError("Please select one break.");
    } else {
      setBreakError("");
    }
  }, [
    shortBreakMinutes,
    shortBreakSeconds,
    longBreakMinutes,
    longBreakSeconds,
    breakError,
  ]);

  useEffect(() => {
    if (task?.timerType === "countdonw" && editableTime) {
      setStartHour(editableTime?.startHour);
      setStartMinute(editableTime?.startMinute);
      setEndHour(editableTime?.endHour);
      setEndMinute(editableTime?.endMinute);
    }

    if (task?.timerType === "pomodoro" && editableTime) {
      setDurationHour(editableTime?.durationHour);
      setDurationMinute(editableTime?.durationMinute);
      setIntervals(editableTime?.intervals);
      setShortBreakMinutes(editableTime?.shortBreakMinutes);
      setLongBreakMinutes(editableTime?.longBreakMinutes);
      setShortBreakSeconds(editableTime?.shortBreakSeconds);
      setLongBreakSeconds(editableTime?.longBreakSeconds);
    }
  }, []);

  // Convert Input to Actual Time
  useEffect(() => {
    if (durationHour && durationMinute) {
      const startTime = new Date();
      startTime.setHours(startTime?.getHours(), startTime?.getMinutes(), 0, 0);
      setStartTime(startTime);

      const endTime = new Date();
      endTime.setHours(
        startTime.getHours() + Number(durationHour),
        startTime.getMinutes() + Number(durationMinute),
        0,
        0
      );
      setEndTime(endTime);
    }

    // set editable time
    setEditableTime({
      durationHour,
      durationMinute,
      shortBreakMinutes,
      shortBreakSeconds,
      longBreakMinutes,
      longBreakSeconds,
      intervals,
    });
  }, [
    startHour,
    startMinute,
    endHour,
    endMinute,
    setStartTime,
    setEndTime,
    setEditableTime,
    durationHour,
    durationMinute,
    shortBreakMinutes,
    shortBreakSeconds,
    longBreakMinutes,
    longBreakSeconds,
    intervals,
  ]);
  return (
    <div
      className={`transition-all duration-500 ${
        openTimer ? "visible opacity-100" : "invisible opacity-0"
      } absolute top-10 left-2 w-[430px] bg-white  box-shadow rounded-lg z-50`}
    >
      {/* header */}
      <div>
        <h3 className="py-3 px-5 border-b border-light-secondary">
          Select a timer
        </h3>
      </div>

      {/* tab button */}
      <div className="mx-5 my-4 p-[6px] bg-[#F8F8F8] w-fit flex items-center gap-[6px] rounded">
        <button
          className={`${
            selectOpt === "countdown" && "bg-secondary text-white"
          } text-xs font-semibold px-[9px] py-[7px] rounded-sm`}
          onClick={() => setSelectOpt("countdown")}
        >
          Countdown Timer
        </button>
        <button
          className={`${
            selectOpt === "pomodoro" && "bg-secondary text-white"
          } text-xs font-semibold px-[9px] py-[7px] rounded-sm`}
          onClick={() => setSelectOpt("pomodoro")}
        >
          Pomodoro Timer
        </button>
      </div>

      {/* countdown timer */}
      {selectOpt === "countdown" && (
        <div>
          <div className="px-5">
            <div className="flex items-center justify-between gap-4 w-full">
              <div>
                <h3 className="mb-5">Set custom time</h3>
                <div className="flex items-center gap-3">
                  <div className="w-fit pb-2 pt-[14px] border border-secondary rounded relative">
                    <div className="block absolute -top-[12px] w-full text-center">
                      <label htmlFor="" className="bg-white px-2">
                        Start time
                      </label>
                    </div>
                    <div className="flex items-center w-auto px-[10px] justify-center">
                      <input
                        type="text"
                        placeholder="15"
                        className="outline-none w-8 text-center"
                        value={startHour}
                        onChange={(e) => setStartHour(e.target.value)}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        placeholder="10"
                        className="outline-none w-8 text-center"
                        value={startMinute}
                        onChange={(e) => setStartMinute(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-fit pb-2 pt-[14px] border border-alert rounded relative">
                    <div className="block absolute -top-[12px] w-full text-center">
                      <label htmlFor="" className="bg-white px-2">
                        End time
                      </label>
                    </div>
                    <div className="flex items-center w-auto px-[10px] justify-center">
                      <input
                        type="text"
                        placeholder="00"
                        className="outline-none w-8 text-center"
                        value={endHour}
                        onChange={(e) => setEndHour(e.target.value)}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        placeholder="00"
                        className="outline-none w-8 text-center"
                        value={endMinute}
                        onChange={(e) => setEndMinute(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span className="mt-8">Or</span>
              <div>
                <h3 className="mb-5">Set a countdown</h3>
                <div className="flex items-center gap-3">
                  <div className="w-fit pb-2 pt-[14px] border border-warning rounded relative">
                    <div className="flex items-center w-auto px-[10px] justify-center">
                      <input
                        type="text"
                        placeholder="15"
                        className="outline-none w-8 text-center"
                      />
                      <span>:</span>
                      <input
                        type="text"
                        placeholder="10"
                        className="outline-none w-8 text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-6 px-5 text-center">
            <span className="font-medium px-2 bg-white">And/Or</span>
            <hr className="-mt-[10px]" />
          </div>
          <div className="px-5 pb-5">
            <h3>Set a stopwatch (Counting Up)</h3>
            <div className="mt-5 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-fit py-3 border border-[#4A3093] rounded relative">
                  <div className="flex items-center w-auto px-[10px] justify-center">
                    <input
                      type="text"
                      placeholder="00"
                      className="outline-none w-8 text-center"
                    />
                    <span>:</span>
                    <input
                      type="text"
                      placeholder="00"
                      className="outline-none w-8 text-center"
                    />
                    <span>:</span>
                    <input
                      type="text"
                      placeholder="00"
                      className="outline-none w-8 text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="stopwatch" />
                <label
                  htmlFor="stopwatch"
                  className="text-heading text-xs font-medium cursor-pointer"
                >
                  Set a stopwatch
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* pomodoro timer */}
      {selectOpt === "pomodoro" && (
        <div>
          <div className="px-5">
            <h3 className="mb-5">Set Work Interval</h3>
            <div className="flex items-center flex-wrap justify-between gap-4 w-full">
              <div>
                <div className="flex items-center flex-wrap gap-3">
                  <div className="w-fit pb-2 pt-[14px] border border-secondary rounded relative">
                    <div className="block absolute -top-[12px] w-full text-center">
                      <label htmlFor="" className="bg-white px-2">
                        Duration
                      </label>
                    </div>
                    <div className="flex items-center w-auto px-[10px] justify-center">
                      <input
                        type="text"
                        placeholder="15"
                        className="outline-none w-8 text-center"
                        value={durationHour}
                        onChange={(e) => setDurationHour(e.target.value)}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        placeholder="10"
                        className="outline-none w-8 text-center"
                        value={durationMinute}
                        onChange={(e) => setDurationMinute(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-fit pb-2 pt-[14px] border border-secondary rounded relative">
                    <div className="block absolute -top-[12px] w-full text-center">
                      <label htmlFor="" className="bg-white px-2">
                        Number of Intervals
                      </label>
                    </div>
                    <div className="flex items-center w-auto px-[70px] justify-center">
                      <input
                        type="text"
                        placeholder="3"
                        className="outline-none w-8 text-center"
                        value={intervals}
                        onChange={(e) => setIntervals(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pb-5 mt-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3>Short Break (in minutes)</h3>
              <div className="mt-5 flex items-center flex-wrap gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-fit py-3 border border-[#4A3093] rounded relative">
                    <div className="flex items-center w-auto px-[10px] justify-center">
                      <input
                        type="text"
                        placeholder="05"
                        className="outline-none w-8 text-center"
                        value={shortBreakMinutes}
                        onChange={(e) => setShortBreakMinutes(e.target.value)}
                      />
                      <span className="font-medium">:</span>
                      <input
                        type="text"
                        placeholder="00"
                        className="outline-none w-8 text-center"
                        value={shortBreakSeconds}
                        onChange={(e) => setShortBreakSeconds(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span>Or</span>

            <div>
              <h3>Long Break (in minutes)</h3>
              <div className="mt-5 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-fit py-3 border border-warning rounded relative">
                    <div className="flex items-center w-auto px-[10px] justify-center">
                      <input
                        type="text"
                        placeholder="15"
                        className="outline-none w-8 text-center"
                        value={longBreakMinutes}
                        onChange={(e) => setLongBreakMinutes(e.target.value)}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        placeholder="00"
                        className="outline-none w-8 text-center"
                        value={longBreakSeconds}
                        onChange={(e) => setLongBreakSeconds(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {breakError && (
            <p className="mb-2 text-center text-red-500">{breakError}</p>
          )}
        </div>
      )}

      {/* footer */}
      <div className="px-5 py-4 flex items-center justify-between  border-t border-light-secondary">
        <button className="text-xs font-semibold py-[10px] px-2 rounded-lg border border-secondary text-heading transition-all hover:bg-secondary hover:border-secondary hover:text-white">
          Schedule for later
        </button>
        <button
          className="font-semibold p-[10px] border border-secondary rounded-lg bg-secondary text-white transition-all hover:text-heading hover:bg-transparent"
          onClick={() =>
            setTimeNow({
              startHour,
              startMinute,
              endHour,
              endMinute,
            })
          }
        >
          Set Now
        </button>
      </div>
    </div>
  );
};

export default SelectTimer;
