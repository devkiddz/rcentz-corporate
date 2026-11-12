import { ArrowUpRight, Boxes, Cable, CirclePlay, DatabaseZap, FileStack, Workflow } from 'lucide-react';

const integrationItems = [
  'Websites',
  'Web applications',
  'Client systems',
  'Digital products'
];

const commandItems = [
  'Scope a business platform',
  'Launch a customer-facing product',
  'Design a connected digital workflow'
];

const capabilityCards = [
  { icon: Workflow, label: 'System flow', value: 'Architecture + delivery' },
  { icon: DatabaseZap, label: 'Core layer', value: 'Data, logic & experience' },
  { icon: FileStack, label: 'Output', value: 'Clear implementation path' }
];

export default function HeroArchitecturePanel() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] xl:max-w-none">
      <div
        aria-hidden="true"
        className="absolute inset-x-8 top-12 h-40 rounded-full bg-primary/12 blur-[90px]"
      />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#090b11]/95 shadow-[0_30px_120px_rgb(0_0_0/0.45)]">
        <div className="border-b border-white/10 bg-white/[0.02] px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100/70">
                RCENTZ ARCHITECTURE
              </p>
              <p className="mt-1 text-sm font-medium text-foreground/90">
                Structured digital delivery for businesses and products
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-blue-100">
              <Cable size={12} className="text-primary" />
              Connected ecosystem
            </div>
          </div>
        </div>

        <div className="grid gap-0 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-white/10 p-5 sm:p-6 xl:border-b-0 xl:border-r">
            <div className="rounded-3xl border border-white/10 bg-[#0b1019] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100/70">
                  Build pipeline
                </p>

                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-muted-foreground">
                  <CirclePlay size={12} />
                  Active
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {capabilityCards.map(card => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.label}
                      className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <div className="absolute inset-y-0 left-0 w-1 bg-primary/70" />
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                          <Icon size={18} />
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100/70">
                            {card.label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">{card.value}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-3xl border border-primary/15 bg-primary/8 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <Boxes size={18} />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100/70">
                      Delivery output
                    </p>
                    <p className="mt-1 text-sm text-foreground/90">
                      Systems, products and solutions aligned under one company structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="rounded-3xl border border-white/10 bg-[#0b1019] p-4 sm:p-5">
              <div className="rounded-2xl border border-primary/15 bg-primary/[0.08] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100/70">
                  Configure with Rcentz
                </p>

                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground/90">
                  Build a digital system that supports business operations, customer experience and future scale.
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  We engineer practical solutions that make sense for your stage of business.
                </p>
              </div>

              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100/70">
                  Typical outputs
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {integrationItems.map(item => (
                    <span
                      key={item}
                      className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-foreground/85">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100/70">
                  Example directions
                </p>

                <div className="mt-3 space-y-2">
                  {commandItems.map(item => (
                    <div
                      key={item}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-[#080b12] px-3.5 py-3 text-sm text-foreground/90">
                      <span>{item}</span>
                      <ArrowUpRight size={15} className="text-primary" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/5" />
      </div>
    </div>
  );
}
