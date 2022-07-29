import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {Card, CardActionArea, CardMedia, Grid} from "@mui/material";

export function GameList() {
    const gridStyle = {
        minHeight: "85vh"
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8088/api/games')
            .then(response => response.json())
            .then(result => setData(result));
    }, []);

    const navigate = useNavigate();
    const navigateToCreateTournament = () => {
        navigate('/tournament');
    };

    return (
        <Grid
            style={gridStyle}
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 9, md: 12 }}
            direction="row"
            justifyContent="center"
            alignItems="center">
            {data.map((value, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                    <Card>
                        <CardActionArea onClick={navigateToCreateTournament}>
                            <CardMedia
                                component="img"
                                image={process.env.PUBLIC_URL + '/img/' + value.image}
                                alt={value.name}
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}