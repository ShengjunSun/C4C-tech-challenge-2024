# Project Structure

The app is divided into two parts, the frontend and the backend, with relevant files located in their respective folders.
If you're unfamiliar with these terms, here are some brief descriptions:
- Frontend: the code for what users can see and interact with on the website; in MVC terms, this is the **view** of the program.
- Backend: the code for performing actions on behalf of the user, which are triggered by the frontend; in MVC terms, this is the **controller** of the program (and may involve the **model** as well)

## Frontend

On the frontend, this app uses React, a JavaScript library that enhances building web pages through the use of reusable components. For more information and a quick walkthrough of the basics, check out [React's learn page](https://react.dev/learn).

### Important files you will need to change
- `src/components`: This folder contains the components to use to build the web page. The existing `Dashboard` and `PartnerTile` components are **not complete** - you will need to modify them, in addition to creating any other components you see fit.
- `src/App.css`: This file contains the CSS styles for your components. You may choose to split this into multiple smaller files, or add new styles to this file

### Files you may want to change
- `src/App.jsx`: This file is the top-level component that contains the entire contents of the app. Depending on your approach, you may want to modify this file.
- `src/index.css`: This file contains the CSS styles that affect the entire main page layout. The separation from `src/App.css` is not strictly necessary, and you may choose to merge the files into one if you'd like.
- `index.html`: This file is the actual HTML document for the page, which will have React content added at runtime. If you want to load external scripts or styles, you can add them here.

All other files you will most likely not need to change to meet the project requirements.

## Backend

On the backend, this app uses Express, a JavaScript framework for writing web APIs (among other things). For more information and a quick guide to API routes, check out [Express's routing guide](https://expressjs.com/en/guide/routing.html).

Compared to the frontend, the backend's structure is very simple - there is only the one `src/server.js` file. You **will need to change this file** to meet the project requirements - Whether you simply add on to this file or split it into multiple files is up to you. 

**NOTE:** much of Express's documentation uses the CommonJS `require()` form of importing modules; however, this project is configured to use the ESM `import` form of importing modules. This only matters if you plan to split the backend's functionality over multiple files.

# Project Configuration

In addition to React and Express, a couple other packages are here to aid development:
- `concurrently`: this is used to run the frontend and backend at the same time, so the entire app can be started with a single command (`npm run dev`)
- `nodemon`: this is used to enable hot reloading for the backend - that is, any changes saved to the backend will cause the backend to restart automatically.

The primary configuration files are `package.json` and `vite.config.json`, which you will **most likely not need to modify directly**. However, you may want to make changes here if you decide to use any additional libraries, such as something to manage CSS like Tailwind or Sass.
