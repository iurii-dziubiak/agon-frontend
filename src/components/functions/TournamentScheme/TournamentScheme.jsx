import React, { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Grid, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const initFirstRound = {
    title: "",
    game: "",
    challenges: [
        ...Array(2).fill({
            rivals: [
                { name: "FirstRoundRival1", won: false },
                { name: "FirstRoundRival2", won: false },
            ],
            played: false,
        }),
    ],
};
const initPreparingList = {
    rivals: [],
};
const initSecondRound = {
    challenges: [],
};

export function TournamentScheme() {
    const [firstRound, setFirstRound] = useState(initFirstRound);
    const [preparingListSR, setPreparingListSR] = useState(initPreparingList);
    const [secondRound, setSecondRound] = useState(initSecondRound);
    const [preparingListTR, setPreparingListTR] = useState(initPreparingList);
    const [thirdRound, setThirdRound] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:8088/api/tournament/${params.id}`)
            .then((response) => response.json())
            .then((result) => setFirstRound(result))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);

    useEffect(() => {
        if (preparingListSR.rivals.length === firstRound.challenges.length) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rivals: preparingListSR.rivals,
                }),
            };
            fetch("http://localhost:8088/api/second-round", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setSecondRound(data);
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }
    }, [preparingListSR.rivals]);

    const handlePreparingListSR = (rival) => {
        setPreparingListSR((prevState) => ({
            rivals: [...prevState.rivals, rival],
        }));
    };

    const handleChallengePlayedFR = (index, name) => {
        setFirstRound({
            ...firstRound,
            challenges: firstRound.challenges.map((value, i) => {
                if (i === index) {
                    return {
                        rivals: value.rivals.map((r) =>
                            r.name === name ? { ...r, won: true } : r
                        ),
                        played: true,
                    };
                }
                return value;
            }),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap", marginTop: "3em" }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Grid container>
                <Grid
                    container
                    item
                    xs={4}
                    direction="column"
                    justifyContent="center"
                    rowGap={{ xs: 2 }}
                    wrap="nowrap"
                >
                    {firstRound.challenges.map((v, index) => (
                        <Grid
                            item
                            xs={1}
                            key={index}
                            sx={{ marginBottom: "3rem" }}
                        >
                            {v.rivals.map((r) => (
                                <ButtonGroup
                                    variant="contained"
                                    aria-label="button group"
                                    disabled={v.played}
                                    sx={{
                                        backgroundColor: r.won ? "green" : "",
                                        opacity: r.won ? "0.2" : "1",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="Player"
                                        color="secondary"
                                        value={r.name}
                                    />
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            handlePreparingListSR(r);
                                            handleChallengePlayedFR(
                                                index,
                                                r.name
                                            );
                                        }}
                                    >
                                        W
                                    </Button>
                                </ButtonGroup>
                            ))}
                        </Grid>
                    ))}
                </Grid>
                <Grid
                    container
                    item
                    xs={4}
                    direction="column"
                    justifyContent="center"
                    rowGap={{ xs: 2 }}
                >
                    {secondRound.challenges.map((v, index) => (
                        <Grid
                            item
                            xs={1}
                            key={"s" + index}
                            sx={{ marginBottom: "3rem" }}
                        >
                            {v.rivals.map((r) => (
                                <ButtonGroup
                                    variant="contained"
                                    aria-label="button group"
                                    disabled={v.played}
                                    sx={{
                                        backgroundColor: r.won ? "green" : "",
                                        opacity: r.won ? "0.2" : "1",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="Player"
                                        color="secondary"
                                        value={r.name}
                                    />
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            handlePreparingListTR(r);
                                            handleChallengePlayedSR(
                                                index,
                                                r.name
                                            );
                                        }}
                                    >
                                        W
                                    </Button>
                                </ButtonGroup>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ marginLeft: "50%" }}
            >
                SUBMIT
            </Button>
        </Box>
    );
}
