import * as React from 'react';
import {
    Box, Button,
    Grid,
    MenuItem
} from '@mui/material';
import {TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

const gridStyle = {
    minHeight: "85vh"
};

const sizes = [4,8,16];
const initValues = {
    title: '',
    game: 'Chess',
    players: []
}
let tempPlayers = []

export function TournamentForm() {
    const [size, setSize] = React.useState(4);
    const [tournament, setTournament] = React.useState(initValues);

    const handleTournamentSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSize(event.target.value);
    };
    const handleTitleInputChange = e => {
        const {name, value} = e.target;
        setTournament({
            ...tournament,
            [name]:value
        });
    };
    const handlePlayerInputChange = (e, index) => {
        const {name, value} = e.target;
        tempPlayers[index] = value;
        setTournament({
            ...tournament,
            [name]:tempPlayers
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        const requestOptions = {
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
            .then(data => navigateToScheme(data))
            .catch(error => {
                console.error('There was an error!', error);
            });
        // navigateToScheme(1); // .then(data => navigateToScheme(2))
    };
    const navigate = useNavigate();
    const navigateToScheme = (id) => {
        navigate('/tournament/'+id);
    };

    return (
        <Box
            component="form"
            style={gridStyle}
            sx={{ display: 'flex', flexWrap: 'wrap' }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Grid container
                  justifyContent="center"
                  alignItems="center"
                  direction="row"
                  spacing={{ xs: 2, md: 3 }}
            >
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        color="secondary" focused
                        id="trnmt-title"
                        name="title"
                        label="Tournament Title"
                        value={tournament.title}
                        onChange={handleTitleInputChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        fullWidth
                        id="select-participants"
                        select
                        label="Participants"
                        color="secondary" focused
                        value={size}
                        onChange={handleTournamentSizeChange}
                    >
                        {sizes.map((value) => (
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Grid container
                  spacing={{ xs: 1 }}
            >
                {[...Array(size)].map((v,index) => (
                    <Grid item xs={3} key={index}>
                        <TextField
                            fullWidth
                            required
                            id={"player"+index}
                            label="Player Name"
                            color="secondary" focused
                            name="players"
                            value={tournament.players[index]}
                            onBlur={(e) => handlePlayerInputChange(e, index)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid container
                  justifyContent="center"
                  alignItems="center"
                  direction="row"
            >
                <Grid item xs={6}>
                    <Button fullWidth type="submit" size="large" variant="contained" color="secondary">START!</Button>
                </Grid>
            </Grid>

        </Box>
    );
}