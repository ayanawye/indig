import React, { useEffect, useState } from "react";
import "./ContributionGraph.scss";
import { getData } from "../../api/axios";
import dayjs from "dayjs";
import Contribution from "../Contribution/Contribution";

require("dayjs/locale/ru");
const ContributionGraph = () => {
  dayjs.locale("ru");
  const [contributionList, setContributionList] = useState(null);
  const [monthList, setMonthList] = useState<string[]>([]);
  const daysList = ["Пн", "Ср", "Пт"];

  useEffect(() => {
    (async function getContributions() {
      const data = await getData();
      setContributionList(data);
      let monthsArr: string[] = [];
      for (let i = 0; i < 12; i++) {
        monthsArr = [
          dayjs(new Date()).subtract(i, "month").format("MMM"),
          ...monthsArr,
        ];
      }
      setMonthList(monthsArr);
    })();
  }, []);

  console.log(contributionList);
  console.log(monthList);

  return (
    <div className="contribution_graph">
      <div className="month">
        {monthList && monthList.map((el, i) => <p key={i}>{el}</p>)}
      </div>
      <div className="contributions">
        <div className="days">
          {daysList.map((el, i) => (
            <p key={i}>{el}</p>
          ))}
        </div>
        <div className="contribution_list"></div>
      </div>
      <div className="rates">
        <p>Меньше</p>
        <div className="colors">
          <Contribution contributionCount={0} />
          <Contribution contributionCount={3} />
          <Contribution contributionCount={10} />
          <Contribution contributionCount={23} />
          <Contribution contributionCount={35} />
        </div>
        <p>Больше</p>
      </div>
    </div>
  );
};

export default ContributionGraph;
