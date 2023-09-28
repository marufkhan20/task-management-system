import React, { useEffect, useState } from "react";

const SelectTimer = ({ setTimeNow, openTimer, timer }) => {
  const [selectOpt, setSelectOpt] = useState("countdown");
  const [timerType, setTimerType] = useState("countdownn");

  // custom timer state
  const [startTimeHours, setStartTimeHours] = useState(new Date().getHours());
  const [startTimeMinutes, setStartTimeMinutes] = useState(
    new Date().getMinutes()
  );
  const [endTimeHours, setEndTimeHours] = useState();
  const [endTimeMinutes, setEndTimeMinutes] = useState();
  const [countDownHours, setCountDownHours] = useState();
  const [countDownMinutes, setCountDownMinutes] = useState();
  const [countdownErrors, setCountdownErrors] = useState("");

  // pomodoro timer state
  const [durationHours, setDurationHours] = useState();
  const [durationMinutes, setDurationMinutes] = useState();
  const [intervals, setIntervals] = useState();
  const [shortBreakMinutes, setShortBreakMinutes] = useState();
  const [shortBreakSeconds, setShortBreakSeconds] = useState();
  const [longBreakMinutes, setLongBreakMinutes] = useState();
  const [longBreakSeconds, setLongBreakSeconds] = useState();

  // timer errors
  const [timerErrors, setTimerErrors] = useState("");

  // when timer option state change
  useEffect(() => {
    if (selectOpt === "countdown") {
      setDurationHours();
      setDurationMinutes();
      setIntervals();
      setShortBreakMinutes();
      setShortBreakSeconds();
      setLongBreakMinutes();
      setLongBreakSeconds();
    } else if (selectOpt === "stopwatch") {
      setEndTimeHours();
      setEndTimeMinutes();
      setDurationHours();
      setDurationMinutes();
      setIntervals();
      setShortBreakMinutes();
      setShortBreakSeconds();
      setLongBreakMinutes();
      setLongBreakSeconds();
      setCountDownHours();
      setCountDownMinutes();
    } else if (selectOpt === "pomodoro") {
      setEndTimeHours();
      setEndTimeMinutes();
      setCountDownHours();
      setCountDownMinutes();
    }
  }, [selectOpt]);

  // set timer data for edit
  useEffect(() => {
    if (timer) {
      setSelectOpt(
        timer?.timerType === "countdown" || timer?.timerType === "stopwatch"
          ? "countdown"
          : "pomodoro"
      );
      setTimerType(timer?.timerType);
      setStartTimeHours(timer?.startTimeHours);
      setStartTimeMinutes(timer?.startTimeMinutes);
      setEndTimeHours(timer?.endTimeHours);
      setEndTimeMinutes(timer?.endTimeMinutes);
      setCountDownHours(timer?.countDownHours);
      setCountDownMinutes(timer?.countDownMinutes);
      setDurationHours(timer?.durationHours);
      setDurationMinutes(timer?.durationMinutes);
      setIntervals(timer?.intervals);
      setShortBreakMinutes(timer?.shortBreakMinutes);
      setShortBreakSeconds(timer?.shortBreakSeconds);
      setLongBreakMinutes(timer?.longBreakMinutes);
      setLongBreakSeconds(timer?.longBreakSeconds);
    }
  }, [timer]);

  // set timer type
  useEffect(() => {
    setTimerType(selectOpt);
  }, [selectOpt]);

  // user select only countdown or duration
  useEffect(() => {
    if (
      (endTimeHours || endTimeMinutes) &&
      (countDownHours || countDownMinutes)
    ) {
      setCountdownErrors("Please select custom time or countdown");
    } else {
      setCountdownErrors("");
    }
  }, [countDownHours, countDownMinutes, endTimeHours, endTimeMinutes]);

  // set now handler
  const setNowHandler = () => {
    // check validation
    if (timerType === "countdown" || timerType === "stopwatch") {
      if (
        !endTimeHours &&
        !endTimeMinutes &&
        !countDownHours &&
        !countDownMinutes
      ) {
        setTimerErrors(true);
        return;
      }
    } else if (timerType === "pomodoro") {
      if (!durationHours && !durationMinutes) {
        setTimerErrors(true);
        return;
      }
    }

    if (countdownErrors) {
      return;
    }

    setTimerErrors(false);

    // set timer
    setTimeNow({
      timerType,
      startTimeHours: startTimeHours || 0,
      startTimeMinutes: startTimeMinutes || 0,
      endTimeHours: endTimeHours || 0,
      endTimeMinutes: endTimeMinutes || 0,
      durationHours: durationHours || 0,
      durationMinutes: durationMinutes || 0,
      intervals: Number(intervals) || 0,
      shortBreakMinutes: shortBreakMinutes || 0,
      shortBreakSeconds: shortBreakSeconds || 0,
      longBreakMinutes: longBreakMinutes || 0,
      longBreakSeconds: longBreakSeconds || 0,
      countDownHours: countDownHours || 0,
      countDownMinutes: countDownMinutes || 0,
      scheduleForLater: false,
    });
  };
  return (
    <div
      className={`transition-all duration-500 ${
        openTimer ? "visible opacity-100" : "invisible opacity-0"
      } absolute top-10 left-2 w-full sm:w-[430px] bg-white  box-shadow rounded-lg z-50`}
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
            <div className="flex flex-wrap items-center justify-between gap-4 w-full">
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
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={startTimeHours}
                        onChange={(e) => setStartTimeHours(e.target.value)}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        placeholder="10"
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={startTimeMinutes}
                        onChange={(e) => setStartTimeMinutes(e.target.value)}
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
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={endTimeHours}
                        onChange={(e) => setEndTimeHours(e.target.value)}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        placeholder="00"
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={endTimeMinutes}
                        onChange={(e) => setEndTimeMinutes(e.target.value)}
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
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={countDownHours}
                        onChange={(e) => setCountDownHours(e.target.value)}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        placeholder="10"
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={countDownMinutes}
                        onChange={(e) => setCountDownMinutes(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {countdownErrors && (
              <p className="text-center text-red-500 mb-3 mt-3">
                {countdownErrors}
              </p>
            )}
          </div>
          <div className="my-6 px-5 text-center">
            <span className="font-medium px-2 bg-white">And/Or</span>
            <hr className="-mt-[10px]" />
          </div>

          <div className="px-5 pb-5">
            <h3>Set a stopwatch (Counting Up)</h3>
            <div className="mt-5 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={timerType === "stopwatch"}
                  name=""
                  id="stopwatch"
                  onChange={() =>
                    setTimerType(
                      timerType === "countdown" ? "stopwatch" : "countdown"
                    )
                  }
                />
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
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={durationHours}
                        onChange={(e) => setDurationHours(e.target.value)}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        placeholder="10"
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(e.target.value)}
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
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
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
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={shortBreakMinutes}
                        onChange={(e) => setShortBreakMinutes(e.target.value)}
                      />
                      <span className="font-medium">:</span>
                      <input
                        type="text"
                        placeholder="00"
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
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
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={longBreakMinutes}
                        onChange={(e) => setLongBreakMinutes(e.target.value)}
                      />
                      <span>:</span>
                      <input
                        type="text"
                        placeholder="00"
                        className="text-success placeholder:text-[#999999] outline-none w-8 text-center"
                        value={longBreakSeconds}
                        onChange={(e) => setLongBreakSeconds(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* footer */}
      <div>
        <div className="px-5 py-4 flex items-center justify-between  border-t border-light-secondary">
          <button
            className="text-xs font-semibold py-[10px] px-2 rounded-lg border border-secondary text-heading transition-all hover:bg-secondary hover:border-secondary hover:text-white"
            onClick={() => {
              setTimerErrors(false);
              setTimeNow({ scheduleForLater: true });
            }}
          >
            Schedule for later
          </button>
          <button
            className="font-semibold p-[10px] border border-secondary rounded-lg bg-secondary text-white transition-all hover:text-heading hover:bg-transparent"
            onClick={setNowHandler}
          >
            Set Now
          </button>
        </div>
        {timerErrors && (
          <p className="mb-4 text-center text-red-600 font-medium">
            Please set timer Or Click Schedule for later button.
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectTimer;
