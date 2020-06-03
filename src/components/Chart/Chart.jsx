import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = () => {
    /* same as
        state = {
            dailyData: {}
        }
    */
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };
        
        fetchAPI();
    }, [dailyData]);

    const lineChart = dailyData.length > 0 ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: "confirmed",
                        borderColor: "#3333ff",
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: "deaths",
                        borderColor:'red',
                        backgroundColor: "rgba(255,0,0,0.5)",
                        fill: true,
                    }
                ],
            }}
        />
    ) : null;

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
};

export default Chart;
