import Header from "../components/header";
import withMaterialUI from "../share/MUI/withMUI";
import "isomorphic-fetch";
import { Card, CardText, CardHeader } from "material-ui";
import RaisedButton from "material-ui/RaisedButton";
import Link from "next/link";

const Index = ({ title = "Hello World!!", posts }) => (
  <div>
    <Header />
    <h2>{title}</h2>
    {posts.map(item => (
      <Card key={item.id} style={{ marginBottom: "10px" }}>
        <CardHeader title={item.title} />
        <CardText>
          <Link href={`/post?id=${item.id}`} as={`/blog/${item.id}`}>
            <a>
              <RaisedButton
                label="Read more..."
                fullWidth={true}
                primary={true}
              />
            </a>
          </Link>
        </CardText>
      </Card>
    ))}
  </div>
);
Index.getInitialProps = async () => {
  const response = await fetch(
    `${process.env.BLOGGER_URL}?key=${process.env.API_KEY}`
  );
  const data = await response.json();
  console.log("data", data);
  return { posts: data.items };
};
export default withMaterialUI(Index);
