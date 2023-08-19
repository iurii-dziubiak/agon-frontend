import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { useGameContext } from "../../../context/GameContext";

const gridStyle = {
    minHeight: "85vh",
};

export function GameList() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { setGame, clearGame } = useGameContext();

    useEffect(() => {
        clearGame();
        fetch("http://localhost:8088/api/games")
            .then((response) => response.json())
            .then((result) => setData(result));
    }, []);

    const navigateToCreateTournament = (game) => {
        setGame({ name: game.name, bgImage: "bg-" + game.image });
        navigate("/tournament");
    };

    return (
        <Grid
            style={gridStyle}
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 9, md: 12 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {data.map((game, index) => (
                <Grid item xs={1} sm={3} md={3} key={index}>
                    <Card>
                        <CardActionArea
                            onClick={() => navigateToCreateTournament(game)}
                        >
                            <CardMedia
                                component="img"
                                image={
                                    process.env.PUBLIC_URL +
                                    "/img/" +
                                    game.image
                                }
                                alt={game.name}
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
