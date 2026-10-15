import { BarChart3, CalendarDays, DatabaseBackup, Users, Wallet, WifiOff } from 'lucide-react'
import type { ComponentType } from 'react'
import type { FeatureIconId } from '../content/fa'
import { fa } from '../content/fa'
import { Section } from './Section'

type IconComponent = ComponentType<{ size?: number; className?: string }>

const FEATURE_ICONS: Record<FeatureIconId, IconComponent> = {
  calendar: CalendarDays,
  users: Users,
  wallet: Wallet,
  stats: BarChart3,
  offline: WifiOff,
  backup: DatabaseBackup,
}

export function Features() {
  const { features } = fa
  return (
    <Section id="features" title={features.title} subtitle={features.subtitle}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.items.map((item) => {
          const Icon = FEATURE_ICONS[item.icon]
          return (
            <li
              key={item.title}
              className="rounded-2xl border border-ink-700 bg-ink-800/60 p-5 transition-colors hover:border-teal-400/70"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                <Icon aria-hidden="true" size={22} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-paper">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
