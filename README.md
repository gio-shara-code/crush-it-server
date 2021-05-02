# Crush it Server-Side

This is a repo for crush-it which contains **server-side code**. The front-end code is in the different repo.

## Table of contents
* [Project Description](#project-description)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [DB Design](#db-design)
* [App Screenshots](#app-screenshot)


## Project Description

Crush-It is a workout builder which helps sportsmen build their workouts fast and train easily. In Crush-It you are able to select either predefined workouts and create your own templates or select prefined workout templates. The user is of course able to create his own custom workout as well. Once you have created your custom workout or choosed one of our premade workouts, you are free to train.

This is not a real-world project but the purpose of the project is to gain more technical knowledge in the fields of front-end and back-end. My project partner and me are doing it because we want to become very fast at building mvp's. So The only purpose of the project is to become better and quicker at building mvp's.


## Technologies

- Typescript ^4.2.3
- React ^17.0.1
- Node.js ^14.15.3
- mongodb ^3.6.5
- mongoose ^5.12.3

You can check out other dependencies in **package.json** file under the property **dependencies** and **devDependencies**.

- **Why React?** React does have several benefits in comparison to normal vanilla JS. First of all it makes the code more readable because of it's component-based structure. Additionally rendering content is faster in react because it uses techniques to minimize number of dom operations. Furthermore, testing is easier in react because it provides its own testing tools.

- **Why Node.js?** Again because it's popular and Node.js is usually good fit with React because you can work with both technologies in javascript/typescript.

- **Why MongoDB?** Particularly I want to get familiar with NoSQL database because I am planning to work in large projects in the future. I read that MongoDB is popular and therefore I thought it is a good fit for our project. But of course I am aware of the advantages and disadvantages of both SQL and NoSQL databases. It's just because I had to choose between one of the databases so I went for NoSQL.

- **Why Typescript?** We using typescript to avoid searching bugs in javascript. Because its types the development is going much faster in comparison to javascript.

## Setup

### 1. Make sure you are in the root directory of the project.

Type this in terminal:

Unix

`username@MacBook-Pro-67 ~ % ls`

windows

`C:\Projects\...: dir`

If you are in the right directory, you will see these files:

- LICENSE
- README.md
- package.json
- Procfile
- dist
- package-lock.json       
- request.rest            
- tsconfig.json

### 2. Install dependencies

`npm install`

After executing this command, the following folder will be created: **node_modules**. This folder contains bunch of dependencies for starting your server.

### 3. Start the server

`npm start`

This command starts the nodejs server.

## Features

![Algorithm schema](./images/user_story.jpg)

## DB Design

### Collections
* users
* workouts
* exercises
* circuits

Basically when I started to think about modeling the schema of database I noticed that I had to wisely decide on how to structure the database so that the there won't be any efficiency problems. The **Workout Builder** page seems to be the complex one because its contains **circuits** and **exercises**.

So I came up with 3 different schema's for this use case:


### 1st Option
![Algorithm schema](./images/schema_01.png)

### 2nd Option
![Algorithm schema](./images/schema_02.png)

### 3rd Option
![Algorithm schema](./images/schema_03.png)


## App Screenshots

### Home Page
![Home Page](./images/home_page.png) 

### Workout Builder
![Workout Builder](./images/workout_builder.png) 

### Edit Workout Dialog
![Edit Workout](./images/edit_workout_name_desc.png)

### Edit Exercise Dialog
![Edit Exercise](./images/edit_exercise.png)

### Add Exercise Dialog
![Add Exercise](./images/add_exercise.png)

### Add Custom Exercise Dialog
![Add Custom Exercise](./images/add_custom_exercise.png)

### Filter Exercise
![Filter Exercise](./images/filter_exercise.png)

### Run Workout Repetition
![Run Workout Rep](./images/run_workout_rep.png)

### Run Workout Time
![Run Workout Time](./images/run_workout_time.png)

### Run Workout Routine
![Run Workout Routine](./images/run_workout_routine.png)
