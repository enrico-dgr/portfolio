# Portfolio documentation

## Available Scripts

In the project directory, you can run:

### `yarn run dev`

Runs the app in the development mode using _webpack-dev-server_.\
Open [http://localhost:9000](http://localhost:9000) to view it in your browser.

### `yarn run build`

Builds the app in '< base-project-dir >/fe/build'

### `yarn run start`

Runs the builded app using _express_.\
Open [http://localhost:9000](http://localhost:9000) to view it in your browser.

### Dependencies

- `axios` to handle API calls.

- loaders for webpack's bundling

- `i18next` and `react-i18next` for translations.

- `redux` for session data and global state management.

- `react-router-dom` for page navigation.

- `@react-three/fiber` and `three`.

### Dir's structure

- `build` where the production build resides

- `src`

  - `assets`
    - `images`
    - `translations` i18n json files
  - `components`
    - `funcComponents`
    - `classComponents`
    - `hookComponents`
  - `redux`
  - `screens`
  - `services` containing APIs
  - `hooks.ts` used for typing redux hooks
  - `index.html`
  - `index.tsx` root component, contains configurations available to the whole project
  - `Routing.tsx` routing component for react-router-dom
  - `store.ts`
