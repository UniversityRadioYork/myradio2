# MyRadio^2 Code Conventions

This doc gives a rough summary of how MyRadio^2 code is written. Note that, as with all rules, feel free to break them - once you've fully understood why they're there.

## Package Management

Use [Yarn 1.x](https://classic.yarnpkg.com/en/docs/install) rather than NPM. Don't use Yarn 2, it breaks everything.

## Styling

Before committing code, run Prettier over it:

```sh
yarn prettier --write 'src/**/*.{js,jsx,ts,tsx,css,scss}'
```

This will ensure that all your files have consistent code style, without a linter screaming at you for forgetting a semicolon.

## Components

All React components should be function components (rather than classes), using TypeScript as much as possible - meaning that prop types should be statically declared using a TypeScript interface. Components should use named exports instead of default exports (i.e. don't use `export default function`).

```ts
import React from "react";

export interface CheckboxFieldProps {
  name: string;
  id: string;
  label: string;
  helper?: string;
}

export function CheckboxField(props: CheckboxFieldProps) {
    return (
        <div>...</div>
    );   
}
```

Components should be written in a `.tsx` file named the same as the "most important" component in that file - e.g. a file with a component called `SingleShow` should be named `SingleShow.tsx`.

*Note: multiple components in the same file are fine, but avoid exporting multiple components from the same file. For example, `SingleShow` having a "helper component" `SeasonsList` is fine, but if you want to export `SeasonsList` to use it elsewhere it should be in its own file.*

## Styling

Component styles should be written in a SCSS file alongside and named the same as the component file - e.g. styles for `SingleShow.tsx` go in `SingleShow.scss` in the same folder. Import it from the component file, like this:

```tsx
// SingleShow.tsx
import React from "react";
// your other imports
import "./SingleShow.scss";
```

Avoid global styles as much as possible, however avoid nesting your styles too deep. One or two levels of nesting is probably fine, but go any deeper than that and you should start thinking about your component's structure.

## Linting

The lint rules enabled in this repo are usually there for a good reason, as they help to catch bugs. The ury.org.uk build will **fail** if there are lint warnings, so make sure you fix them all before pushing your code. Run `yarn build` to check it builds.

## Routing

We use React Router for routes. Define your routes in `src/pages/index.tsx`. Use sensible naming, and don't be afraid to nest routes.

**Don't** have paths that start with a capital letter, as those are easy to confuse with those from MyRadio 1. So `/scheduler/myShows` is fine but `/Scheduler/myShows` is not.

## Testing

We use Jest and testing-library/react for unit tests. Tests should be in a file next to the file you're testing, with a `.test.ts[x]` suffix - e.g. `TextField.tsx`'s tests are in `TextField.test.tsx`.

Note that you may find `testUtils/renderUtils.tsx` useful when writing tests - it renders your components in a Redux/React-Router/Apollo(coming soon) context.

100% code coverage is explicitly not a goal of the codebase, so we don't track it. Write unit tests where it makes sense, and err on the side of over-testing rather than under-testing, but don't feel the need to test bits of code that are obviously correct. When it isn't obvious (or correct) though, write a test to prove your assumptions.

## Data Fetching

We use GraphQL and Apollo Client for data fetching. We generally use the `useQuery`/`useLazyQuery`/`useMutation` hooks, unless we need to fetch something imperatively.

Note that we import the `gql` tag from `graphql.macro`, rather than from `@apollo/client` or `graphql-tag`.

Define your queries and mutations outside of your component, in a variable. Prefix query names with the name of the component that will be using them, unless there's more than one of those.

To generate TypeScript definitions for your GraphQL queries, run `yarn apollo:codegen`. This will output definitions for them in a folder called `__generated__` next to your component file. Statically define the type of your `useQuery` hook, e.g.:

```tsx
import { gql } from "graphql.macro";

import { Profile_GetName } from "./__generated__/Profile_GetName";

const QUERY_GET_NAME = gql`
    query Profile_GetName {
        me {
            id
            fname
            sname
        }
    }
`;

export function Profile() {
    const {data, loading, error} = useQuery<Profile_GetName>(QUERY_GET_NAME);
    // data now has a TypeScript type matching the query result
}
```


Use fragments where it makes sense, and don't use them where it doesn't.

To ensure it caches properly, every query result must have either an `id` or `itemId` field. Use `id` where the value is *globally unique* (that is, no other object anywhere in MyRadio will have the same ID), and `itemId` everywhere else. The reason is that `itemId`s are prefixed with the object type in the cache, while `id`s are not, and cache ID collisions cause hard-to-debug problems. For example, `User:11090` and `VXNlcjoxMTA5MA==` are acceptable cache keys, but `11090` is not.
