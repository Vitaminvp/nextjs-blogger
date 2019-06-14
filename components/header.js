import AppBar from "material-ui/AppBar";

const Header = ({ title = "Next JS" }) => (
  <AppBar title={title} showMenuIconButton={true} />
);

export default Header;
