import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";

export default function AuthButton({ isLoggedIn, logout }) {
  const navigate = useNavigate();

  if (isLoggedIn) {
    return (
      <Button
        variant="coral"
        size="md"
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="ml-auto py-3"
      >
        Cerrar sesión
      </Button>
    );
  }

  return (
    <Button
      variant="white_reverse"
      size="md"
      onClick={() => {
        navigate("/login");
      }}
      className="ml-auto py-3"
    >
      Iniciar Sesión
    </Button>
  );
}
