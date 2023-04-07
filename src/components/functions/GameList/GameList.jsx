import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";

const gridStyle = {
  minHeight: "85vh",
};

export function GameList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8088/api/games")
        .then((response) => response.json())
        .then((result) => setData(result));
  }, []);

  const navigateToCreateTournament = (game) => {
    //FIXME set game name
    console.log(game);
    navigate("/tournament");
  };

  return (
      <Grid
          style={gridStyle}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 9, md: 12 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
      >
        {data.map((game, index) => (
            <Grid item xs={2} sm={3} md={3} key={index}>
              <Card>
                <CardActionArea onClick={() => navigateToCreateTournament(game.name)}>
                  <CardMedia
                      component="img"
                      image={process.env.PUBLIC_URL + "/img/" + game.image}
                      alt={game.name}
                  />
                </CardActionArea>
              </Card>
            </Grid>
        ))}
      </Grid>
  );
}
