import PostList from "./components/PostList";
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">Post Management Page</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <PostList />
      </Container>
    </>
  );
}

export default App;
