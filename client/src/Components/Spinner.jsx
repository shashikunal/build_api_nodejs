import React from "react";

const Spinner = () => {
  return (
    <div>
      <div className="SpinnerBlock">
        <div className="spinner middleSpinner">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 28 28"
              focusable="false"
            >
              <circle
                cx={14}
                cy={14}
                r={12}
                fill="none"
                stroke="#000"
                strokeWidth={4}
                opacity=".15"
              />
              <circle
                pathLength={1}
                cx={14}
                cy={14}
                r={12}
                fill="none"
                stroke="#00A871"
                strokeWidth={4}
                strokeDasharray="27 57"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
