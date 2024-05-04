import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Editpost = () => {
  const { id } = useParams();
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit post {id}</h1>
      <button onClick={() => signout(() => navigate("/", { replace: true }))}>
        Log Out
      </button>
    </div>
  );
};

export default Editpost;
