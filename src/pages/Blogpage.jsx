import {
  Await,
  Link,
  defer,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { BlogFilter } from "../components/BlogFilter";
import { Suspense } from "react";

const Blogpage = () => {
  const { posts } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get("post") || "";
  const latest = searchParams.has("latest");

  const startsFrom = latest ? 80 : 1;

  return (
    <div>
      <h1>Our news</h1>

      <BlogFilter
        postQuery={postQuery}
        latest={latest}
        setSearchParams={setSearchParams}
      />

      <Link
        to="/posts/new"
        style={{ margin: "1rem 0", display: "inline-block" }}
      >
        Add new post
      </Link>

      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={posts}>
          {(resolvedPosts) => {
            const filteredPosts = resolvedPosts.filter(
              (post) => post.title.includes(postQuery) && post.id >= startsFrom
            );

            return filteredPosts.length > 0 ? (
              <ul>
                {filteredPosts.map((post) => (
                  <Link key={post.id} to={`/posts/${post.id}`}>
                    <li>{post.title}</li>
                  </Link>
                ))}
              </ul>
            ) : (
              <p>No posts found with the provided query.</p>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

const blogLoader = async () => {
  return defer({
    posts: getPosts(),
  });
};

export { blogLoader };
export default Blogpage;
