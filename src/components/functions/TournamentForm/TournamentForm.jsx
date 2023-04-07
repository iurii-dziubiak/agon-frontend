import { useState } from "react";
import { Box, Button, Grid, MenuItem } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const sizes = [4, 8, 16];
const initValues = {
    title: "",
    game: "Chess",
    players: [...Array(4).fill("")],
};

export function TournamentForm() {
    const [size, setSize] = useState(4);
    const [tournament, setTournament] = useState(initValues);
    const navigate = useNavigate();

    const handleTournamentSizeChange = (event) => {
        setSize(event.target.value);
        setTournament({
            ...tournament,
            players: Array(event.target.value).fill(""),
        });
    };

    const handleTitleInputChange = (e) => {
        const { name, value } = e.target;
        setTournament({
            ...tournament,
            [name]: value,
        });
    };

    const handlePlayerInputChange = (e, index) => {
        const updatedValues = tournament.players.map((value, i) => {
            if (i === index) {
                return e.target.value;
            }
            return value;
        });
        setTournament({
            ...tournament,
            players: updatedValues,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: tournament.title,
                game: tournament.game,
                players: tournament.players,
            }),
        };
        fetch("http://localhost:8088/api/tournament", requestOptions)
            .then((response) => response.json())
            .then((data) => navigateToScheme(data.id))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    const navigateToScheme = (id) => {
        navigate("/ongoing-tournament/" + id);
    };

    return (
        <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap", marginTop: "3em" }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="row"
                spacing={{ xs: 2, md: 3 }}
            >
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        color="secondary"
                        id="title-id"
                        name="title"
                        label="Tournament Title"
                        value={tournament.title}
                        onChange={handleTitleInputChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        select
                        fullWidth
                        id="select-id"
                        label="Participants"
                        color="secondary"
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
            <Grid container spacing={{ xs: 2 }} sx={{ padding: "3em" }}>
                {tournament.players.map((v, index) => (
                    <Grid item xs={3} key={index}>
                        <TextField
                            fullWidth
                            required
                            label="Player Name"
                            color="secondary"
                            value={v}
                            onChange={(e) => handlePlayerInputChange(e, index)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="row"
            >
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        type="submit"
                        size="large"
                        variant="contained"
                        color="secondary"
                    >
                        START!
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
