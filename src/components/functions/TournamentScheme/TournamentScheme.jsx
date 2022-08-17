import React, { useState, useEffect } from 'react';
import {Box, Button, Grid, MenuItem, TextField, Typography} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import {Bracket, BracketGame} from "react-tournament-bracket";

const gridStyle = {
    minHeight: "85vh"
};
const initPlayersPair = ["Player1", "Player2"]

export function TournamentScheme() {
    const [data, setData] = useState();
    const [gameIdSelector, setGameIdSelector] = useState(1);
    const [gamesId, setGamesId] = useState([]);
    const [playerSelector, setPlayerSelector] = useState("Player1");
    const [playersPair, setPlayersPair] = useState(initPlayersPair)

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:8088/api/tournament/${params.id}`)
            .then(response => response.json())
            .then(result => {
                setData(result)
                if (gamesId.length < 1) {
                    for (let i = 1; i <= result.players.length; i++) {
                        gamesId.push(i);
                    }
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }, []);

    // const gamesList = () => {
    //     for (let i = 0; i < data.players.size; i++) {
    //         console.log(data.players[i])
    //     }
    // }
    // gamesList();

    const handleGameIdChange = (event) => {
        setGameIdSelector(event.target.value);
    };

    const game2 = {
        id: "2",
        name: "semi-finals",
        scheduled: Number(new Date()),
        sides: {
            home: {
                team: {
                    id: "12",
                    name: "Team 1"
                },
                score: {
                    score: 1
                }
            },
            visitor: {
                team: {
                    id: "13",
                    name: "Team 4"
                },
                score: {
                    score: 0
                }
            }
        }
    };
    const game3 = {
        id: "3",
        name: "semi-finals",
        scheduled: Number(new Date()),
        sides: {
            home: {
                team: {
                    id: "11",
                    name: "Team 2"
                },
                score: {
                    score: 1
                }
            },
            visitor: {
                team: {
                    id: "12",
                    name: "Team 3"
                },
                score: {
                    score: 0
                }
            }
        }
    };
    const game1 = {
        id: "1",
        name: "WINNER FINAL",
        scheduled: Number(new Date()),
        sides: {
            home: {
                team: {
                    id: "10",
                    name: "Team 1"
                },
                score: {
                    score: 3
                },
                seed: {
                    displayName: "A1",
                    rank: 1,
                    sourceGame: game2,
                    sourcePool: {}
                }
            },
            visitor: {
                team: {
                    id: "11",
                    name: "Team 2"
                },
                score: {
                    score: 0
                },
                seed: {
                    displayName: "A2",
                    rank: 1,
                    sourceGame: game3,
                    sourcePool: {}
                }
            }
        }
    };
    const game4 = {
        id: "4",
        name: "LOOSER FINAL",
        scheduled: Number(new Date()),
        sides: {
            home: {
                team: {

                    name: ""
                },
                score: {
                    score: 0
                }
            },
            visitor: {
                team: {
                    id: "11",
                    name: "Team 4"
                },
                score: {
                    score: 5
                }
            }
        }
    };
    game4.sides.home.team.name = "Team 3"

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
            component="div"
            sx={{ minHeight: "85vh" }}
        >
            <Box
                component="form"
                sx={{ display: 'flex', flexWrap: 'wrap', margin: '3em' }}
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
                    <Grid item xs={2}>
                        <TextField
                            select
                            fullWidth
                            id="game-slct"
                            label="Game"
                            color="secondary"
                            value={gameIdSelector}
                            onChange={handleGameIdChange}
                        >
                            {gamesId.map((value) => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            id="player-slct"
                            label="Player"
                            color="secondary"
                            value={playerSelector}
                            // onChange={handlePlayerChange}
                        >
                            {playersPair.map((value) => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <Button type="submit" size="large" variant="contained" color="secondary">SUBMIT</Button>
                    </Grid>
                </Grid>
            </Box>
            <Grid container
                  justifyContent="center"
                  alignItems="center"
                  direction="row"
                  spacing={{ xs: 2, md: 3 }}
            >
                <Grid item xs={6} textAlign="right">
                    <Typography variant="h6" gutterBottom component="div" sx={{ paddingRight: '2em' }}>
                        GRAND FINAL
                    </Typography>
                    <Bracket game={game1} />
                </Grid>
                <Grid item xs={8} textAlign="center">
                    <Typography variant="h6" gutterBottom component="div" sx={{ paddingBottom: '1em' }}>
                        SMALL FINAL
                    </Typography>
                    <BracketGame game={game4} />
                </Grid>
                <Grid item xs={5}>
                    <Button fullWidth size="large" variant="contained" color="secondary">FINISH!</Button>
                </Grid>
            </Grid>



        </Box>
    )
}