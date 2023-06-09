### Hi there! 👋

> A time capsule for you to record and remember the best moments of your life.
>
> This is an end-to-end application which allows users to create an account using GitHub OAuth authentication and then register their own memories. Users can add images, descriptions and choose whether they want to make their memories public. The app also has a timeline that displays all the memories recorded by the user.
>
> The time-capsule API was developed in TypeScript, using the Fastify, Prisma, and other tools. For authentication, GitHub's OAuth was chosen as a service. After the user allows access to their data on github, a JWT is generated to identify the user's session. Within the record of a memory, stream technology with nodejs was used to upload images, improving the efficiency and performance of the API. In addition, the stream service makes the API scalable, and may have several features to be added.
>
> For the web application we used NextJS, React, TypeScript, Tailwind, Axios, and other tools.Taking advantage of the best of Next JS 13, an intuitive and friendly interface was created, with the objective of the user having the best experience possible, making it easy and practical to record and view their registered memories. In the authentication part, the user accesses his account through Github OAuth, as soon as he returns to the website, his JWT is received from the API, storing it in the user's cookies. To validate its authentication, an authentication middleware was created, through the functionality
offered by the NextJS framework itself.
>
> Taking advantage of the knowledge in React, ReactNative was used with Typescript for mobile app, using Expo to facilitate the initial settings. To handle user authentication we used expo-auth-session, together with expo-routes, we managed to have a very efficient result in the creation of routes and their validations.
>
> [Prototype in Figma](https://www.figma.com/file/q2RnMH6iSBp3CWe1DpIo2W/C%C3%A1psula-do-tempo-%E2%80%A2-Trilha-Ignite-(Community)?type=design)

## 💻 Web version

[Time-capsule Web](https://github.com/arthurlbo/time-capsule/tree/main/web)

## 📱 Mobile version

[Time-capsule App](https://github.com/arthurlbo/time-capsule/tree/main/mobile)

## 🚀 Api

[Time-capsule Api](https://github.com/arthurlbo/time-capsule/tree/main/server)

<p align="center">Made with 🤍 by Arthur</p>
