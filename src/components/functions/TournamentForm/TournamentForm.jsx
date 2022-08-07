import { useState } from 'react';
import {
    Box, Button,
    Grid,
    MenuItem
} from '@mui/material';
import {TextField} from "@mui/material";
import { useNavigate } from "react-router-dom";

const gridStyle = {
    minHeight: "85vh"
};
const inputProps = {
    style: { color: 'black' }
};

const sizes = [4,8,16];
const initValues = {
    title: '',
    game: 'Chess',
    players: [...Array(4).fill("")],
}

export function TournamentForm() {
    const [size, setSize] = useState(4);
    const [tournament, setTournament] = useState(initValues);
    const navigate = useNavigate();

    const handleTournamentSizeChange = (event) => {
        setSize(event.target.value);
    };
    const handleTitleInputChange = e => {
        const {name, value} = e.target;
        setTournament({
            ...tournament,
            [name]: value
        });
    };
    const handlePlayerInputChange = (e, index) => {
        const updatedValues = tournament.players.map((value, i) => {
            if (i === index) {
                return e.target.value
            }
            return value;
        })
        setTournament({
            ...tournament,
            players: updatedValues
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
            .then(data => navigateToScheme(data.id))
            .catch(error => {
                console.error('There was an error!', error);
            });
    };
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
                        inputProps={inputProps}
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
                        SelectProps={inputProps}
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
                {tournament.players.map((v, index) => (
                    <Grid item xs={3} key={index}>
                        <TextField
                            fullWidth
                            required
                            label="Player Name"
                            color="secondary"
                            name={`player-${index}`}
                            value={v}
                            onChange={(e) => handlePlayerInputChange(e, index)}
                            inputProps={inputProps}
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