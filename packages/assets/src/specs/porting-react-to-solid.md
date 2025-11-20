# Porting React code to SolidJS

This document describes the best practices and patterns used to port `React` code to `SolidJS`.

## Core Pattern: Components

### Props destructuring (splitProps)

In React, you typically destructure props directly:

```tsx
// React
function Button({ children, variant, onClick, ...rest }) {
  return (
    <button className={`btn-${variant}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
```

In SolidJS, use `splitProps` to separate reactive and non-reactive props:

```tsx
// SolidJS
import { splitProps } from 'solid-js';

function Button(props) {
  const [local, others] = splitProps(props, ['children', 'variant', 'onClick']);

  return (
    <button class={`btn-${local.variant()}`} onClick={local.onClick} {...others}>
      {local.children}
    </button>
  );
}
```

### Props defaults (mergeProps)

React uses default parameters or defaultProps:

```tsx
// React
function Button({ variant = 'primary', children }) {
  return <button className={`btn-${variant}`}>{children}</button>;
}
```

SolidJS provides `mergeProps` for combining props with defaults:

```tsx
// SolidJS
import { mergeProps } from 'solid-js';

function Button(props) {
  const merged = mergeProps({ variant: 'primary' }, props);

  return (
    <button class={`btn-${merged.variant()}`}>
      {merged.children}
    </button>
  );
}
```

### Component structure

React components are functions that return JSX:

```tsx
// React
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

SolidJS components are similar but handle reactivity differently:

```tsx
// SolidJS
import { createSignal } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
}
```

## Core Pattern: Hooks

### State management

React's `useState` becomes SolidJS's `createSignal`:

```tsx
// React
const [value, setValue] = useState(initialValue);

// SolidJS
const [value, setValue] = createSignal(initialValue);
// Usage: value() to read, setValue() to write
```

### Effects

React's `useEffect` maps to SolidJS's `createEffect`:

```tsx
// React
useEffect(() => {
  console.log(value);
}, [value]);

// SolidJS
createEffect(() => {
  console.log(value());
});
```

### Derived values

React's `useMemo` becomes SolidJS's `createMemo`:

```tsx
// React
const doubled = useMemo(() => value * 2, [value]);

// SolidJS
const doubled = createMemo(() => value() * 2);
```

### Computed values

React's `useCallback` is typically not needed in SolidJS due to fine-grained reactivity:

```tsx
// React
const handleClick = useCallback(() => {
  setValue(prev => prev + 1);
}, []);

// SolidJS
const handleClick = () => {
  setValue(prev => prev + 1);
};
```

### Lifecycle

React's lifecycle hooks map to SolidJS's `onMount`, `onCleanup`:

```tsx
// React
useEffect(() => {
  // mount
  return () => {
    // cleanup
  };
}, []);

// SolidJS
import { onMount, onCleanup } from 'solid-js';

onMount(() => {
  // mount logic
});

onCleanup(() => {
  // cleanup logic
});
```

## Best Practices

### Maintaining reactivity (thunks/accessors)

In SolidJS, you must access reactive values within functions to maintain reactivity:

```tsx
// ❌ Breaks reactivity
const items = () => props.items.map(item => item.name);

// ✅ Maintains reactivity
const items = () => props.items().map(item => item.name);
```

### Avoid destructuring signals

Never destructure signals as it breaks reactivity:

```tsx
// ❌ Breaks reactivity
const [count, setCount] = createSignal(0);
const { 0: currentCount } = [count, setCount];

// ✅ Correct usage
const [count, setCount] = createSignal(0);
```

### Use Show for conditional rendering

Instead of ternary operators, use SolidJS's `Show` component:

```tsx
// React
{isLoading ? <Spinner /> : <Content />}

// SolidJS
import { Show } from 'solid-js';

<Show when={isLoading()} fallback={<Content />}>
  <Spinner />
</Show>
```

### Use For for lists

Use SolidJS's `For` component for efficient list rendering:

```tsx
// React
{items.map(item => <Item key={item.id} item={item} />)}

// SolidJS
import { For } from 'solid-js';

<For each={items()}>
  {(item) => <Item item={item} />}
</For>
```

## Naming conventions

### `create` instead of `use`

SolidJS uses `create` prefix instead of `use` for hooks:

```tsx
// React
useState, useEffect, useMemo, useCallback

// SolidJS
createSignal, createEffect, createMemo, createResource
```

### Component naming

Both frameworks use PascalCase for component names:

```tsx
// React
export function Button() { ... }

// SolidJS
export function Button() { ... }
```

## Common patterns

### Forms and controlled inputs

```tsx
// React
function Form() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// SolidJS
function Form() {
  const [value, setValue] = createSignal('');

  return (
    <input
      value={value()}
      onInput={(e) => setValue(e.currentTarget.value)}
    />
  );
}
```

### Context

```tsx
// React
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

// SolidJS
import { createContext, useContext } from 'solid-js';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}
```

### Error boundaries

```tsx
// React
class ErrorBoundary extends Component {
  // ...
}

// SolidJS
import { ErrorBoundary } from 'solid-js';

<ErrorBoundary fallback={(err) => <div>Error: {err.message}</div>}>
  <Component />
</ErrorBoundary>
```

## Performance considerations

### SolidJS advantages

- **Fine-grained reactivity**: Only the parts that need to update will re-render
- **No virtual DOM**: Direct DOM manipulation for better performance
- **Compile-time optimizations**: The compiler optimizes reactivity patterns

### Migration tips

1. **Start with state management**: Convert `useState` to `createSignal`
2. **Handle effects carefully**: Replace `useEffect` with `createEffect`
3. **Use SolidJS components**: Replace React patterns with `Show`, `For`, `Index`
4. **Test reactivity**: Ensure all reactive dependencies are properly tracked

## Tooling

### TypeScript support

Both frameworks have excellent TypeScript support. SolidJS provides types for all its APIs:

```tsx
import { createSignal, createMemo } from 'solid-js';

const [count, setCount] = createSignal<number>(0);

const doubled = createMemo<number>(() => count() * 2);
```

### DevTools

- React: React DevTools
- SolidJS: SolidJS DevTools (browser extension)

## Resources

- [SolidJS Documentation](https://docs.solidjs.com/)
- [SolidJS GitHub](https://github.com/solidjs/solid)
