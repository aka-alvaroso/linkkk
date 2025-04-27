import { useAuth } from "../context/Auth";

function GuestOrUserRoute({ children }) {
  const { authChecked } = useAuth();

  if (!authChecked) {
    return <div>Cargando...</div>;
  }

  return children;
}

export default GuestOrUserRoute;
