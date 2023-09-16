const time = 120;
const breakTime = 20;
const intervals = 3;

const fullTime = time + breakTime * intervals;

const fullTimeBreakTime = fullTime / intervals;

for (let i = 1; i <= intervals; i++) {
  console.log("start break", fullTimeBreakTime * i - breakTime);
  console.log("end break", fullTimeBreakTime * i);
}
