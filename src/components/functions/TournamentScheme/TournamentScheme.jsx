import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const initFirstRound = {
    challenges: [
        ...Array(2).fill({
            rivals: [
                { name: "FirstRoundRival1", won: false, lose: false },
                { name: "FirstRoundRival2", won: false, lose: false },
            ],
            played: false,
        }),
    ],
};

const initNextRound = {
    challenges: [],
};

const initPreparingList = {
    rivals: [],
};

const initPodium = {
    first: "null",
    second: "null",
    third: "null",
};

export function TournamentScheme() {
    const [firstRound, setFirstRound] = useState(initFirstRound);
    const [secondRoundList, setSecondRoundList] = useState(initPreparingList);
    const [secondRound, setSecondRound] = useState(initNextRound);
    const [thirdRoundList, setThirdRoundList] = useState(initPreparingList);
    const [thirdRound, setThirdRound] = useState(initNextRound);
    const [smallFinalList, setSmallFinalList] = useState(initPreparingList);
    const [smallFinalRound, setSmallFinalRound] = useState(initNextRound);
    const [podiumList, setPodiumList] = useState(initPodium);
    const navigate = useNavigate();
    const params = useParams();

    // console.log(podiumList);

    useEffect(() => {
        fetch(`http://localhost:8088/api/ongoing/tournament/${params.id}`)
            .then((response) => response.json())
            .then((result) => setFirstRound(result))
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, []);

    useEffect(() => {
        if (secondRoundList.rivals.length === firstRound.challenges.length) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rivals: secondRoundList.rivals,
                }),
            };
            fetch("http://localhost:8088/api/next-round", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setSecondRound(data);
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }
    }, [secondRoundList.rivals]);

    useEffect(() => {
        if (thirdRoundList.rivals.length === secondRound.challenges.length) {
            handlePreparingListSmallFinal();
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rivals: thirdRoundList.rivals,
                }),
            };
            fetch("http://localhost:8088/api/next-round", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    setThirdRound(data);
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }
    }, [thirdRoundList.rivals]);

    useEffect(() => {
        if (thirdRoundList.rivals.length === 2) {
            setSmallFinalRound({
                challenges: [
                    {
                        rivals: smallFinalList.rivals,
                        played: false,
                    },
                ],
            });
        }
    }, [smallFinalList.rivals]);

    useEffect(() => {
        if (podiumList.third !== "null" && podiumList.second !== "null") {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first: podiumList.first,
                    second: podiumList.second,
                    third: podiumList.third,
                    id: params.id,
                }),
            };
            fetch("http://localhost:8088/api/podium", requestOptions)
                .then((response) => response.json())
                .then((data) => navigateToResultTournament(data.id))
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }
    }, [podiumList]);

    const handlePreparingListSR = (rival) => {
        setSecondRoundList((prevState) => ({
            rivals: [...prevState.rivals, rival],
        }));
    };

    const handlePreparingListTR = (rival) => {
        setThirdRoundList((prevState) => ({
            rivals: [...prevState.rivals, rival],
        }));
    };

    const handlePreparingListSmallFinal = () => {
        secondRound.challenges.forEach((c) => {
            c.rivals.forEach((r) => {
                if (r.lose === true) {
                    setSmallFinalList((prevState) => ({
                        rivals: [
                            ...prevState.rivals,
                            { name: r.name, won: false, lose: false },
                        ],
                    }));
                }
            });
        });
    };

    const handleChallengePlayedFR = (index, name) => {
        setFirstRound({
            challenges: firstRound.challenges.map((value, i) => {
                if (i === index) {
                    return {
                        rivals: value.rivals.map((r) =>
                            r.name === name
                                ? { ...r, won: true }
                                : { ...r, lose: true }
                        ),
                        played: true,
                    };
                }
                return value;
            }),
        });
    };

    const handleChallengePlayedSR = (index, name) => {
        setSecondRound({
            challenges: secondRound.challenges.map((value, i) => {
                if (i === index) {
                    return {
                        rivals: value.rivals.map((r) =>
                            r.name === name
                                ? { ...r, won: true }
                                : { ...r, lose: true }
                        ),
                        played: true,
                    };
                }
                return value;
            }),
        });
    };

    const handleFinalChallengesPlayed = (name, round) => {
        if (round === "FR") {
            setThirdRound({
                challenges: thirdRound.challenges.map((value) => {
                    return {
                        rivals: value.rivals.map((r) =>
                            r.name === name
                                ? { ...r, won: true }
                                : { ...r, lose: true }
                        ),
                        played: true,
                    };
                }),
            });
        } else {
            setSmallFinalRound({
                challenges: smallFinalRound.challenges.map((value) => {
                    return {
                        rivals: value.rivals.map((r) =>
                            r.name === name
                                ? { ...r, won: true }
                                : { ...r, lose: true }
                        ),
                        played: true,
                    };
                }),
            });
        }
    };

    const handlePodiumList = (name, round) => {
        if (round === "FR") {
            thirdRound.challenges.forEach((c) => {
                c.rivals.forEach((r) => {
                    if (r.name === name) {
                        setPodiumList((prevState) => ({
                            first: name,
                            second: prevState.second,
                            third: prevState.third,
                        }));
                    } else {
                        setPodiumList((prevState) => ({
                            first: prevState.first,
                            second: r.name,
                            third: prevState.third,
                        }));
                    }
                });
            });
        } else {
            smallFinalRound.challenges.forEach((c) => {
                c.rivals.forEach((r) => {
                    if (r.name === name) {
                        setPodiumList((prevState) => ({
                            first: prevState.first,
                            second: prevState.second,
                            third: name,
                        }));
                    }
                });
            });
        }
    };

    const navigateToResultTournament = (id) => {
        navigate("/complete/tournament/" + id);
    };

    return (
        <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap", marginTop: "3em" }}
            noValidate
            autoComplete="off"
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
                            {v.rivals.map((r, i) => (
                                <ButtonGroup
                                    key={i}
                                    variant="contained"
                                    aria-label="button group"
                                    disabled={v.played}
                                    sx={{
                                        opacity: r.lose ? "0.5" : "1",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    <TextField
                                        disabled
                                        label="Player"
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
                            {v.rivals.map((r, i) => (
                                <ButtonGroup
                                    key={i}
                                    variant="contained"
                                    aria-label="button group"
                                    disabled={v.played}
                                    sx={{
                                        opacity: r.lose ? "0.5" : "1",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    <TextField
                                        disabled
                                        label="Player"
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
                <Grid
                    container
                    item
                    xs={4}
                    sx={{ marginTop: "16em" }}
                    direction="column"
                    justifyContent="center"
                    rowGap={{ xs: 2 }}
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color="secondary"
                    >
                        {thirdRound.challenges.length > 0 ? "GRAND FINAL" : ""}
                    </Typography>
                    {thirdRound.challenges.map((v, index) => (
                        <Grid
                            item
                            xs={1}
                            key={"s" + index}
                            sx={{ marginBottom: "6rem" }}
                        >
                            {v.rivals.map((r, i) => (
                                <ButtonGroup
                                    key={i}
                                    variant="contained"
                                    aria-label="button group"
                                    disabled={v.played}
                                    sx={{
                                        opacity: r.lose ? "0.5" : "1",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    <TextField
                                        disabled
                                        label="Player"
                                        value={r.name}
                                    />
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            handleFinalChallengesPlayed(
                                                r.name,
                                                "FR"
                                            );
                                            handlePodiumList(r.name, "FR");
                                        }}
                                    >
                                        W
                                    </Button>
                                </ButtonGroup>
                            ))}
                        </Grid>
                    ))}
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        color="secondary"
                    >
                        {smallFinalRound.challenges.length > 0
                            ? "SMALL FINAL"
                            : ""}
                    </Typography>
                    {smallFinalRound.challenges.map((v, index) => (
                        <Grid
                            item
                            xs={1}
                            key={"s" + index}
                            sx={{ marginBottom: "3rem" }}
                        >
                            {v.rivals.map((r, i) => (
                                <ButtonGroup
                                    key={i}
                                    variant="contained"
                                    aria-label="button group"
                                    disabled={v.played}
                                    sx={{
                                        opacity: r.lose ? "0.5" : "1",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    <TextField
                                        disabled
                                        label="Player"
                                        value={r.name}
                                    />
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            handleFinalChallengesPlayed(
                                                r.name,
                                                "SFR"
                                            );
                                            handlePodiumList(r.name, "SFR");
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
        </Box>
    );
}
