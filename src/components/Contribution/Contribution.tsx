import React, { FC } from "react";
import "./Contribution.scss";

interface Props {
  contributionCount: number;
  type: "default" | "description";
}

const Contribution: FC<Props> = ({ contributionCount, type }) => {
  return (
    <div
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
    ></div>
  );
};

export default Contribution;
