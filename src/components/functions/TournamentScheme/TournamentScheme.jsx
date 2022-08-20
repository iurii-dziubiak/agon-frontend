import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

// Example structure
const games = [
  {
    players: [
      { name: "elo", win: false },
      { name: "test", win: false },
    ],
    played: false,
  },
  {
    players: [
      { name: "siema", win: false },
      { name: "test1", win: false },
    ],
    played: false,
  },
];

const initValues = {
  title: "",
  game: "Chess",
  players: [...Array(4).fill({ name: "", win: false })],
};

export function TournamentScheme() {
  const [data, setData] = useState(initValues);
  const [secondRound, setSecondRound] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:8088/api/tournament/${params.id}`)
      .then((response) => response.json())
      .then((result) => {
        setData({
          ...result,
          players: result.players.map((p) => ({ name: p, win: false })),
        });
        // setSecondRound(Array(result.players.length / 2).fill(""));
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
          {data.players.map((v, index) => (
            <>
              <Grid
                item
                xs={1}
                key={index}
                {...(index % 2 !== 0 &&
                  index !== data.players.length - 1 && {
                    style: { marginBottom: "3rem" },
                  })}
              >
                <ButtonGroup variant="contained" aria-label="button group">
                  <TextField
                    fullWidth
                    disabled
                    label="Player"
                    color="secondary"
                    name={`player-${index}`}
                    value={v.name}
                  />
                  <Button
                    color="secondary"
                    onClick={() => {
                      setSecondRound((prevState) => {
                        const list = [...prevState];
                        list.push(v);
                        return list;
                      });
                      setData({
                        ...data,
                        players: data.players.map((p, i) => {
                          if (i === index) {
                            return { ...p, win: true };
                          }
                          return p;
                        }),
                      });
                    }}
                    disabled={v.win}
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
          {secondRound.map((v, index) => (
            <Grid
              item
              xs={1}
              key={index}
              {...(index % 2 !== 0 &&
                index !== data.players.length - 1 && {
                  style: { marginBottom: "3rem" },
                })}
            >
              <ButtonGroup variant="contained" aria-label="button group">
                <TextField
                  fullWidth
                  disabled
                  label="Player"
                  color="secondary"
                  name={`player-${index}`}
                  value={v.name}
                />
                <Button color="secondary">W</Button>
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
