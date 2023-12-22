# App Starter
This project is a React Native boilerplate aims to reduce our client onboarding time in many perpectives.
We have implemented a set of components, screens, and auth module for your next starter project.


## Getting started

- You need to clone this repository
- Run `npm run duplicate -- --name mynewproject` it copies the entire directory, and renames things inside
- Replace left over `appstarter` to your new project name, if that's neccessary
- Update the icons for Android and IOS

## Create modules from book template

You can create your modules from `book` template in the project by calling `npm run module -- --name mynewmodule`
it will change the all component names, provides you List, Single, Form, Wizard and couple of other screens

It has http calls, handled, try to keep up with the structure as much as possible.

**This project is not a library, it's a copy** Once you create a new project out of this, that's all you'll
get from. Considering components and structure inside the project, it will give high quality and structure,
and perhaps reduces 3-4 sprints per each 4 months.

## contributing

Add new components into this project in `components` folder. Check the `scripts` folder, for updating
the template generator.

## Key features

- Main features:

    - An easy to copy project to build a new react native project (duplicate)
    - Text input
    - Text area input
    - Switch input
    - Currency input
    - Phone input
    - Select
    - Modal with neccessary buttons and template (delete, confirm)
    - Map select
    - Attachment select
    - Login/Signup form (Only Google/FaceBook/SMS and Email)
    - User Settings screen (Update user name, last name, phone, and profile photo)
    - Basic theme strategy
    - Module generation and structure (to list, edit, view, delete and filtering the entities)
    - Script necessary for the deploying app, docs to publish app

- Set of components
    - Login/Signup/ResetPassword full process
    - Integrate the Google/Facebook with the app
    - SMS Login
    - Forms (Text inputs, Selection, Map Selector, Gallery of Images)
    - Filtering mechanism
    - File downloading
    - Avanced input components
        - Currency input
        - Date picker input
        - Date Range input
        - Color picker input
    - Advanced modals
    - Advanced lists
    - Wizard
    - Camera operations, recording, taking pictures, filters
    - Bluetooth interactions module
    - SKIA Animations samples
    - Music player
    - Video player
    - Fingerprint and faceID

- Set of logics
    - Advanced form validation principles using FE/BE
    - Http Requests
    - TestIDs for e2e
    - Socket support
    - GRPC support
    - Animations in the app
    - Naivgations


