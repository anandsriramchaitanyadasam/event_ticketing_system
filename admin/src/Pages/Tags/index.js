import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { getApihandler } from "../../Apihandler";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Tags() {
  const [data, setPlantData] = useState([]);

  console.log("data is ----->", data);

  useEffect(() => {
    getPlants();
  }, []);

  const getPlants = async () => {
    try {
      const res = await getApihandler("/getPlant");
      console.log("get plants api response is ----->", res);
      setPlantData(res.data || []); // Ensure data is always an array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <AdminLayout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tag Name</TableCell>
              <TableCell>Tag Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((tagItem) => (
              <TableRow
                key={tagItem._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {tagItem.tag?.name || "N/A"}
                </TableCell>
                <TableCell>
                  {tagItem.tag?.color || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
