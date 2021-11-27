import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import User from "./User";
const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Foods",
    path: "/foods",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Gallery",
    path: "/gallery",
  },
];

const Item = ({ name, path }) => (
  <Box component="li" className={style.navItem}>
    <Link to={path}>{name}</Link>
  </Box>
);
function Navbar() {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      component="nav"
      display={isMD ? "flex" : "block"}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box component="ul" className={style.nav}>
        {links.map(({ name, path }) => (
          <Item key={name} name={name} path={path} />
        ))}
      </Box>
      {isMD && <User />}
    </Box>
  );
}
export default Navbar;
