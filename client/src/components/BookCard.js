import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import RemoveIcon from "@mui/icons-material/Remove";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const BookCard = ({
  remove,
  main,
  like,
  book_name,
  author,
  genre,
  img,
}) => {
  return (
    <>
      <Grid item xs={2} sm={4} md={4} sx={{ my: 5 }}>
        <Item
          sx={{
            maxWidth: 250,
            backgroundColor: "black",
            mx: "auto",
          }}
        >
          <Card
            sx={{
              maxWidth: 250,
              color: "white",
              backgroundColor: "black",
            }}
          >
            <CardMedia component="img" height="200" image={img} />
            <CardContent>
              <Typography gutterBottom variant="body2" component="div">
                {book_name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <Typography
                  gutterBottom
                  variant="body3"
                  component="div"
                  style={{ textTransform: "capitalize" }}
                >
                  {genre}
                </Typography>
              </Button>
              <Button size="small">
                <Typography
                  gutterBottom
                  variant="body3"
                  component="div"
                  style={{ textTransform: "capitalize" }}
                >
                  {author}
                </Typography>
              </Button>
              {main ? (
                <Button onClick={like} size="small">
                  <ThumbUpIcon />
                </Button>
              ) : (
                <Button size="small" onClick={remove}>
                  <RemoveIcon style={{ color: "red" }} />
                </Button>
              )}
            </CardActions>
          </Card>
        </Item>
      </Grid>
    </>
  );
};
