import { Outlet } from "react-router-dom";
import { CustomLink } from "./CustomLink";
import { Suspense } from "react";

const Layout = () => {
  return (
    <>
      <header>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/posts">Blog</CustomLink>
        <CustomLink to="/about">About</CustomLink>
      </header>

      <main className="container">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="container">
        &copy; ReactRouter Tutorials {new Date().getFullYear()}
      </footer>
    </>
  );
};

export { Layout };
