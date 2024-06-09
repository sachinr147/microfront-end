
## Authors

- [@sachinr147](https://www.github.com/octokatherine)



# Micro Front End using Single-spa Framework


![Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2wv3NcbrGEvDXUGTLi0CCg8rEeB-mVFgNVA&s)

##  Installation and usage


#### Single spa package Installation

If you wish to have create-single-spa globally available, run the following in a terminal

``` 

npm install --global create-single-spa

# or
yarn global add create-single-spa

```



#### Create a root config

```
create-single-spa 
# or
create-single-spa --moduleType root-config

```

- Select “single-spa application / root-config
- Select “npm” or “yarn” or “pnpm”
- Will this project use Typescript? (y/N) 
-  Would you like to use single-spa Layout Engine (Y/n)
- Organization name (can use letters, numbers, dash or underscore)




#### Create Micro front end apps

```
create-single-spa
# or 
create-single-spa --framework vue
```

- Directory for new project
- Select type to generate single-spa application / parcel
- Which framework do you want to use? vue
- Organization name (can use letters, numbers, dash or underscore) header





## Run Locally

#### Clone the Root and MicroFront end projects

###### Run Root Project

```bash
  git clone https://github.com/sachinr147/microfront-end.git
```

Go to the project Root Config Project(microfront-end)

```bash
  cd microfront-end
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

###### Run Micro Frontend Projects

We have following MicroFront End apps.

- header
- Home
- Login
- Profil
- Settings
- Sidenav

To run each project,
go to header project

```bash
  cd header
```
To run 


```bash
  cd header
```

Install dependencies

```bash
  npm install
```

Run Build 

```bash
  npm run build
```

Serve Build content, go to dist folder 

```bash
  cd dist
```

Important Note : Check header app running on which port
For Example: 

```bash
  registerApplication({
    name: "@app/main-header",
    app: () => System.import("http://localhost:8003/js/app.js"),
    // activeWhen: [() => true && isLoggedIn()], // Always active
    activeWhen: [() => isLoggedIn()],
    customProps: {
      domElement: document.getElementById("header"),
    },
  });
```

header is running on 8003 port according to the registerApplication function.

Now run dist content on 8003 port locally.

```bash
 http-server . --port 8008 --cors
 ```

 Finally, go to http://localhost:9000 and check you header microfront is running with root application.

- Follow the Similar step for all the microfront end apps.
