import {Grid} from "@mui/material";
import {TournamentForm} from "../functions/TournamentForm/TournamentForm";

const CreateTournament = () => {
    const gridStyle = {
        minHeight: "80vh"
    };

    return (
        <Grid
            style={gridStyle}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <TournamentForm />
        </Grid>
    );
};

export default CreateTournament;