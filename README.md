# Vue.js Movie Database project

This project is a Vue.js-based movie dashboard with multiple pages and features. Follow these steps to set up and run the project.

## Getting Started

1. Clone the project repository to your local machine.

### Installing

2. Open you terminal

    Enter in the ./front-dashboard folder and enter the command:

    ```
    npm run install
    ```


## Environment Configuration

3. Create a `.env` file at the root of the project with the following content:
`VITE_APP_API_KEY=yourApiKey`
Replace `yourApiKey` with your actual API key from The Movie Database.

## Running the Project

4. Start the project
    
   ```
    npm run dev
    ```
   
6. Your Vue.js Movie Database project should now be running locally. You can access it in your web browser by navigating to the URL provided by the development server (usually http://localhost:5173/).

## Project Features

Explore the different pages and features of the dashboard:

### 1. Home Page

- Banner hero showcasing featured content.
- Display of four movies of the moment.

### 2. List Movies Page

- List of movies is displayed.
- Filter movies by categories.
- Search a movie with the searchbar.

### 3. Details Movie Page

- Access to differents informations of the movie you've selected (actors, directors etc.).
- Comment a movie and score it.
  
### 4. Favorites Page

- View and manage your favorite movies.
- Search bar to find movies in your favorites.

## Enjoy using the Vue.js Movie Dashboard!

## Project Technologies

This project incorporates the following technologies:

- **Vue3:** A progressive JavaScript framework for building user interfaces.

- **Tailwind CSS:** A utility-first CSS framework for quickly designing custom user interfaces.

- **Pinia:** A state management solution for Vue.js applications, providing a store pattern.

- **Element UI Plus:** A UI component library for Vue.js that enhances the capabilities of the Element UI framework.
  
- **Vuetify:** A Vue.js framework that provides beautifully designed UI components based on Material Design, enabling the creation of responsive and user-friendly interfaces

- **Vuelidate:** A lightweight, flexible validation library for Vue.js, designed for handling form validations declaratively with asynchronous and dynamic validation rules.
