<<<<<<< HEAD
/** @format */

=======
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
import React, { useState, useEffect } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { getApihandler } from "../../Apihandler";
import { Card, CardContent, Typography, Grid } from "@mui/material";
<<<<<<< HEAD
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EventIcon from "@mui/icons-material/Event";
export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    userCount();
  }, []);

  const userCount = async () => {
    const res = await getApihandler("/totalCounts");

    console.log("get count api response is -->", res);
    if (res.message === "Counts fetched successfully") {
      setData(res);
    }
  };
  const stats = [
    {
      label: "Users",
      value: data?.totalUsers || 0,
      color: "#59a15f",
      icon: <PeopleIcon fontSize="large" />,
      trend: [10, 20, 30, 50, 60, data?.totalUsers || 0], // Dummy trend data
    },
    {
      label: "Vendors",
      value: data?.totalVendors || 0,
      color: "#f39c12",
      icon: <StorefrontIcon fontSize="large" />,
      trend: [5, 15, 25, 40, 55, data?.totalVendors || 0],
    },
    {
      label: "Events",
      value: data?.totalEvents || 0,
      color: "#e74c3c",
      icon: <EventIcon fontSize="large" />,
      trend: [2, 10, 20, 35, 50, data?.totalEvents || 0],
    },
  ];
=======

export default function Dashboard() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   getCount();
  // }, []);

  // const getCount = async () => {
  //   const res = await getApihandler("/getCount");
  //   console.log("get count api response is -->", res);
  //   if (res.message === "Counts get successfully") {
  //     setData(res);
  //   }
  // };
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7

  return (
    <AdminLayout>
      <h1>Dashboard</h1>
<<<<<<< HEAD
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                textAlign: "center",
                background: stat.color,
                color: "white",
                minHeight: 180,
                position: "relative",
              }}
            >
              <CardContent>
                {stat.icon}
                <Typography variant="h4">{stat.value}</Typography>
                <Typography variant="h6">{stat.label} Count</Typography>

                {/* Sparkline Chart */}
                <div
                  style={{
                    width: "100%",
                    height: 50,
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={stat.trend.map((value, i) => ({ index: i, value }))}
                    >
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ffffff"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
=======
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ minWidth: 275, textAlign: "center", background: "#f5f5f5" }}
          >
            <CardContent>
              <Typography variant="h4" color="primary">
                {data?.userCount || 0}
              </Typography>
              <Typography variant="h5" component="div">
                Users Count
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ minWidth: 275, textAlign: "center", background: "#f5f5f5" }}
          >
            <CardContent>
              <Typography variant="h4" color="secondary">
                {data?.plantCount || 0}
              </Typography>
              <Typography variant="h5" component="div">
                Plants Count
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
    </AdminLayout>
  );
}
