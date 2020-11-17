# Project 4: React Native

## How to get started

To run the app

1. First make sure to have expo client install, this can be done in the terminal with: `npm install --global expo-cli`
2. Clone the application with https. `git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-07/prosjekt-4.git`
3. Navigate to the project and fin frontend with `cd frontend`
4. Write `npm install`
5. To run program write `npm start`, this will automatically open a localhost with expo, here you can either run in a simulator or download the expo app and scan the QR-code to run the application on your phone.

## Contents

This application is a mobile version of our website from project 3. Our project is an online makeup store, where a user can search, filter and sort through a collection of different types and brands of makeup. When opening the application a user will come to the main page, here it can see the page logo along with a cart and a search icon. By pressing the search icon a new page will slide in over the old one and present the user with the option to either search, filter, sort or any combination of these choices that they want. In the search, a user can see the first 15 searches that best fit the user's search. To see the rest of the products a user must simply exit out of the search window. To view more details about a product a user must simply press on that specific product and a modal will pop up. Here a user can add the product to cart og just view the extra details. To view more products than is shown a user can either click next or the next number if this is available, if it is not available then there are no more products. There is also a carousel on the first page, where a user can scroll through a number of different items. It is a different way to view items instead of scrolling down. We chose this method of showing the products because we felt like this was the best way of showing information on a smaller screen. It utilizes different techniques and ways to view products and gives the user a more pleasurable experience.

## Technologies

Most of the backend is the same as in [project 3](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-07/prosjekt-3). There have been no changes to the database, but the backend now runs on a virtual machine and therefore it is not needed to be on an NTNU vpn.

### React and React native

This project was developed using React Native and Expo as a framework. Expo is a framework that helps a developer build React Native apps with ease. When using expo we as developers don't need to know the individuell native coding languages for iOS or android. This makes developing apps a lot easier. To get started, a user must first download command line tools with `npm install --global expo-cli` and then start a project with `expo init prosjekt-4`.

### Third party components

We decided to do most of the design from scratch to get more familiar with react native. We did however incorporate some components to help us. The most prominent one is the carousel on the front page displaying the newest products. For this we used react-native-snap-carousel to create a cool parallax-effect. Other components we used were icons from react-native-vector-icons to make sure all icons look the same on all phones. Using unicode characters would not have accomplished this.


### Reusing old code

Since there was such a tight deadline on this project, the most important thing we did was reuse as much of the old code as possible. The backend is almost entirely the same, with some adjustments. The frontend on the other hand had to be changed somewhat. React Native does not use components like `div` or `p` so this had to be replaced with what is valid in React Native. Styling the application was also a bit different than in react, but most of the old code could be reused. We continued to use Mobx as we felt like this was a great make to manage states.

### Styling

Styling in React Native is different from styling in React, where you can use css. In React Native, we are styling like we would style javascript components. Here each component needs a style tag if they are to be styled. We could either write the style directly in the tag, this is useful for unique components, but can make the code harder to read. To make the code more structured and clean we make a stylesheet. We chose to do this at the end of each component so that it is easier to understand what style goes where.

## Testing

When developing this application we had the advantage of being multiple people with different types of software. We made sure to test the application on both an iOS and an android device. This was a great way to make sure that the code works on both devices and that the functionality was the same. We tested that the functionality of the application works, this is by searching for a product, filtering by a brand and sorting from Z to A. By doing this type of test we make sure that there are no obvious technical or functional deficiencies.

## Collaboration

To ensure that the project goes as smoothly as possible, we continued our use of issues and branches for most issues. This made sure that we could more easily have a better overview of the project and what needed to be done. Whenever a commit was made, we added the issue number to the end of the message as to get a better overview as to why it was committed.
