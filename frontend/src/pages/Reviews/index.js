import React, { useEffect, useState } from "react";
import { getApihandler } from "../../Apihandler";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import Header from "../../layout/header";

export default function Reviews() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getReviewsVendor();
  }, []);
  const getReviewsVendor = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const vendorId = userData._id;
    const res = await getApihandler(`/getVendorEventReviews/${vendorId}`);

    if (res.status === 200) {
      setData(res.data);
    }
  };
  return (
    <>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Event Reviews & Ratings
        </Typography>

        <Grid container spacing={3}>
          {data?.map((review, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {review.event_name}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    by {review.user_name}
                  </Typography>

                  <Rating
                    name="read-only"
                    value={review.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />

                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {review.review}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", marginTop: 2 }}
                  >
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
