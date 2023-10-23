# Introduction

In this document, I have covered the decisions I made and the reasoning behind those decisions.


## Changes in Configuration

- **Migrated to a newer version of `react-scripts`**: Updating to a newer version of `react-scripts` ensures that your React application benefits from the latest features, performance improvements, and bug fixes provided by the React team.

- **Migrated to TypeScript**: The decision to migrate to TypeScript is a significant step towards enhancing code maintainability and catching potential type-related errors at compile-time. TypeScript provides better tooling and documentation for your codebase.

- **Installed Prettier**: Prettier is a code formatting tool that enforces consistent code style across your project. It ensures that your codebase follows a consistent and readable formatting style, making collaboration and code reviews more efficient.

- **Applied More Strict ESLint Rules**: Enforcing stricter ESLint rules helps maintain code quality by catching potential issues early in the development process. This can lead to more consistent and error-free code.


## Store

Initially, the plan was to use Jotai with the atom approach, but I decided to implement a more traditional approach with Redux. The core challenge in this project is efficient client-side filtering, with a focus on caching and performance. To address this, I've employed reselect for efficient caching. I've optimized the calculation algorithm to have O(n) complexity, where 'n' represents the length of the dataset. According to functional requirements, if looping through the dataset takes longer than the allowed time, I have to change the calculation algorithm to store results for each possible combination of filter values. The limitation here would be the total number of combinations.

- **Used Redux (@reduxjs/toolkit) as a State Management Library**: Redux, along with Redux Toolkit, provides a robust and predictable way to manage application state. It simplifies complex state management tasks and enhances code maintainability.

- **Utilized `reselect` for Memoization, Efficient Rendering, and Testing**: The use of `reselect` enables efficient memoization of selectors, ensuring that computations are only performed when necessary. This contributes to improved rendering performance and easier testing of your components.

- **Employed 'Jest' for Testing**: Jest is a popular testing framework that allows you to write and run tests to ensure the correctness of your application. It helps catch bugs early and maintain code reliability.


## API

- By default, all data parsed from the CSV is in string format. I only convert data to numbers when it is needed for calculations, which minimizes unnecessary type conversions and improves efficiency.

- Some empty rows were present in the provided CSV file. I enabled `skipEmptyLines` during parsing to skip these rows, ensuring that only relevant data is processed.

- I removed unnecessary `await` statements in the `getData` method, which helps streamline the API handling code and improve performance.


## Component Structure

- **`App` is a Root-Level Component**: Designating `App` as a root-level component is a good practice, as it serves as the entry point to your application.

- **`Statistics` is a Page-Level Component**: Organizing components based on pages helps maintain a clear project structure. `Statistics` is responsible for the layout and logic of a specific page.

- **Component Organization**: For page-level components, all components used exclusively on that page are stored in the same directory. However, components like `Table` and `Select` have a more general appearance and should be stored separately. Given the project's small size, it is reasonable to keep these components in their current location, but for larger projects, consider organizing them into dedicated folders for better code organization.


## UI-Kit

I decided to use `Bulma` for simplicity. This choice was primarily motivated by the goal of expediting the development of this particular demo task. In real-world projects, my preference would typically lean towards using established UI-kits like Material-UI (MUI) or creating a custom in-house UI kit, depending on the project's size and complexity.

In this specific task, I didn't place excessive emphasis on aesthetics or user interface design since there wasn't enough information available to make well-informed design decisions. Instead, the priority was to demonstrate functionality and efficient development. In a more comprehensive project with defined design requirements, the choice of UI kit and design considerations would play a more significant role in delivering a polished user experience.


## Testing

I have created a few tests for demonstrating purposes. However, I assume that the current test coverage is not sufficient.

Here are my thoughts on testing:

- Using TypeScript and ESLint is the first step to catch simple bugs and typos.
- Snapshot testing is often considered unnecessary and can sometimes create more problems than it solves. However, if the website's content is relatively static and supports several languages, it could be useful. I feel comfortable creating snapshots in such cases.
- Unit tests: The first priority for unit testing should be to cover Redux, especially data manipulation. After that, it makes sense to cover complex UI components. In most cases, covering every UI component may not be necessary since their logic is usually simple and straightforward.
- End-to-End Testing: I believe that implementing this type of testing in the early stages of project development is crucial. It is particularly helpful to have all happy paths covered with Cypress. It can also speed up development in later stages, especially when dealing with complex scenarios or when generating specific data for particular screens is time-consuming.


# Next directions for improvements

Here I'd like to higlight next steps what I'll do if I will conunue working in this project.
- Implement proper UI-kit
- Create CI/CD configuration
- Create an API layer for communication with data soruces
- Integrate error tracking
- Integrate analytics
- Integrated with ID service (Authentication)
- Implementing ent-to-end testing
