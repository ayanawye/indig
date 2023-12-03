import React, { FC } from "react";
import './ContributionTooltip.scss'
import dayjs from "dayjs";

interface Props {
  date?: string | Date;
  contributionCount?: string;
  visibility: boolean;
  className?: string;
  description?: string;
}

const ContributionTooltip: FC<Props> = ({
  visibility,
  className,
  description,
  date,
  contributionCount,
}) => {
  dayjs.locale("ru");
  return (
    <div
      className={`tooltip ${
        visibility ? "tooltip__visible" : "tooltip__hidden"
      } ${className && className}`}
    >
      <div className="tooltip__content">
        {description ? (
          <h3 className="contributions__count tooltip__description}">
            {description}
          </h3>
        ) : (
          ""
        )}
        {contributionCount ? (
          <h3 className="contributions__count">{contributionCount}</h3>
        ) : (
          ""
        )}
        {date && dayjs(date).isValid() ? (
          <h3 className="contributions__date">
            {dayjs(date).format("dddd, MMMM D, YYYY")}
          </h3>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ContributionTooltip;
