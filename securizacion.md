# Frontend ------------------------------

- /login : Esta ruta lleva a la página de inicio de sesión donde los usuarios pueden ingresar sus credenciales para acceder a la aplicación.
  · Para acceder a esta ruta no necesitas token, tampoco te crearía uno de invitado.

- /register : Esta ruta lleva a la página de registro donde los nuevos usuarios pueden crear una cuenta..
  · Para acceder a esta ruta no necesitas token, tampoco te crearía uno de invitado.

- /r/:shortCode : Esta ruta se utiliza para redirigir a los usuarios a una URL larga a partir de un código corto proporcionado en la URL..
  · Para acceder a esta ruta no necesitas token, tampoco te crearía uno de invitado.

- /links : Esta ruta muestra la página de "Mis Enlaces", donde los usuarios pueden ver y gestionar sus enlaces creados.
  · Para acceder a esta ruta necesitas un token de cualquier tipo, en caso de no tenga token, crearía uno de invitado automáticamente antes de mostrar los enlaces. En la lista de enlaces, si eres invitado no podrás acceder a algunas opciones redirigiéndote a iniciar sesión.

- / : Esta es la ruta principal o de inicio que lleva a la página de inicio de la aplicación.
  · Para acceder a esta ruta no necesitas token, tampoco te crearía uno de invitado a menos que, intentes crear un enlace acortado en un input que tiene para ello, que, si lo haces, te crearía un token de invitado antes de crearlo.

- /dashboard/:shortCode : Esta ruta lleva a la página del panel de control de un enlace específico, donde los usuarios pueden ver estadísticas y detalles del enlace.
  · Para acceder a esta ruta necesitarás un token de usuario, si no lo tienes, te redirigirá al login.

- /groups : Esta ruta lleva a la página de gestión de grupos, donde los usuarios pueden crear y gestionar grupos de enlaces.
  · Para acceder a esta ruta necesitarás un token de usuario, si no lo tienes, te redirigirá al login.

- /tags : Esta ruta lleva a la página de gestión de etiquetas, donde los usuarios pueden crear y gestionar etiquetas para sus enlaces.
  · Para acceder a esta ruta necesitarás un token de usuario, si no lo tienes, te redirigirá al login.

- /links/create : Esta ruta lleva a la página de creación de enlaces, donde los usuarios pueden crear un nuevo enlace corto.
  · Para acceder a esta ruta no necesitas token, aunque, si intentas crear un enlace, te creará un token de invitado antes, por otro lado, si intentas acceder a la creación de enlaces avanzada, necesitarías tener un token de invitado, si no lo tienes, te enviaría al login.

- /:shortCode : Similar a /r/:shortCode , esta ruta también se utiliza para redirigir a los usuarios a una URL larga a partir de un código corto.
  · No necesitarás token ni te crearía uno de invitado.

- /notfound : Esta ruta lleva a la página de error 404, que se muestra cuando una página solicitada no se encuentra.
  · Tampoco necesitarías token ni crearía uno.

- - : Esta es una ruta comodín que captura cualquier ruta no definida y redirige a la página de error 404.
    · Tampoco necesitarías token ni crearía uno.

# Backend ------------------------------

- /link/create : Esta ruta se utiliza para crear un nuevo enlace corto. Puede ser utilizada tanto en la página de inicio como en la página de creación de enlaces.
  · Para crear un enlace necesitarás un token, ya sea de invitado o de usuario.

- /link/:shortCode : Esta ruta se utiliza para obtener un enlace específico mediante su código corto. Se utiliza en la redirección y en el panel de control del enlace.
  · Para recuperar la información de un enlace no necesitarías un token, ya que, como se utiliza para la redirección, sería una ruta pública aunque se utilice también en sitios como, la dashboard. Es la ruta que más dudas me da porque se utiliza tanto en sitios públicos como la redirección como en sitios "privados" como en la dashboard.

TODO: /link/:shortCode/details : Protegida, accesible solo para usuarios, usada en la dashboard.

- /link/user/:userId : Esta ruta se utiliza para obtener todos los enlaces de un usuario específico. Se utiliza en la página "Mis Enlaces".
  · Para obtener los enlaces de un usuario necesitarías un token de invitado o de usuario. También me produce dudas como la anterior aunque menos, porque en esta sí necesitas, al menos, el token de invitado.

- /link/stats/:shortCode : Esta ruta se utiliza para obtener las estadísticas de un enlace específico. Se utiliza en el panel de control del enlace.
  · Para recuperar las estadisticas de un enlace necesitarías el token de usuario, ya que, sólo se utilizaría en la dashboard.

- /link/:id (PUT) : Esta ruta se utiliza para actualizar un enlace existente. Se utiliza en la edición de enlaces y en el panel de control del enlace.
  · Para actualizar un enlace, necesitarías un token de usuario, porque invitados no pueden editar sus enlaces.

- /link/:id (DELETE) : Esta ruta se utiliza para eliminar un enlace existente. Se utiliza en el panel de control del enlace y en la página "Mis Enlaces".
  · Para borrar un enlace, necesitarías un token de invitado o de usuario. (En caso de invitado, también se actualizaría su sesión para restarle en uno sus enlaces activos)

- /access/create : Esta ruta se utiliza para registrar un nuevo acceso a un enlace.
  · Para crear un acceso a un enlace no necesitarías token ya que se utiliza en la redirección.

- /auth/guest (POST) : Esta ruta se utiliza para crear una nueva sesión de invitado.
  · Para crear un token de invitado obviamente no necesitarías token.

- /auth/guest (PUT) : Esta ruta se utiliza para actualizar una sesión de invitado existente.
  · Para actualizar una sesión de invitado (tengo una columna con el num de links activos y cada vez que crea uno lo actualiza hasta que llegue 10) necesitarías el token de invitado.

- /auth/guest (DELETE) : Esta ruta se utiliza para eliminar una sesión de invitado.
  · Para eliminar una sesión de invitado necesitarías un token de invitado y puede que uno de usuario, ya que, esta ruta se utilizaría cuando un invitado se registra.

- /auth/register : Esta ruta se utiliza para registrar un nuevo usuario.
  · Para esta ruta no necesitarías token.

- /auth/login : Esta ruta se utiliza para autenticar a un usuario y generar un token de acceso.
  · Para esta ruta no necesitarías token.

- /user/:id (GET) : Esta ruta se utiliza para obtener la información de un usuario específico.
  · Para esta ruta necesitarías un token de usuario.

- /user/:id (PUT) : Esta ruta se utiliza para actualizar la información de un usuario específico.
  · Para actualizar un usuario necesitarías un token de usuario

- /user/:id (DELETE) : Esta ruta se utiliza para eliminar un usuario específico.
  · Para eliminar un usuario, necesitarás un token de usuario.

- /tag/create : Esta ruta se utiliza para crear una nueva etiqueta.
  · Para crear un tag necesitarás un token de usuario, porque los invitados no tendrán acceso a esta funcionalidad.

- /tag/update : Esta ruta se utiliza para actualizar una etiqueta existente.
  · Para actualizar un tag necesitarás un token de usuario.

- /tag/delete : Esta ruta se utiliza para eliminar una etiqueta existente.
  · Para eliminar un tag necesitarás un token de usuario.

- /tag/user/:userId : Esta ruta se utiliza para obtener todas las etiquetas de un usuario específico.
  · Para recuperar los tags de un usuario necesitarás un token de usuario.

- /group/create : Esta ruta se utiliza para crear un nuevo grupo.
  · Para crear un grupo necesitarás un token de usuario, porque los invitados no tendrán acceso a esta funcionalidad.

- /group/update : Esta ruta se utiliza para actualizar un grupo existente.
  · Para actualizar un grupo necesitarás un token de usuario.

- /group/delete : Esta ruta se utiliza para eliminar un grupo existente.
  · Para eliminar un gruponecesitarás un token de usuario.

- /group/user/:userId : Esta ruta se utiliza para obtener todas las etiquetas de un usuario específico.
  · Para recuperar los grupos de un usuario necesitarás un token de usuario.

<!-- Middlewares -->

<!-- Log -->

1. Cambiado el endpoint de login para que devuelva un seteo de cookie del token, quitado la devolucion del usuario. ✅
2. Desde el frontend, se ha cambiado la petición de recuperar los links del usuario para que use la cookie del token. ✅
3. Modificado el contexto de auth añadiendo un estado para saber si el usuario está logueado o no con la nueva cookie. ✅
4. Moficicado el contexto de auth cambiando las funcoines de comprobación de login y efecto inicial. ✅
5. Modificado el componente de login para que use la nueva funcion de login y que muestre un error si ocurre algun error. ✅
6. Modificada la navbar para que use el contexto de auth con el nuevo estado de login. ✅
7. Creado middleware que indentifica si se está usando un token de invitado o de usuario. ✅
8. Editado el endpoint de CreateLink para que, use el nuevo middleware de autenticación, tenga en cuenta que el usuario es invitado, comprobar su límite de enlaces y eliminar los enlaces caducados. ✅
9. Modificado el componente de CreateLink para que envíe la cookie al crear enlace. ✅
10. Modificados los endpoints de los enlaces para que implementen el middleware de autenticación. ✅
11. Añadidos middlewares para autenticar invitados y usuarios. ✅
12. Modificados los endpoints de comprobación de sesión de invitado y sesiónn de usuario para usar los nuevos middlewares. ✅
13. Mofidicado el componente e MyLinks para que muestre el número de resultados y que pille la cookie de invitado al hacer una petición. ✅
14. Modificado el componente de MyLinks para que use el nuevo middleware de autenticación. ✅
15. Modificao el componente de dashboard para que admita el nuevo middleware de autenticación. ✅
16. Modificados los endpoints de grupos para que usen el nuevo middleware de autenticación. ✅
17. Modificados los componentes de grupos para que usen el nuevo middleware de autenticación. ✅
18. Modificados los endpoints de etiquetas para que usen el nuevo middleware de autenticación. ✅
19. Modificados los componentes de etiquetas para que usen el nuevo middleware de autenticación. ✅
20.
