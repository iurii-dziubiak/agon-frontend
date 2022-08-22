import React, { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Grid, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const initFirstRound = {
  title: "",
  game: "",
  challenges: [
    ...Array(2).fill({
      rivals: [
        { name: "FirstRoundRival", won: false },
        { name: "FirstRoundRival", won: false },
      ],
      played: false,
    }),
  ],
};
const initSecondRound = {
  challenges: [],
};

export function TournamentScheme() {
  const [firstRound, setFirstRound] = useState(initFirstRound);
  const [secondRound, setSecondRound] = useState(initSecondRound);
  const [thirdRound, setThirdRound] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  console.log(firstRound);

  useEffect(() => {
    fetch(`http://localhost:8088/api/tournament/${params.id}`)
      .then((response) => response.json())
      .then((result) => {
        setFirstRound(result);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  /*
                                                                                            const navigateToScheme = (id) => {
                                                                                              navigate('/tournament/'+id+'/result');
                                                                                            };
                                                                                            */

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
              <Grid item xs={1} key={"f" + index} sx={{ marginBottom: "3rem" }}>
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
                      // setSecondRound((prevState) => {
                      //   const list = [...prevState];
                      //   list.push(v);
                      //   return list;
                      // });
                      setFirstRound({
                        ...firstRound,
                        challenges: firstRound.challenges.map((ch, i) => {
                          if (i === index) {
                            return { ...ch, played: true };
                          }
                          return ch;
                        }),
                      });
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
                      // setSecondRound((prevState) => {
                      //   const list = [...prevState];
                      //   list.push(v);
                      //   return list;
                      // });
                      setFirstRound({
                        ...firstRound,
                        challenges: firstRound.challenges.map((ch, i) => {
                          if (i === index) {
                            return { ...ch, played: true };
                          }
                          return ch;
                        }),
                      });
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
            <Grid item xs={1} key={"s" + index}>
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
