import React, { useEffect, useState } from "react";
import "./ContributionGraph.scss";
import { getData } from "../../api/axios";
import dayjs from "dayjs";
import Contribution from "../Contribution/Contribution";

require("dayjs/locale/ru");
const ContributionGraph = () => {
  dayjs.locale("ru");
  const [contributionList, setContributionList] = useState(null);
  const [contributionListArray, setContributionListArray] = useState<
    (string | number)[][]
  >([]);
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
  const generateContribution = (index: number) => {
    const newDate = dayjs(new Date())
      .subtract(index, "day")
      .format("YYYY-MM-DD");
    if (contributionList && contributionList[newDate]) {
      return [newDate, contributionList[newDate]];
    }
    const newContributionCount = 0;
    const newContribution = [newDate, newContributionCount];
    return newContribution;
  };
  useEffect(() => {
    if (contributionList) {
      let newArr: (string | number)[][] = [];
      for (let i = 0; i < 357; i++) {
        const contributionListElement = generateContribution(i);
        newArr.push(contributionListElement);
      }
      setContributionListArray(newArr);
    }
  }, [contributionList]);

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
        <div className="contribution_list">
          {contributionList &&
            contributionListArray
              .reverse()
              .map((contribution: (string | number)[], i) => (
                <Contribution
                  key={i}
                  date={contribution[0].toString()}
                  type="default"
                  contributionCount={Number(contribution[1])}
                />
              ))}
        </div>
      </div>
      <div className="rates">
        <p>Меньше</p>
        <div className="colors">
          <Contribution type="description" contributionCount={0} />
          <Contribution type="description" contributionCount={3} />
          <Contribution type="description" contributionCount={10} />
          <Contribution type="description" contributionCount={23} />
          <Contribution type="description" contributionCount={35} />
        </div>
        <p>Больше</p>
      </div>
    </div>
  );
};

export default ContributionGraph;
