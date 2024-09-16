import { useState, useEffect } from "react";
import moment from "moment";

const useTodayDate = () => {
  const [days, setDays] = useState([]);
  const [todayIndex, setTodayIndex] = useState(2); 

  useEffect(() => {
    let tempDays = [];
    for (let i = -2; i <= 2; i++) {
      // Format the date as "ddd DD MMM YYYY"
      tempDays.push(moment().add(i, "days").format("ddd DD MMM YYYY"));
    }
    setDays(tempDays);
  }, []);

  return { days, todayIndex, setTodayIndex };
};

export default useTodayDate;