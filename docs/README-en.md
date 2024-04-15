*Read the documentation in another language: [Español](./README-es.md)*
# Introduction
This project is part of my practice in Alten. It's a React Native project in which we have to implement from scratch some features, also we have the freedom to add any custom feature, as I'm doing.
# Decisions
## Alten Hybrid API
### Axios or Fetch
I researched about these two methods of making petitions to the API, I found out that Axios, unlike Fetch, can be used on a wide range of devices, also facilitate petitions by allowing the creations of differents instances with default settings. So I choosed Axios.
## Data storage
### SQLite or AsyncStorage
Upon receipt of this decision I first thought about use AsyncStorage, this is because AsyncStorage is simpler and works better with a small amount of data (being this an small project), but when I entered to the documentation page I realised that AsyncStorage is deprecated, so to use an actual data storage service I choosed SQLite. However I uninstalled SQLite because I thought it wasn't necesary yet, we musn't have code we don't use.
# Exercises
## Package Manager
### Windows
1. The first step for nvm installation is uninstalling the local version of Node.
2. Then we download ```nvm-setup.exe``` from it's original repository on [GitHub](https://github.com/coreybutler/nvm-windows), when downloaded just execute it.
3. To use it, we must open as administrator a PowerShell, for installing 18 and lts version, we have to run the following:
    - ```nvm install 18.0.0```
    - ```nvm install lts```
4. To use lts version, we have to run: ```nvm use lts```.
### Linux
1. The first step for nvm installation is uninstalling the local version of Node.
2. Then we open a terminal and run ```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash```, because of it being outdate, you should visit their original repository on [Github](https://github.com/nvm-sh/nvm).
3. To use it, we must open a new terminal, for installing 18 and lts version, we have to run the following:
    - ```nvm install 18.0.0```
    - ```nvm install --lts```
4. To use lts version, we have to run: ```nvm use --lts```.
# Resources
- [Colors used in the project](https://colorhunt.co/palette/22283131363f76abaeeeeeee)