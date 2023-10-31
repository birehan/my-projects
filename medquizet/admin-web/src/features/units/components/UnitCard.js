import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DeleteUnit from "./UnitDeleteDialog";

const UnitCard = ({ unit, setSelectedComponent }) => {
  const [openDeleteUnit, setOpenDeleteUnit] = React.useState(false);

  return (
    <Card
      sx={{
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        maxHeight: "fit-content",
        minHeight: "100px",
        width: {
          xs: "100%",
          sm: "calc(50% - 20px)",
          md: "calc(33.33% - 20px)",
        },
        minWidth: "200px",
      }}
    >
      {openDeleteUnit && (
        <DeleteUnit
          openDeleteUnit={openDeleteUnit}
          setOpenDeleteUnit={setOpenDeleteUnit}
          unit={unit}
        />
      )}
      <CardContent>
        <CardHeader
          title={unit.title}
          sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
        />
      </CardContent>
      <CardActions disableSpacing sx={{ paddingBottom: "16px", gap: "20px" }}>
        <Stack
          onClick={() => setSelectedComponent(`unit/${unit?.id}/edit`)}
          sx={{
            flexDirection: "row",
            alignItems: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <IconButton aria-label="Edit">
            <Edit />
          </IconButton>
          <Typography>Edit</Typography>
        </Stack>

        <Stack
          onClick={() => setOpenDeleteUnit(true)}
          sx={{
            flexDirection: "row",
            alignItems: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <IconButton aria-label="Delete">
            <Delete />
          </IconButton>
          <Typography>Delete</Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default UnitCard;
