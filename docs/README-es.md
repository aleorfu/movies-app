_Lee la documentación en otro idioma: [English](./README-en.md)_

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

Los gestores de paquetes son herramientas fundamentales en el desarrollo de software moderno, especialmente en entornos de desarrollo web. Su función principal es facilitar la gestión, instalación, actualización y eliminación de dependencias de un proyecto de software.

Tengo que hablar de tres de ellos:

- **npm (Node Package Manager):** npm es el gestor de paquetes por defecto para Node.js, el entorno de ejecución de JavaScript del lado del servidor. Se utiliza para instalar paquetes de código JavaScript disponibles en el registro público de npm. npm también permite a los desarrolladores publicar sus propios paquetes para que otros los utilicen.

- **Yarn:** Yarn es otro gestor de paquetes para JavaScript que se creó para abordar algunas limitaciones percibidas en npm, como la velocidad y la consistencia de las instalaciones. Yarn utiliza un algoritmo de resolución de dependencias más eficiente y realiza instalaciones de paquetes de forma más rápida que npm. Además, Yarn incluye características como la instalación de paquetes en paralelo y la generación de un archivo yarn.lock para garantizar la consistencia en las instalaciones.

- **pnpm:** Similar a Yarn, pnpm es un gestor de paquetes que se enfoca en la eficiencia y la velocidad de instalación. A diferencia de npm y Yarn, pnpm adopta un enfoque de almacenamiento compartido, lo que significa que las dependencias no se duplican en cada proyecto, sino que se almacenan de forma centralizada, lo que puede ahorrar espacio en disco.

Ahora, hablaré de los archivos .lock. Los archivos de bloqueo (como package-lock.json en npm, yarn.lock en Yarn, o pnpm-lock.yaml en pnpm) son archivos generados automáticamente por los gestores de paquetes para garantizar la reproducibilidad de las instalaciones. Contienen información detallada sobre las versiones exactas de todas las dependencias instaladas, junto con sus subdependencias y sus versiones. Esto asegura que, al instalar las dependencias en un entorno diferente o en otro momento, se utilicen exactamente las mismas versiones, evitando así discrepancias que podrían causar problemas de compatibilidad o comportamientos inesperados.

En cuanto a por qué no se deben usar más de un gestor de paquetes por proyecto, la razón principal es la posible inconsistencia en la gestión de dependencias. Cada gestor de paquetes maneja sus propios archivos de bloqueo y algoritmos de resolución de dependencias, lo que podría resultar en conflictos si se utilizan múltiples gestores en un mismo proyecto. Además, esto puede generar confusión y dificultar la colaboración entre desarrolladores, ya que cada uno podría estar más familiarizado con un gestor específico. En resumen, es recomendable elegir un único gestor de paquetes por proyecto y mantener la consistencia en su uso.

### Instalación

#### Windows

1. El primer paso para la instalación de nvm es desinstalar la versión local de Node.
2. Después tenemos que descargar `nvm-setup.exe` de su repositorio original de [GitHub](https://github.com/coreybutler/nvm-windows), cuando se descarge solo tienes que ejecutarlo.
3. Para usarlo, tenemos que abrir como administrador un PowerShell, para instalar las versiones 18 y lts, tenemos que ejecutar lo siguiente:
   - `nvm install 18.0.0`
   - `nvm install lts`
4. Para usar la versión lts, tenemos que ejecutar: `nvm use lts`.

#### Linux

1. El primer paso para la instalación de nvm es desinstalar la versión local de Node.
2. Después tenemos que abrir una terminal y ejecutar `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`, como puede estar desactualizado, deberías de visitar el repositorio original en [Github](https://github.com/nvm-sh/nvm).
3. Para usarlo, tenemos que abrir como administrador un PowerShell, para instalar las versiones 18 y lts, tenemos que ejecutar lo siguiente:
   - `nvm install 18.0.0`
   - `nvm install --lts`
4. Para usar la versión lts, tenemos que ejecutar: `nvm use --lts`.

# Recursos

- [Colores usados en el proyecto](https://colorhunt.co/palette/22283131363f76abaeeeeeee)
