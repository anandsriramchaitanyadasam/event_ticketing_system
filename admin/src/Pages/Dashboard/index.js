import React, { useState, useEffect } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { getApihandler } from "../../Apihandler";
import { Card, CardContent, Typography, Grid } from "@mui/material";

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

  return (
    <AdminLayout>
      <h1>Dashboard</h1>
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
    </AdminLayout>
  );
}
