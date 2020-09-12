# Solid Tiny Router

Experimental and personal tiny little router based on [history](https://github.com/ReactTraining/history) & [regexparam](https://github.com/lukeed/regexparam) for [solid](https://github.com/ryansolid/solid)

## Quick start

Install it:

```bash
pnpm add @amoutonbrady/solid-tiny-router
```

Use it:

```tsx
import { render} from 'solid-js/dom';
import { Component, lazy } from 'solid-js';
import { useAuth } from './fake-auth.ts';
// Minimal exports
import { Router, Route, Link, useRouter, Redirect } from './router';

// It can work with lazy routes
const Home = lazy(() => import('./Home'));

const App: Component = () => {
  // Minimal API
  const [auth] = useAuth();
  const [router, { push }] = useRouter();

  return (
    <>
      {/* This is a reactive URL Object, you can retrieve searchParams, pathname & hash from it */}
      <p>{router.currentRoute.pathname}</p>

      {/* Link */}
      <Link path="/" class="text-blue-700" active-class="underline">Home</Link>
      <Link path="/about">About</Link>
      <button onClick={[push, '/']}>Navigate without a link</button>

      <hr />

      {/* Catch all route */}
      <Switch fallback={<p>404 not found</p>}>
        {/* Routes, pretty much just a wrapper around <Match> that display the content only if the route match the path your provide */}
        <Route path="/" children={Home} />
        <Route path="/about">
          <p>Sweet about</p>
        </Route>
        <Route path="/user/:id">This the user {router.params.id}<Route>

        {/* This is how you'd add a guard to authenticated only routes */}
        <Match when={auth.isLoggedIn()}>
          <Switch>
            <Route path="/admin">Admin route</Route>
            <Redirect path="/login" to="/admin" />
          </Switch>
        </Match>
      </Switch>
    </>
  );
};

render(() => <Router><App /></Router>, document.getElementById('app'))
```
