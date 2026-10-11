import { Box, Droplets, House, Waves } from 'lucide-react'

export default function ServiceIcon({ name }) {
  const icons = { house: House, waves: Waves, droplet: Droplets, box: Box }
  const Icon = icons[name] || House
  return <Icon size={21} strokeWidth={2.2} aria-hidden="true" />
}
