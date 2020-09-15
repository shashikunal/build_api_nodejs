import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import Moment from "react-moment";
import { getWakaTimeStats } from "../../actions/profile";

const WakaTimeStats = ({
  username,
  getWakaTimeStats,
  wakatimestats: { data },
}) => {
  const [displayWaka, displayWakaToggle] = useState(false);
  const [displayChartLine, displayChartToggleLine] = useState(true);
  const [displayChartDoughnut, displayChartToggleDoughnut] = useState(false);
  const [displayChartBar, displayChartToggleBar] = useState(false);

  useEffect(() => {
    getWakaTimeStats(username);
  }, [getWakaTimeStats]);

  let toggleIcon =
    displayWaka === false ? (
      <i className="fas fa-plus"></i>
    ) : (
      <i className="fas fa-minus"></i>
    );

  if (data === null || data === undefined) {
    console.log("no files");
  } else {
    var Lang_Name = [];
    var Lang_percentage = [];

    data.languages.map((dataObj) => {
      Lang_Name.push(dataObj.name);
      Lang_percentage.push(parseFloat(dataObj.percent));
    });

    var lineChart = {
      labels: Lang_Name,
      datasets: [
        {
          label: "languages",
          data: Lang_percentage,
          backgroundColor: [
            "#C70039 ",
            " #2f9e44",
            "#FFBD33",
            "#0071c2",
            "#BFC9CA",
          ],
        },
      ],
    };
  }

  return (
    <div>
      <div>
        {data === null ? (
          <Spinner />
        ) : (
          <div>
            <h2
              className="custom_heading"
              onClick={() => displayWakaToggle(!displayWaka)}
            >
              coding Statistics
              <span
                className="text-right float-right"
                title="click here to expand"
              >
                {toggleIcon}
              </span>
            </h2>
            {displayWaka && (
              <Fragment>
                <div className="d-flex waka_Block text-primary row">
                  <p className="float-right1 col-4">
                    <span>
                      <i className="fad fa-address-card"></i>
                      Average coding per day
                    </span>
                    <span className="badge badge-primary">
                      {data.human_readable_daily_average}
                    </span>
                  </p>
                  <p className="float-right1 col-4">
                    <span>
                      <i className="fad fa-map-marker-alt"></i>
                      Last 7 days of total coding average
                    </span>
                    <span className="badge badge-primary">
                      {data.human_readable_total}
                    </span>
                  </p>
                  <p className="float-right1 col-12">
                    <span>
                      <i className="fas fa-language"></i>
                      Languages
                    </span>

                    <div className="btn-group">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          displayChartToggleLine(true);
                          displayChartToggleDoughnut(false);
                          displayChartToggleBar(false);
                        }}
                      >
                        Line Chart
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          displayChartToggleLine(false);
                          displayChartToggleDoughnut(true);
                          displayChartToggleBar(false);
                        }}
                      >
                        Doughnut Chart
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          displayChartToggleLine(false);
                          displayChartToggleDoughnut(false);
                          displayChartToggleBar(true);
                        }}
                      >
                        Bar Chart
                      </button>
                    </div>

                    {displayChartLine && <Line data={lineChart} />}
                    {displayChartDoughnut && <Doughnut data={lineChart} />}
                    {displayChartBar && <Bar data={lineChart} />}
                  </p>

                  <p className="float-right1 col-4">
                    <span>
                      <i className="fa fa-code" aria-hidden="true"></i>
                      Total Coding average last 7 days
                    </span>
                    <span className="badge badge-primary">
                      {data.human_readable_total_including_other_language}
                    </span>
                  </p>
                </div>
              </Fragment>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  wakatimestats: state.profile.wakatimestats,
});

export default connect(mapStateToProps, { getWakaTimeStats })(WakaTimeStats);
