import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const initPodium = {
    firstPlace: "null",
    secondPlace: "null",
    thirdPlace: "null",
};

export function TournamentResult() {
    const [data, setData] = useState(initPodium);
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:8088/api/complete/tournament/${params.id}`)
            .then((response) => response.json())
            .then((result) => setData(result))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);

    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 10, md: 12 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={3} sm={10} md={12} key="title">
                <Typography
                    color="secondary"
                    variant="h5"
                    component="div"
                    sx={{ marginTop: "1em" }}
                >
                    Tournament: {data.title}
                </Typography>
                <Typography color="secondary" variant="h5" component="div">
                    Game: {data.game}
                </Typography>
            </Grid>
            <Grid item xs={1} sm={2} md={3} key="2">
                <Card
                    sx={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        marginTop: "8em",
                    }}
                >
                    <CardContent>
                        <Typography
                            align="center"
                            variant="h4"
                            component="div"
                            color="secondary"
                        >
                            {data.secondPlace}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        image={process.env.PUBLIC_URL + "/img/2nd.png"}
                        alt="2ndPlace"
                    />
                </Card>
            </Grid>
            <Grid item xs={1} sm={2} md={3} key="1">
                <Card
                    sx={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        marginTop: "5em",
                    }}
                >
                    <CardContent>
                        <Typography
                            align="center"
                            variant="h4"
                            component="div"
                            color="secondary"
                        >
                            {data.firstPlace}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        image={process.env.PUBLIC_URL + "/img/1st.png"}
                        alt="1stPlace"
                    />
                </Card>
            </Grid>
            <Grid item xs={1} sm={2} md={3} key="3">
                <Card
                    sx={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        marginTop: "11em",
                    }}
                >
                    <CardContent>
                        <Typography
                            align="center"
                            variant="h4"
                            component="div"
                            color="secondary"
                        >
                            {data.thirdPlace}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        image={process.env.PUBLIC_URL + "/img/3rd.png"}
                        alt="3rdPlace"
                    />
                </Card>
            </Grid>
        </Grid>
    );
}
