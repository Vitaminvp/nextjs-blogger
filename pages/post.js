import Header from "../components/header";
import { Card, CardHeader, CardText } from "material-ui/Card";
import "isomorphic-fetch";
import RaisedButton from "material-ui/RaisedButton";
import Link from "next/link";
import withMaterialUI from "../share/MUI/withMUI";

const Post = ({ title, content }) => (
  <div>
    <Header />
    <h2>{title}</h2>
    <Card>
      <CardHeader title={title} />
      <CardText>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Link href="/" as="/blog">
          <a>
            <RaisedButton label="Go back to blog!" fullWidth={true} />
          </a>
        </Link>
      </CardText>
    </Card>
  </div>
);

Post.getInitialProps = async ({ query: { id } }) => {
  const response = await fetch(
    `${process.env.BLOGGER_URL}/${id}?key=${process.env.API_KEY}`
  );
  const data = await response.json();
  const title = data.title;
  const content = data.content;
  return { title, content };
};

export default withMaterialUI(Post);
