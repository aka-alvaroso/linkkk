import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import { ArrowLeftIcon } from "lucide-react";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-primary text-white py-12 flex justify-center overflow-auto">
      <div className="flex flex-col items-start gap-4 max-w-4xl px-4">
        <div className="w-full flex items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-yellow font-brice">
            Términos y Condiciones
          </h1>
          <Button
            variant="yellow_reverse"
            size="md"
            onClick={() => {
              navigate("/");
            }}
            className="flex items-center gap-2 mt-4 ml-auto"
          >
            <ArrowLeftIcon size={20} />
            <span className="ml-2">Volver</span>
          </Button>
        </div>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          1. Descripción del Servicio
        </h4>
        <p className="text-md">
          Linkkk (en adelante, "el Servicio"), accesible a través de
          https://linkkk.dev, es una plataforma que ofrece herramientas para el
          acortamiento y gestión de enlaces URL, generación de códigos QR
          (principalmente para usuarios PRO) y provisión de estadísticas de uso
          de dichos enlaces. El Servicio puede ser utilizado de forma limitada
          sin necesidad de crear una cuenta de usuario.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          2. Cuentas de Usuario y Niveles de Acceso
        </h4>
        <p className="text-md">
          El Servicio ofrece diferentes niveles de acceso:
        </p>
        <ul className="list-disc list-inside space-y-2 text-md">
          <li>
            <strong>Usuarios Invitados (sin cuenta):</strong> Pueden crear un
            máximo de 10 enlaces. Estos enlaces expirarán automáticamente a los
            7 días desde su fecha de creación.
          </li>
          <li>
            <strong>Usuarios Registrados (Plan Gratuito):</strong>
            <ul className="list-disc list-inside ml-6 space-y-1 text-md">
              <li>Generación de hasta 50 enlaces.</li>
              <li>
                Los enlaces creados no tienen fecha de expiración automática.
              </li>
              <li>Acceso al panel de estadísticas de sus enlaces.</li>
              <li>Creación de hasta un máximo de 5 grupos de enlaces.</li>
              <li>
                Creación de hasta un máximo de 15 etiquetas para organizar sus
                enlaces.
              </li>
              <li>
                Acceso limitado a la API Pública (hasta 100 peticiones por día).
              </li>
            </ul>
          </li>
          <li>
            <strong>Usuarios PRO:</strong> Acceden a todas las funcionalidades
            avanzadas del Servicio, que incluyen:
            <ul className="list-disc list-inside ml-6 space-y-1 text-md">
              <li>Todo lo incluido en el Plan Gratuito.</li>
              <li>Generación ilimitada de enlaces.</li>
              <li>Generación ilimitada de códigos QR.</li>
              <li>
                Acceso total a la creación avanzada de enlaces, incluyendo
                opciones como protección con contraseña, fechas de expiración
                personalizadas, redirección inteligente basada en criterios (ej.
                geográfico, dispositivo), personalización de metadatos para
                previsualización en redes sociales, y bloqueo de acceso por
                países.
              </li>
              <li>Creación de hasta un máximo de 50 grupos de enlaces.</li>
              <li>
                Creación de hasta un máximo de 100 etiquetas para organizar sus
                enlaces.
              </li>
            </ul>
          </li>
        </ul>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          3. Uso Aceptable y Prohibiciones
        </h4>
        <p className="text-md">
          Los usuarios se comprometen a utilizar el Servicio de manera lícita y
          de acuerdo con estos términos. Queda estrictamente prohibido el uso
          del Servicio para:
        </p>
        <ul className="list-disc list-inside space-y-1 text-md">
          <li>
            Distribuir contenido ilegal, incluyendo, pero no limitado a,
            material que infrinja derechos de autor, incite al odio, sea
            difamatorio o pornográfico infantil.
          </li>
          <li>
            Realizar actividades de phishing o cualquier forma de suplantación
            de identidad.
          </li>
          <li>
            Promover o facilitar estafas, esquemas piramidales o cualquier
            actividad fraudulenta.
          </li>
          <li>
            Distribuir malware, virus, spyware o cualquier software malicioso.
          </li>
          <li>Enviar spam o correo no deseado.</li>
          <li>
            Cualquier actividad relacionada con cibercrimen o que pueda dañar,
            deshabilitar o sobrecargar el Servicio o la infraestructura de
            terceros.
          </li>
        </ul>
        <p className="text-md">
          El titular del Servicio se reserva el derecho de suspender o cancelar
          cuentas y/o enlaces que infrinjan estas prohibiciones sin previo
          aviso.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          4. Modificación y Suspensión del Servicio
        </h4>
        <p className="text-md">
          Álvaro Barbero Roldán se reserva el derecho de modificar, suspender o
          interrumpir el Servicio, total o parcialmente, en cualquier momento,
          con o sin previo aviso, por razones de mantenimiento, seguridad,
          actualización o cualquier otra causa justificada. No seremos
          responsables ante usted ni ante terceros por ninguna modificación,
          suspensión o interrupción del Servicio.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          5. Garantía y Responsabilidad
        </h4>
        <p className="text-md">
          El Servicio se proporciona "tal cual" y "según disponibilidad". Aunque
          se realizarán esfuerzos razonables para asegurar que el Servicio
          funcione correctamente y esté disponible la mayor parte del tiempo, no
          se garantiza un funcionamiento ininterrumpido, libre de errores o
          seguro. Álvaro Barbero Roldán no será responsable por daños directos o
          indirectos derivados del uso o la imposibilidad de uso del Servicio.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          6. Propiedad Intelectual
        </h4>
        <p className="text-md">
          El nombre "Linkkk", el logotipo, el diseño del sitio web, el código
          fuente y todos los contenidos generados por el titular son propiedad
          de Álvaro Barbero Roldán y están protegidos por las leyes de propiedad
          intelectual e industrial. El diseño de la web ha sido inspirado por
          fuentes externas (ej. Dribbble) pero ha sido modificado y adaptado,
          considerándose el resultado final como obra propia. No se concede
          ninguna licencia de uso sobre dichos elementos más allá de la
          necesaria para el uso del Servicio.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          7. Ley Aplicable y Jurisdicción
        </h4>
        <p className="text-md">
          Estos Términos y Condiciones se regirán e interpretarán de acuerdo con
          la legislación española. Para la resolución de cualquier controversia
          que pudiera surgir en relación con la interpretación o ejecución de
          estos términos, ambas partes se someten expresamente a la jurisdicción
          de los Juzgados y Tribunales de la ciudad de Córdoba, España,
          renunciando a cualquier otro fuero que pudiera corresponderles.
        </p>

        <p className="text-md pt-4">
          Última actualización: [Fecha de Actualización]
        </p>
      </div>
    </div>
  );
}
