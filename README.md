# Pawfic Pictures
In need of cute animal pictures but not really a cat person? Find your *pawfic* dog picture today! Pawfic Pictures is simple web application that let you view random dog pictures, built with Next.js and Appwrite. 

## Table of Contents
- [Overview](#overview)
  - [Features](#features)
  - [Built with](#built-with)
- [Setup](#setup)
  - [Install](#install)
  - [Appwrite](#appwrite)
    - [Creating the Web App](#creating-the-web-app)
    - [Auth Service](#auth-service)
    - [Create the Database](#create-the-database)
  - [Env File](#env-file)
- [Resources](#resources)

## Overview
The purpose of this project is to practice building a full-stack application while trying out [Appwrite Cloud](https://appwrite.io/), an open-source backend service. 

### Features
Here are the features implemented in the app:
- Account Creation
- Login functionality
- Active user sessions upon login
- Protected home route for registered users
- Generate a random dog picture upon login
- Logout function and remove all active sessions

### Built with
- Next.js (Typescript)
- Tailwind CSS
- [Appwrite Cloud](https://appwrite.io/)
- [Dog CEO API](https://dog.ceo/dog-api/)
- [React Hook Form](https://react-hook-form.com/)
- [SWR](https://swr.vercel.app/) for client-side data fetching
- [Icones](https://icones.js.org/)

## Setup
There are several steps needed to locally reploy your project.

### Install
First, clone this repo and install all dependencies:
```
$ npm install
```

### Appwrite
This project uses Appwrite as the backend for authentication. You will need to [visit their site and create an account](https://appwrite.io/). 

Upon creating an account, you'll be shown your personal project homepage where you can manage all your projects. 

#### Creating the Web App
1. Click **Create Project** to create a new project.
2. Give your project any name you like and leave project ID as is. You'll be redirected to your created project.
3. Take a look at the **Getting Started** dashboard upon page redirection and click **Web App** to create your SDK needed for this project.
4. Once again, give your web app any name you like. For the hostname, you may use `localhost` as the hostname for local deployment. Change it to something else if you are deploying elsewhere. 
5. Once you are redirected to the **Get the SDK** page, you do not need to add any code as this is already apart of the project. Warning: you WILL need the provided **ENDPOINT** and **PROJECT ID** so keep these variables for later. Click **Next**. Click **Next** again once you are on the next step onto initiating the SDK. 
6. At the last step, click **Take me to my Dashboard** to return. This is all you need to do to create the backend service!

#### Auth service
Appwrite Cloud offers their own authentication service. You do not need to initiate or create any settings to activate this setting. 

If you wish to view everything that this service offers, [visit the documentation to see more](https://appwrite.io/docs/server/users).

#### Create the Database
One of the services I wanted to try out was the database so I also created a database that served as a backend to host each user as a document. Although this service is barely used in this project, I left it as is since it is apart of learning about Appwrite. 

1. Click **Databases** on the left side bar to view the databases page.
2. Click **Create Database** to create a new Appwrite database. Give it any name you like. 
3. Your new database will be empty, so you will need to create a **Collection** object for your database. Click **Create collection** and give it any name you wish. I gave mine **Users** since its supposed to be a collection of user objects that are created upon registration. 
4. You will be directed to your new collection. Click **Attributes** to create the attributes needed to create a document within the collection. Your collection attributes should have these attributes:

    | Attribute    | Type     | Size |
    |--------------|----------|------|
    | email*       | string   | 100  |
    | userId*      | string   | 100  |
    | username*    | string   | 100  |
    | password*    | string   | 100  |
    | fav_breed    | string   | 100  |

    Since the purpose of this project is to learn about Appwrite, you do not need to be that strict with your attributes, but this is what I used to create my attributes. Feel free to add or modify the attributes to your own taste, as long as there are no conflicts! Each attribute with a * means that it is a required attribute. 

    Note: in addition, because this is a learning project, I am not that strict when it comes to creating a secure document. Normally I would hash user passwords but for the purpose of learning Appwrite, I did not manually do so. 

5. Now that you created your collections, click **Settings** in the tab list for your collection. You will need to change your collection settings to start creating documents for your collection.
6. Scroll down to **Update Permissions**. Create a new role for **any** and check **Create** and **Read**. 

This is all you need to do to setup your Appwrite Cloud

### Env File
Back to the cloned project, you will need to create a `.env.local` file in the root directory. This env file will contain information about the created Appwrite project. Remember your **ENDPOINT** and **PROJECT ID** from earlier? This is where you will add them to. Add the following to your env file:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT='YOUR APPWRITE ENDPOINT HERE'
NEXT_PUBLIC_APPWRITE_PROJECT_ID='YOUR APPWRITE PROJECT ID HERE'
NEXT_PUBLIC_APPWRITE_USERS_DATABASE_ID='YOUR DATABASE ID HERE'
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION='YOUR DATABASE COLLECTION ID HERE'
```

The database ID is the ID of the database you created earlier. The same applies to your collection for users. 

You can get your database ID and collection ID by navigating through your created database and clicking the **Database ID** and **Collection ID** button next to the respective object names to copy them. 

Setup Complete! Now launch the project:
```
$ npm run dev
```

## Resources
- [Appwrite Documentation](https://appwrite.io/docs)
- [Dog Ceo Documentation](https://dog.ceo/dog-api/documentation/)
- [SWR Documentation](https://swr.vercel.app/docs/getting-started)
- [Icones](https://icones.js.org/) for icons
- [Realtime Colors](https://realtimecolors.com/?colors=fbf4f4-010101-ab4444-371616-bf5a5a) to test out color palettes
