type Placement = "top-right" | "right" | "bottom-right";

/**
 * Halo « Le Club Privé » — lumière radiale décentrée qui respire.
 * Remplace les photos : atmosphère ton sur ton + grain, jamais centré.
 * À poser dans un conteneur `relative overflow-hidden`. Décoratif (aria-hidden).
 */
export function Halo({ placement = "top-right" }: { placement?: Placement }) {
  return (
    <div className="wal-aura" aria-hidden="true">
      <div className="wal-aura__halo" data-pos={placement} />
      <div className="wal-aura__grain" />
    </div>
  );
}
