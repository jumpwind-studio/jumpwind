import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main class="isolate flex h-screen flex-col items-center justify-center">
      <div>Hello "/"!</div>
    </main>
  );
}
