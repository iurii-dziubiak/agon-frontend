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
const initPreparingListSR = {
    rivals: [],
};
const initSecondRound = {
    challenges: [],
};

export function TournamentScheme() {
    const [firstRound, setFirstRound] = useState(initFirstRound);
    const [preparingListSR, setPreparingListSR] = useState(initPreparingListSR);
    const [secondRound, setSecondRound] = useState(initSecondRound);
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
        console.log("USE_EFFECT");
    });

    if (preparingListSR.rivals.length === firstRound.challenges.length) {
        console.log("JUST IF");
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
                setPreparingListSR({
                    ...preparingListSR,
                    rivals: [],
                });
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    } else console.log("ELSE");

    const handlePreparingListSR = (rival) => {
        setPreparingListSR((prevState) => {
            const obj = prevState;
            obj.rivals.push(rival);
            return obj;
        });
    };

    const handleChallengePlayedFR = (index) => {
        setFirstRound({
            ...firstRound,
            challenges: firstRound.challenges.map((value, i) => {
                if (i === index) {
                    return { ...value, played: true };
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
                        <>
                            <Grid
                                item
                                xs={1}
                                key={"f" + index}
                                sx={{ marginBottom: "3rem" }}
                            >
                                <ButtonGroup
                                    variant="contained"
                                    aria-label="button group"
                                    disabled={v.played}
                                    sx={{ marginBottom: "0.75rem" }}
                                >
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="Player"
                                        color="secondary"
                                        value={v.rivals[0].name}
                                    />
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            handlePreparingListSR(v.rivals[0]);
                                            handleChallengePlayedFR(index);
                                        }}
                                    >
                                        W
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup
                                    variant="contained"
                                    aria-label="button group"
                                    disabled={v.played}
                                >
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="Player"
                                        color="secondary"
                                        value={v.rivals[1].name}
                                    />
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            handlePreparingListSR(v.rivals[1]);
                                            handleChallengePlayedFR(index);
                                        }}
                                    >
                                        W
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </>
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
                            <ButtonGroup
                                variant="contained"
                                aria-label="button group"
                                disabled={v.played}
                                sx={{ marginBottom: "0.75rem" }}
                            >
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Player"
                                    color="secondary"
                                    value={v.rivals[0].name}
                                />
                                <Button color="secondary" onClick={() => {}}>
                                    W
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup
                                variant="contained"
                                aria-label="button group"
                                disabled={v.played}
                            >
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Player"
                                    color="secondary"
                                    value={v.rivals[1].name}
                                />
                                <Button color="secondary" onClick={() => {}}>
                                    W
                                </Button>
                            </ButtonGroup>
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
