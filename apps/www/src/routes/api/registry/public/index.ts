import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/api/registry/public/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/api/registry/public/"!</div>
}
