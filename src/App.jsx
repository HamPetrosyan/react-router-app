import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";

import { blogLoader } from "./pages/Blogpage";
import { singleLoader } from "./pages/Singlepage";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";

const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/Aboutpage"));
const Blogpage = lazy(() => import("./pages/Blogpage"));
const Createpost = lazy(() => import("./pages/Aboutpage"));
const Editpost = lazy(() => import("./pages/Editpost"));
const Singlepage = lazy(() => import("./pages/Singlepage"));
const Notfoundpage = lazy(() => import("./pages/Notfoundpage"));
const LoginPage = lazy(() => import("./pages/Loginpage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="about/*" element={<About />}>
        <Route path="contacts" element={<p>Our contacts</p>} />
        <Route path="team" element={<p>Our team</p>} />
      </Route>
      <Route path="about-us" element={<Navigate to="/about" replace />} />
      <Route path="posts" element={<Blogpage />} loader={blogLoader} />
      <Route path="posts/:id" element={<Singlepage />} loader={singleLoader} />
      <Route
        path="posts/:id/edit"
        element={
          <RequireAuth>
            <Editpost />
          </RequireAuth>
        }
      />
      <Route
        path="posts/new"
        element={
          <RequireAuth>
            <Createpost />
          </RequireAuth>
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<Notfoundpage />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
