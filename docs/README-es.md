*Lee la documentación en otro idioma: [English](./README-en.md)*
# Introducción
Este proyecto es parte de mis prácticas en Alten. Es un proyecto en React Native en el que tenemos que implementar desde cero algunas características, también tenemos la libertad de añadir características personalizadas, como lo hago yo.
# Decisiones
## Alten Hybrid API
### Axios o Fetch
He investigado sobre los estos dos métodos para hacer peticiones, encontré que Axios, a diferencia de Fetch, puede ser usado en una amplia gama de dispositivos, además facilita las peticiones permitiendo la creación de diferentes instancias con ajustes predeterminados. Así que elegí Axios.
## Almacenamiento de datos
En el momento de recibir esta decisión lo primero que pensé fue en usar AsyncStorage, esto es porque AsyncStorage es más simple y funciona mejor con pocas cantidades de datos (siendo este un projecto pequeño), pero cuando entré en la página de la documentación me percaté de que AsyncStorage está en desuso, así que para utilizar un servicio de almacenamiento de datos actual elegí SQLite. De todos modos desinstalé SQLite, ya que he pensado que no esta necesario todavía, no podemos tener código que no usamos.
# Ejercicios
## Gestores de paquetes
### Windows
1. El primer paso para la instalación de nvm es desinstalar la versión local de Node.
2. Después tenemos que descargar ```nvm-setup.exe``` de su repositorio original de [GitHub](https://github.com/coreybutler/nvm-windows), cuando se descarge solo tienes que ejecutarlo.
3. Para usarlo, tenemos que abrir como administrador un PowerShell, para instalar las versiones 18 y lts, tenemos que ejecutar lo siguiente:
    - ```nvm install 18.0.0```
    - ```nvm install lts```
4. Para usar la versión lts, tenemos que ejecutar: ```nvm use lts```.
### Linux
1. El primer paso para la instalación de nvm es desinstalar la versión local de Node.
2. Después tenemos que abrir una terminal y ejecutar ```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash```, como puede estar desactualizado, deberías de visitar el repositorio original en [Github](https://github.com/nvm-sh/nvm).
3. Para usarlo, tenemos que abrir como administrador un PowerShell, para instalar las versiones 18 y lts, tenemos que ejecutar lo siguiente:
    - ```nvm install 18.0.0```
    - ```nvm install --lts```
4. Para usar la versión lts, tenemos que ejecutar: ```nvm use --lts```.
# Recursos
- [Colores usados en el proyecto](https://colorhunt.co/palette/22283131363f76abaeeeeeee)