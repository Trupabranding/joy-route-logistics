/**
 * Map Styling Module
 * ------------------
 * Centralised map colors / styles that resolve from the
 * --vr-map-* CSS variables defined in src/styles/tokens.css.
 *
 * Use the exported `mapTokens` object inside inline styles
 * for SVG strokes/fills, or use `mapStyleObject(variant)` to
 * get a ready-to-spread React.CSSProperties object.
 *
 * Electric Lime drives all "active" states across both themes.
 */

export type MapVariant = "default" | "compact" | "hero";

export const mapTokens = {
  canvas:        "var(--vr-map-canvas)",
  grid:          "var(--vr-map-grid)",
  route:         "var(--vr-map-route)",
  routeInactive: "var(--vr-map-route-inactive)",
  pickup:        "var(--vr-map-pickup)",
  dropoff:       "var(--vr-map-dropoff)",
  driver:        "var(--vr-map-driver)",
  driverRing:    "var(--vr-map-driver-ring)",
  vignette:      "var(--vr-map-vignette)",
} as const;

/** Vignette overlay (radial fade) — same in both themes via tokens. */
export const mapVignetteStyle: React.CSSProperties = {
  background: `radial-gradient(circle at center, transparent 50%, ${mapTokens.vignette})`,
};

/**
 * Returns CSS variable overrides that tweak map density / glow per variant.
 * Spread onto the map container's `style` prop.
 */
export function mapStyleObject(variant: MapVariant = "default"): React.CSSProperties {
  switch (variant) {
    case "compact":
      return {
        ["--vr-map-grid" as string]: "color-mix(in oklab, var(--vr-map-grid) 60%, transparent)",
      };
    case "hero":
      return {
        ["--vr-map-glow-a" as string]:
          "color-mix(in oklab, var(--vr-semantic-brand) 22%, transparent)",
      };
    default:
      return {};
  }
}

/** Active route stroke (Electric Lime, animated). */
export const mapActiveRouteProps = {
  className: "map-route",
  vectorEffect: "non-scaling-stroke",
} as const;

/** Inactive / completed route stroke. */
export const mapInactiveRouteProps = {
  className: "map-route-inactive",
  vectorEffect: "non-scaling-stroke",
} as const;
