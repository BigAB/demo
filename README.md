# Web Application Architecture demo

user-search app deployed to: https://friendly-lily-d8edd0.netlify.app/

This is a small app to demonstrate the following Web Application Architecture:

![Web Application Architecture Visualization](./Web%20Application%20Architecture.png)

Described in this talk: https://slides.com/bigab/how-to-build-large-scale-react-apps

Basically:

**UI Components** - Function Components, Hooks, Styled Components  
**Domain components** - Custom Hooks / Providers  
**Stores** - RxJS BehaviorSubjects (or Redux + Redux-Observable)  
**Services** - Simple classes that return promises or RxJS observables  
**APIs and Platform** - Rest, GraphQL and/or localForage type

It has

- Cypress set up for end-to-end testing
- Storybook for the dev sandbox for UI Components and design system
- Domain Components live in the individual apps

Still todo...

- add proper tests and CI
- add separate framework implementations (Svelte, Vue, Angular, etc) sharing as much code as reasonable
- add better adapter utils for each fromwork, like a Hook/Provider pair for stores in the React implementation
