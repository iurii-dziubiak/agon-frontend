import {GameList} from "../functions/ImageList/GameList";
import {Grid} from "@mui/material";

const Home = () => {
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
            <GameList />
        </Grid>
    );
};

export default Home;