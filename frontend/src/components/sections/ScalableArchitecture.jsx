import { Cog, Database, DatabaseBackup, ListOrdered, Network, Plus, Server, Users } from 'lucide-react'
import { profile } from '../../data/profile.js'

// Decorative hero diagram of a scalable web app:
// users → load balancer → horizontally scaled app servers → message queue + workers,
// and a vertically scaled primary database with read replicas.
// Dots travelling along the connectors represent requests.

const ACCENT = 'var(--color-accent)'
const LINE = '#d4d4d8'

function Box({ x, y, w, h, title, sub, icon: Icon, dashed = false }) {
  const textX = Icon ? x + 34 : x + w / 2
  const anchor = Icon ? 'start' : 'middle'
  const titleY = sub ? y + h / 2 - 2 : y + h / 2 + 4
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill={dashed ? 'transparent' : '#fff'}
        stroke={dashed ? '#c4c4c8' : 'var(--color-line)'}
        strokeDasharray={dashed ? '4 4' : undefined}
        filter={dashed ? undefined : 'url(#node-shadow)'}
      />
      {Icon && <Icon x={x + 11} y={y + h / 2 - 8} size={16} color={ACCENT} strokeWidth={2} />}
      <text x={textX} y={titleY} textAnchor={anchor} fontSize="11.5" fontWeight="600" fill={dashed ? '#71717a' : 'var(--color-ink)'}>
        {title}
      </text>
      {sub && (
        <text x={textX} y={titleY + 13} textAnchor={anchor} fontSize="9.5" fill="#71717a">
          {sub}
        </text>
      )}
    </g>
  )
}

// A request dot moving along `path`, starting after `delay` seconds.
function Flow({ path, delay = 0, dur = 2.4 }) {
  return (
    <circle r="3.2" fill={ACCENT} opacity="0">
      <animateMotion path={path} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
  )
}

const appCenters = [58, 156, 254]
const routes = {
  usersToLb: 'M210 38 V66',
  lbToApps: appCenters.map((cx) => `M210 102 V118 H${cx} V134`),
  appsToQueue: 'M58 172 V206 H105 V222',
  appsToDb: 'M156 172 V206 H315 V222',
  queueToWorkers: 'M105 268 V300',
}

function Diagram({ animate }) {
  return (
    <svg viewBox="0 0 420 348" className="h-auto w-full font-sans" role="img" aria-labelledby="arch-title arch-desc">
      <title id="arch-title">Scalable web application architecture</title>
      <desc id="arch-desc">
        Users reach a load balancer that spreads traffic across horizontally scaled app servers. The servers hand
        background work to a message queue processed by workers, and store data in a vertically scaled primary
        database with read replicas.
      </desc>
      <defs>
        <filter id="node-shadow" x="-10%" y="-20%" width="120%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* connectors */}
      <g fill="none" stroke={LINE} strokeWidth="1.25">
        <path d={routes.usersToLb} />
        {routes.lbToApps.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d="M58 172 V206 M156 172 V206 M254 172 V206 M58 206 H315 M105 206 V222 M315 206 V222" />
        <path d={routes.queueToWorkers} />
        <path d="M267 284 V304 M363 284 V304" strokeDasharray="3 3" />
        <path d="M280 118 H357 V134" strokeDasharray="4 4" />
      </g>

      <Box x={165} y={8} w={90} h={30} title="Users" icon={Users} />
      <Box x={140} y={66} w={140} h={36} title="Load balancer" icon={Network} />

      {appCenters.map((cx, i) => (
        <Box key={cx} x={cx - 44} y={134} w={88} h={38} title="App" sub={`instance ${i + 1}`} icon={Server} />
      ))}
      <g>
        <rect x={310} y={134} width={96} height={38} rx="10" fill="transparent" stroke="#c4c4c8" strokeDasharray="4 4" />
        <Plus x={320} y={145} size={16} color="#a1a1aa" />
        <text x={342} y={151} fontSize="11" fontWeight="600" fill="#71717a">
          scale out
        </text>
        <text x={342} y={164} fontSize="9.5" fill="#a1a1aa">
          horizontal ↔
        </text>
      </g>

      {/* message queue with slots */}
      <g>
        <rect x={14} y={222} width={182} height={46} rx="10" fill="#fff" stroke="var(--color-line)" filter="url(#node-shadow)" />
        <ListOrdered x={25} y={229} size={16} color={ACCENT} />
        <text x={48} y={241} fontSize="11.5" fontWeight="600" fill="var(--color-ink)">
          Message queue
        </text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={48 + i * 14} y={250} width={10} height={10} rx="2.5" fill={i < 3 ? ACCENT : '#e4e4e7'} opacity={i < 3 ? 0.55 + i * 0.15 : 1}>
            {animate && i < 3 && (
              <animate attributeName="opacity" values="0.35;1;0.35" dur="1.8s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            )}
          </rect>
        ))}
      </g>
      <Box x={14} y={300} w={182} h={40} title="Workers" sub="background jobs" icon={Cog} />

      {/* primary database with growing resource bars (vertical scaling) */}
      <g>
        <rect x={224} y={222} width={182} height={62} rx="10" fill="#fff" stroke="var(--color-line)" filter="url(#node-shadow)" />
        <Database x={235} y={232} size={16} color={ACCENT} />
        <text x={258} y={244} fontSize="11.5" fontWeight="600" fill="var(--color-ink)">
          Primary DB
        </text>
        <text x={258} y={258} fontSize="9.5" fill="#71717a">
          vertical scaling ↑
        </text>
        <text x={258} y={273} fontSize="8.5" letterSpacing="0.5" fill="#a1a1aa" className="font-mono">
          CPU · RAM · IOPS
        </text>
        {[
          { x: 368, base: 18, peak: 34 },
          { x: 379, base: 24, peak: 40 },
          { x: 390, base: 14, peak: 30 },
        ].map(({ x, base, peak }, i) => (
          <rect key={x} x={x} y={274 - base} width={7} height={base} rx="2" fill={ACCENT} opacity={0.45 + i * 0.2}>
            {animate && (
              <>
                <animate attributeName="height" values={`${base};${peak};${base}`} dur="3.2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                <animate attributeName="y" values={`${274 - base};${274 - peak};${274 - base}`} dur="3.2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
              </>
            )}
          </rect>
        ))}
      </g>
      <Box x={224} y={304} w={86} h={36} title="Replica" icon={DatabaseBackup} />
      <Box x={320} y={304} w={86} h={36} title="Replica" icon={DatabaseBackup} />

      {animate && (
        <g>
          <Flow path={routes.usersToLb} dur={1.2} />
          {routes.lbToApps.map((d, i) => (
            <Flow key={d} path={d} delay={0.6 + i * 0.5} />
          ))}
          <Flow path={routes.appsToQueue} delay={1.4} dur={2} />
          <Flow path={routes.appsToDb} delay={2.1} dur={2.2} />
          <Flow path={routes.queueToWorkers} delay={2.6} dur={1.4} />
        </g>
      )}
    </svg>
  )
}

export default function ScalableArchitecture() {
  const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <figure className="rise w-full max-w-md" style={{ '--rise-delay': '320ms' }}>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.16em] text-subtle uppercase">System design</p>
        {profile.openToWork && (
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Open to opportunities
          </p>
        )}
      </div>
      <div className="rounded-2xl border border-line bg-white/60 p-3 backdrop-blur-[2px] sm:p-4">
        <Diagram animate={animate} />
      </div>
      <figcaption className="mt-4 text-center font-display text-lg text-muted italic">Built to grow with its users.</figcaption>
    </figure>
  )
}
