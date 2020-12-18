# Rest Api Platzi Videos Auth
Authentication 

### JWT
> Es un estándar de la industria que nos permite manejar demandas de información entre dos clientes.

Consta de tres partes generalmente divididas por punto.

#### Header

Tiene 2 atributos:

* El tipo que en este caso siempre debe ser JWT
* El algoritmo de encriptación de la firma
+ Asíncrono
  + Usan dos llaves de encriptación
    + Privada: Desencripta     
    + Pública: Encripta
  + Se deben usar donde en partes públicas que puedan tener acceso a esta llave
+ Síncrono
  + Usa la misma llave para
    + Encriptar
    + Desencriptar
  + Sólo se deben usar en el Backend

#### Payload

Guarda toda la información de:

  + Usuarios
  + Scopes de autorización,
  + Se componen de Claims
    + Se representan por tres letras para mantener el JSon muy pequeño
    + Tipos de Claims
      + Registered Claims (Tienen una defección propia y deben respetarse)
      + Public Claims (Son una lista que pueden usar y están definidos)
      + Private Claims (Son los que uno mismo defina para la aplicación)

#### Signature

Hace poderoso al JWT y se compone por:

  + Header codificado
  + Payload codificado
  +  Se emplea un Secret

#### Autenticación tradicional 
- Se crea una sesión y el ID de esa sesión se almacena en una cookie del navegador.
- Todos lo request tienen la cookie que tiene almacenada el id y la sesión y esta 
es uasada para verificar la sesión previamente activa.
- Las SPA tienen problemas porque no refrescan por lo cual no saben si hubo cambios en la sesión.
- Por definición las REST API no deberian tener estado.
- El control de acceso siempre requiere que vayamos a bases de datos.
- Genera más consumo de memoria por cada cliente que se conecta.

#### Autenticación con JWT
- Firmamos un token y este se guarda en el navegador en un cookie o en memoria.
- Todos los request llevan este token.
- Permite a una SPA actualizarse sin refrescar la ventana. 
- Por lo cual ya no requiere del backend para saber si el usuario esta autenticado o que permisos tiene.
- El backend puede recibir request de multiples clientes y lo unico que le interesa es saber si el token está bien firmado.

#### Firmar JWT
Para firmar nuestro token utilizaremos un paquete de node llamado jsonwebtoken y al usarlo en nuestro código se verá de esta manera:

```javascript
jwt.sign({ sub: user.id }, 'secret', options);
```
El primer atributo que recibe es el payload o sea los datos que guardaremos en ese token. De segundo atributo recibe una clave secreta con la cual será firmado y finalmente podremos pasarle opciones si es nuestro caso.

#### Verificar JWT

```javascript
jwt.verify(token, 'secret', function(err, decoded){});
```
El primer argumento es el token a verificar.
El segundo argumento es la clave secreta.
El tercer argumento y de manera opcional recibimos un callback que nos retorna el jwt decodificado.

### Buenas practicas con JSON Web token

#### Evitar almacenar información sensible
Debido a que los JSON Web tokens son decodificables es posible visualizar la información del payload, por lo que ningún tipo de información sensible debe ser expuesto como contraseñas, keys, etc. Tampoco debería agregarse información confidencial del usuario como su numero de identificación o información medica, ya que como hablamos anteriormente, los hackers pueden usar esta información para hacer ingeniería social.

##### Mantener su peso lo más liviano posible
Suele tenerse la tentación de guardar toda la información del perfil en el payload del JWT, pero esto no debería hacerse ya que necesitamos que el JWT sea lo más pequeño posible debido a que al enviarse con todos los request estamos consumiendo parte del ancho de banda.

#### Establecer un tiempo de expiración corto
Debido a que los tokens pueden ser robados si no se toman las medidas correctas de almacenamiento seguro, es muy importante que estos tengan unas expiración corta, el tiempo recomendado es desde 15 minutos hasta un maximo de 2 horas.

#### Tratar los JWT como tokens opacos
Aunque los tokens se pueden decodificar, deben tratarse como tokens opacos, es decir como si no tuviesen ningún valor legible. Esto es porque desde el lado del cliente no tenemos manera de verificar si la firma es correcta, así que si confiamos en la información decodificada del token, alguien podría introducir un token invalido con otra información a propósito. Lo mejor, es siempre enviar el token del lado del servidor y hacer las verificaciones allí.

#### ¿Donde guardar los tokens?
Cuando estamos trabajando con SPA (Single Page apps) debemos evitar almacenar los tokens en Local Storage o Session Storage. Estos deben ser almacenados en memoria o en una Cookie, pero solo de manera segura y con el flag httpOnly, esto quiere decir que la cookie debe venir del lado del servidor con el token almacenado. 

#### Silent authenticacion vs Refresh tokens
Debido a que es riesgoso almacenar tokens del lado del cliente, no se deberian usar Refresh Tokens cuando se trabaja solo con una SPA. Lo que se debe implementar es Silent Authentication, para ello se debe seguir el siguiente flujo:

1.- La SPA obtiene un access token al hacer login o mediante cualquier flujo de OAuth.
2.- Cuando el token expira el API retornara un error 401.
3.- En este momento se debe detectar el error y hacer un request para obtener de nuevo un access token.
4.- Si nuestro backend server tiene una sesión valida (Se puede usar una cookie) entonces respondemos con un nuevo access token.

Hay que tener en cuenta que para implementar Silent authentication y Refresh tokens, se require tener un tipo de sesión valida del lado del servidor por lo que en una SPA es posible que sea necesario una especie de backend-proxy, ya que la sesión no debería convivir en el lado del API server.

En el paso 2, si se esta usando alguna librería para manejo de estado como redux, se puede implementar un middleware que detecte este error y proceda con el paso 3.

### Cookies
Una cookie es un archivo creado por un sitio web que tiene pequeños pedazos de datos almacenados en él. Su propósito es identificar al usuario mediante el almacenamiento de su historial.

#### Las cookie session 
Son cookies que tienen un corto periodo de vida ya que son removidas cuando el navegador o la pestaña se cierran.

#### Las persistent cookies 
Se usan generalmente para guardar información de interés para el usuario.

#### Las secure cookies 
Almacenan datos de forma cifradas para que terceros no puedan tener acceso a ellas, se suelen usar en conexiones HTTPS (Conexiones seguras).

Hay leyes sobre cookies que debes seguir al pie de la letra:

  + Avisarle al usuario que estás haciendo uso de cookies en tu sitio para guardar información
  + Es necesario que el usuario de su consentimiento para manejar cookies en tu sitio
