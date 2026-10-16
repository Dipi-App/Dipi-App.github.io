import { BarChart3, CalendarDays, DatabaseBackup, Users, Wallet, WifiOff } from 'lucide-react'
import type { ComponentType } from 'react'
import type { FeatureIconId } from '../content/fa'
import { fa } from '../content/fa'
import { FadeUp } from './FadeUp'
import { Section } from './Section'

type IconComponent = ComponentType<{ size?: number; className?: string }>
type FeatureSpan = 'wide' | 'accent' | 'std'

const FEATURE_ICONS: Record<FeatureIconId, IconComponent> = {
  calendar: CalendarDays,
  users: Users,
  wallet: Wallet,
  stats: BarChart3,
  offline: WifiOff,
  backup: DatabaseBackup,
}

const FEATURE_SPAN: Record<FeatureIconId, FeatureSpan> = {
  calendar: 'wide',
  offline: 'accent',
  users: 'std',
  wallet: 'std',
  stats: 'std',
  backup: 'std',
}

const FEATURE_ORDER: readonly FeatureIconId[] = [
  'calendar',
  'offline',
  'users',
  'wallet',
  'stats',
  'backup',
]

export function Features() {
  const { features } = fa
  const items = FEATURE_ORDER.map((icon) =>
    features.items.find((item) => item.icon === icon),
  ).filter((item): item is (typeof features.items)[number] => item != null)

  return (
    <Section id="features" title={features.title} subtitle={features.subtitle}>
      <ul className="feature-bento">
        {items.map((item, index) => {
          const Icon = FEATURE_ICONS[item.icon]
          const span = FEATURE_SPAN[item.icon]
          return (
            <li key={item.title} className={`feature-span-${span}`}>
              <FadeUp onView delayMs={index * 60}>
                <article className="feature-card">
                  <span className="feature-icon">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-pretty text-paper">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-sm leading-7 text-muted">
                    {item.description}
                  </p>
                </article>
              </FadeUp>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
