import Header from "../components/header";
import withMaterialUI from "../share/MUI/withMUI";

const Index = ({title = "Hello World!!"}) => <div>
    <Header/>
    <h2>{title}</h2>
</div>;
export default withMaterialUI(Index);