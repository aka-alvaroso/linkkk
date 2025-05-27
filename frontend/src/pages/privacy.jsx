import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import { ArrowLeftIcon } from "lucide-react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-primary text-white py-12 flex justify-center overflow-auto">
      <div className="flex flex-col items-start gap-4 max-w-4xl px-4">
        <div className="w-full flex items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-yellow font-brice">
            Política de Privacidad
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

        <p className="text-md pt-2">
          Fecha de última actualización: [Fecha de Actualización]
        </p>

        <p className="text-md">
          Bienvenido a Linkkk (https://linkkk.dev). Su privacidad es importante
          para nosotros. Esta Política de Privacidad explica cómo Álvaro Barbero
          Roldán ("nosotros", "nuestro") recopila, utiliza, divulga y protege su
          información personal cuando utiliza nuestro sitio web y servicios.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          1. Responsable del Tratamiento de Datos
        </h4>
        <p className="text-md">
          El responsable del tratamiento de sus datos personales es:
        </p>
        <ul className="list-none space-y-1 text-md">
          <li>
            <strong>Titular:</strong> Álvaro Barbero Roldán
          </li>
          <li>
            <strong>NIF:</strong> 31******N
          </li>
          <li>
            <strong>Domicilio:</strong> CH3, Córdoba, España
          </li>
          <li>
            <strong>Correo Electrónico de Contacto:</strong>{" "}
            aka.alvaroso@gmail.com
          </li>
        </ul>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          2. Información que Recopilamos
        </h4>
        <p className="text-md">
          Recopilamos diferentes tipos de información para proporcionar y
          mejorar nuestro Servicio:
        </p>
        <ul className="list-disc list-inside space-y-2 text-md">
          <li>
            <strong>Información de Registro de Cuenta:</strong> Cuando crea una
            cuenta en Linkkk, le solicitamos información como su nombre de
            usuario, dirección de correo electrónico y una contraseña (que se
            almacena de forma segura utilizando técnicas de hashing).
          </li>
          <li>
            <strong>Información de Creación de Enlaces:</strong> Cuando crea un
            enlace acortado, almacenamos el enlace original y lo asociamos a su
            ID de usuario (si está registrado) o a una identificación de sesión
            (si es un usuario invitado).
          </li>
          <li>
            <strong>Información de Uso de Enlaces (Clics):</strong> Cuando
            alguien hace clic en un enlace gestionado por Linkkk, recopilamos:
            <ul className="list-disc list-inside ml-6 space-y-1 text-md">
              <li>Dirección IP del usuario que realiza el clic.</li>
              <li>
                País de origen (inferido a partir de la dirección IP, utilizando
                servicios como IPAPI).
              </li>
              <li>
                Información sobre si se está utilizando una VPN (detectada a
                través de servicios externos como IPAPI).
              </li>
              <li>
                User Agent del navegador (para identificar el tipo de
                dispositivo, sistema operativo y navegador).
              </li>
              <li>Fecha y hora del clic.</li>
            </ul>
          </li>
          <li>
            <strong>Información del Plan PRO:</strong> Si se suscribe al Plan
            PRO, recopilamos información relacionada con su suscripción, como el
            tipo de plan. Los pagos son procesados por Stripe, y no almacenamos
            directamente los detalles de su tarjeta de crédito. Podemos
            almacenar un identificador de cliente de Stripe y la fecha de
            inicio/fin de la suscripción para gestionar su cuenta.
          </li>
        </ul>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          3. Cómo Usamos su Información
        </h4>
        <p className="text-md">
          Utilizamos la información recopilada para diversos fines:
        </p>
        <ul className="list-disc list-inside space-y-1 text-md">
          <li>Para proporcionar, operar y mantener nuestro Servicio.</li>
          <li>Para mejorar, personalizar y ampliar nuestro Servicio.</li>
          <li>Para comprender y analizar cómo utiliza nuestro Servicio.</li>
          <li>
            Para desarrollar nuevos productos, servicios, características y
            funcionalidades.
          </li>
          <li>
            Para comunicarnos con usted, ya sea directamente o a través de uno
            de nuestros socios, incluso para servicio al cliente, para
            proporcionarle actualizaciones y otra información relacionada con el
            Servicio, y con fines de marketing y promoción (con su
            consentimiento previo cuando sea necesario).
          </li>
          <li>
            Para procesar sus transacciones (por ejemplo, suscripciones al Plan
            PRO a través de Stripe).
          </li>
          <li>
            Para generar estadísticas agregadas y anónimas sobre el uso de los
            enlaces.
          </li>
          <li>Para prevenir el fraude y el abuso de nuestros servicios.</li>
          <li>Para cumplir con obligaciones legales.</li>
        </ul>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          4. Formularios de Contacto
        </h4>
        <p className="text-md">
          Actualmente, Linkkk no dispone de formularios de contacto integrados
          en el sitio web. Para cualquier consulta, puede contactarnos
          directamente a través de la dirección de correo electrónico
          proporcionada: aka.alvaroso@gmail.com.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          5. Compartir Información con Terceros
        </h4>
        <p className="text-md">
          No vendemos su información personal. Podemos compartir su información
          con terceros proveedores de servicios solo en las siguientes
          circunstancias y para los fines que se describen a continuación:
        </p>
        <ul className="list-disc list-inside space-y-1 text-md">
          <li>
            <strong>Alojamiento Web (VPS):</strong> Nuestro sitio web está
            alojado en un Servidor Privado Virtual (VPS). El proveedor del VPS
            puede tener acceso a datos del servidor como parte de sus servicios
            de mantenimiento y seguridad, pero está obligado contractualmente a
            mantener la confidencialidad y seguridad de dichos datos.
          </li>
          <li>
            <strong>Procesamiento de Pagos (Stripe):</strong> Utilizamos Stripe
            para procesar los pagos de las suscripciones al Plan PRO. Cuando
            realiza un pago, proporciona su información de pago directamente a
            Stripe. La política de privacidad de Stripe se aplicará a la
            información que les proporcione. Nosotros no almacenamos los datos
            completos de su tarjeta de crédito.
          </li>
          <li>
            <strong>Servicios de Información de IP (IPAPI u otros):</strong>{" "}
            Utilizamos servicios como IPAPI para obtener información geográfica
            (país) y detectar el uso de VPN a partir de las direcciones IP de
            los usuarios que hacen clic en los enlaces. Estos servicios tienen
            sus propias políticas de privacidad.
          </li>
          <li>
            <strong>Comunicaciones por Correo Electrónico:</strong> Actualmente,
            no utilizamos servicios de terceros para el envío masivo de correos
            electrónicos con fines de marketing. Cualquier comunicación por
            correo electrónico se realizará directamente para asuntos
            relacionados con su cuenta o el servicio.
          </li>
          <li>
            <strong>Cumplimiento Legal:</strong> Podemos divulgar su información
            si así lo exige la ley o en respuesta a solicitudes válidas de
            autoridades públicas (por ejemplo, un tribunal o una agencia
            gubernamental).
          </li>
        </ul>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          6. Seguridad de los Datos
        </h4>
        <p className="text-md">
          La seguridad de su información es importante para nosotros.
          Implementamos medidas de seguridad técnicas y organizativas razonables
          para proteger su información personal contra el acceso no autorizado,
          la alteración, la divulgación o la destrucción. Sin embargo, ningún
          método de transmisión por Internet o de almacenamiento electrónico es
          100% seguro, por lo que no podemos garantizar su seguridad absoluta.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          7. Sus Derechos de Protección de Datos (ARCOPOL)
        </h4>
        <p className="text-md">
          De acuerdo con la normativa de protección de datos aplicable, usted
          tiene los siguientes derechos:
        </p>
        <ul className="list-disc list-inside space-y-1 text-md">
          <li>
            <strong>Derecho de Acceso:</strong> A solicitar y obtener
            información sobre los datos personales que tenemos sobre usted.
          </li>
          <li>
            <strong>Derecho de Rectificación:</strong> A solicitar la corrección
            de datos personales inexactos o incompletos.
          </li>
          <li>
            <strong>Derecho de Supresión (Olvido):</strong> A solicitar la
            eliminación de sus datos personales cuando, entre otros motivos, ya
            no sean necesarios para los fines para los que fueron recogidos.
          </li>
          <li>
            <strong>Derecho de Oposición:</strong> A oponerse al tratamiento de
            sus datos personales en determinadas circunstancias.
          </li>
          <li>
            <strong>Derecho a la Limitación del Tratamiento:</strong> A
            solicitar la limitación del tratamiento de sus datos en determinadas
            circunstancias.
          </li>
          <li>
            <strong>Derecho a la Portabilidad de los Datos:</strong> A recibir
            sus datos personales en un formato estructurado, de uso común y
            lectura mecánica, y a transmitirlos a otro responsable del
            tratamiento.
          </li>
        </ul>
        <p className="text-md">
          Para ejercer estos derechos, puede contactarnos en
          aka.alvaroso@gmail.com, adjuntando una copia de su documento de
          identidad para verificar su identidad.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          8. Privacidad de los Niños
        </h4>
        <p className="text-md">
          Nuestro Servicio no está dirigido a personas menores de 14 años (o la
          edad mínima aplicable en su jurisdicción). No recopilamos
          conscientemente información personal identificable de niños. Si es
          padre o tutor y sabe que su hijo nos ha proporcionado información
          personal, contáctenos. Si nos damos cuenta de que hemos recopilado
          información personal de niños sin verificación del consentimiento de
          los padres, tomamos medidas para eliminar esa información de nuestros
          servidores.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          9. Cambios en esta Política de Privacidad
        </h4>
        <p className="text-md">
          Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le
          notificaremos cualquier cambio publicando la nueva Política de
          Privacidad en esta página y actualizando la "Fecha de última
          actualización" en la parte superior. Se le aconseja revisar esta
          Política de Privacidad periódicamente para cualquier cambio. Los
          cambios a esta Política de Privacidad son efectivos cuando se publican
          en esta página.
        </p>

        <h4 className="text-2xl font-bold text-yellow font-brice pt-4">
          10. Contacto
        </h4>
        <p className="text-md">
          Si tiene alguna pregunta sobre esta Política de Privacidad, puede
          contactarnos en:
        </p>
        <p className="text-md">
          Álvaro Barbero Roldán
          <br />
          aka.alvaroso@gmail.com
        </p>
      </div>
    </div>
  );
}
