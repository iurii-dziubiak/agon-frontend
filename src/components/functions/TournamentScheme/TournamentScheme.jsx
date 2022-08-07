import React, { useState, useEffect } from 'react';
import {Box, Button, Grid, TextField} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";

const gridStyle = {
    minHeight: "85vh"
};

export function TournamentScheme() {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:8088/api/tournament/${params.id}`)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    console.log(data)

    const handleSubmit = e => {
        e.preventDefault();
        /*const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: tournament.title,
                game: tournament.game,
                players: tournament.players
            })
        };
        fetch('http://localhost:8088/api/tournament', requestOptions)
            .then(response => response.json())
            .then(data => navigateToScheme(data.id))
            .catch(error => {
                console.error('There was an error!', error);
            });*/
    };
    /*const navigateToScheme = (id) => {
        navigate('/tournament/'+id+'/result');
    };*/

    return (
        <Box
            component="form"
            style={gridStyle}
            sx={{ display: 'flex', flexWrap: 'wrap' }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Grid
            style={gridStyle}
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 9, md: 12 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
                {/*{data.players.map((value, index) => (*/}
                {/*    <Grid item xs={2} sm={3} md={3} key={index}>*/}
                {/*        <TextField*/}
                {/*            fullWidth*/}
                {/*            disabled*/}
                {/*            id={"player"+index}*/}
                {/*            label="Player Name"*/}
                {/*            color="secondary" focused*/}
                {/*            name="players"*/}
                {/*            // value={tournament.players[index]}*/}
                {/*            // onBlur={(e) => handlePlayerInputChange(e, index)}*/}
                {/*            // inputProps={inputProps}*/}
                {/*        />*/}
                {/*    </Grid>*/}
                {/*))}*/}
            </Grid>
            <Button type="submit" size="large" variant="contained" color="secondary">FINISH!</Button>
        </Box>
    )
}