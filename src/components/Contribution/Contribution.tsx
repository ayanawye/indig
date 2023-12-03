import React, { FC, useState } from "react";
import "./Contribution.scss";
import ContributionTooltip from "../ContributionTooltip/ContributionTooltip";

interface Props {
  contributionCount: number;
  type: "default" | "description";
  date?: Date | string;
}

const Contribution: FC<Props> = ({ contributionCount, type, date }) => {
  const [visibleTooltip, setVisibleTooltip] = useState(false);
  return (
    <div
      onClick={() => setVisibleTooltip(true)}
      onMouseLeave={() => setVisibleTooltip(false)}
      className={`contribution ${
        contributionCount < 1
          ? "contribution__ziro"
          : contributionCount >= 1 && contributionCount <= 9
          ? "contribution__low"
          : contributionCount >= 10 && contributionCount <= 19
          ? "contribution__normal"
          : contributionCount >= 20 && contributionCount <= 29
          ? "contribution__high"
          : contributionCount >= 30
          ? "contribution__overhigh"
          : ""
      }`}
    >
      {type === "default" ? (
        <ContributionTooltip
          visibility={visibleTooltip}
          className="contribution__tooltip"
          date={date}
          contributionCount={`${contributionCount ? contributionCount : ""} ${
            contributionCount
              ? contributionCount > 1
                ? "contributions"
                : "contribution"
              : "No contributions"
          }`}
        />
      ) : type === "description" ? (
        <ContributionTooltip
          visibility={visibleTooltip}
          className="contribution__tooltip"
          description={`${
            contributionCount < 1
              ? "No contributions"
              : contributionCount >= 1 && contributionCount <= 9
              ? "1 - 9 contributions"
              : contributionCount >= 10 && contributionCount <= 19
              ? "10 - 19 contributions"
              : contributionCount >= 20 && contributionCount <= 29
              ? "20 - 29 contributions"
              : contributionCount >= 30
              ? "30+ contributions"
              : ""
          }`}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Contribution;
