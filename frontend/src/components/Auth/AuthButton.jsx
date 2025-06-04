import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";

export default function AuthButton({ isLoggedIn, logout }) {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  if (isLoggedIn) {
    return (
      <Button
        variant="coral"
        size="md"
        onClick={() => {
          logout();
          navigate("/login");
          showNotification({
            title: "Sesión cerrada",
            message: "Has cerrado tu sesión con éxito",
            type: "success",
          });
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
