## Next.js App Instructions

This repository contains a Next.js application that you can run locally or deploy to a server. Follow the instructions below to get started.

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (version 12 or above)
- npm (Node Package Manager) or yarn

### Installation

1. Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/Kashish-max/Landing-Page.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Scribble-Docs/
   ```

3. Navigate to the frontend folder and Install the dependencies using either npm or yarn:

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn
   ```

3. Navigate to the backend folder and Install the dependencies using either npm or yarn:

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn
   ```

4. Setup environment variables(.env file) in root directory of backend:

   ```bash
    DB_USERNAME=<DB_USERNAME>
    DB_PASSWORD=<DB_PASSWORD>
    NODE_ENV=<development>
    JWT_SECRET=<ANY_SECRET_KEY>
    COOKIE_KEY=<ANY_SECRET_KEY>
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    GOOGLE_CALLBACK_URL=
   ```

4. Create Google OAuth Client Id on Google Cloud Console and Add the required credentials in environment variables

### Running the App Locally

Once you have installed the dependencies, you can run the Next.js app on your local machine. Follow these steps:

1. Start the development server on both frontend and backend:

   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev
   ```

2. Open your web browser and visit `http://localhost:3000` to see the app in action.
2. You can make api requests to `http://localhost:9000` to see the app in action.

### Deployment

The app can be deployed to a server or cloud platform of your choice. Here are some deployment options:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Heroku](https://www.heroku.com/)

Refer to the respective documentation of the deployment platform for detailed instructions on how to deploy a Next.js app.

### Deployment Link

You can find the deployed version of the website at the following link:

[Website Deployment Link](https://landing-page-alpha-nine.vercel.app/)

### Video Demo

A video demonstration of the website can be found at the following link:

[Video Demo Link](https://drive.google.com/file/d/1RMpbdWYrUF95_FT3lZewVEfVdWnHI5dI/view?usp=sharing)