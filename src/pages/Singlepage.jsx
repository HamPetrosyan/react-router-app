import { Suspense } from "react";
import {
  Await,
  Link,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

const Post = () => {
  const post = useAsyncValue();

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};

const Singlepage = () => {
  const navigate = useNavigate();
  const { post, id } = useLoaderData();

  const goBack = () => navigate(-1);
  const goHome = () => navigate("/", { replace: true });

  return (
    <>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={post}>
          <Post />
        </Await>
      </Suspense>

      <Link to={`/posts/${id}/edit`}>Edit this post</Link>

      <div className="button">
        <button onClick={goBack}>Back</button>
        <button onClick={goHome}>Home</button>
      </div>
    </>
  );
};

async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

const singleLoader = async ({ params }) => {
  const id = params.id;

  return defer({ post: getPost(id), id });
};

export { singleLoader };
export default Singlepage;
