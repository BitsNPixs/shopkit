// ═══════════════════════════════════════════════════════════════════════════
// THE CLASS CONTRACT — single source of every sk- class the React layer emits.
// ───────────────────────────────────────────────────────────────────────────
// Components build their className strings ONLY from this module; they never
// inline a "sk-…" literal. `scripts/parity.mjs` imports the compiled form of
// this file and asserts every value below exists as a real selector in
// dist/shopkit.css — so the React layer can never drift from the CSS.
//
// PREFIX must match the CSS build (scss/_config.scss `$prefix`, default "sk").
// ═══════════════════════════════════════════════════════════════════════════
export const PREFIX = "sk";

const p = (name: string): string => `${PREFIX}-${name}`;

export const cls = {
  // ── Button + group ──
  btn: p("btn"),
  btnVariant: {
    accent: p("btn--accent"),
    secondary: p("btn--secondary"),
    outline: p("btn--outline"),
    ghost: p("btn--ghost"),
    soft: p("btn--soft"),
    danger: p("btn--danger"),
    success: p("btn--success"),
    link: p("btn--link"),
  },
  btnSize: { sm: p("btn--sm"), lg: p("btn--lg") },
  btnBlock: p("btn--block"),
  btnPill: p("btn--pill"),
  btnIcon: p("btn--icon"),
  btnLoading: p("btn--loading"),
  btnGroup: p("btn-group"),
  btnGroupVertical: p("btn-group--vertical"),

  // ── Badge + chip ──
  badge: p("badge"),
  badgeVariant: {
    primary: p("badge--primary"),
    success: p("badge--success"),
    danger: p("badge--danger"),
    warning: p("badge--warning"),
    info: p("badge--info"),
    sale: p("badge--sale"),
    new: p("badge--new"),
    bestseller: p("badge--bestseller"),
    outline: p("badge--outline"),
  },
  badgePill: p("badge--pill"),
  badgeDot: p("badge__dot"),
  chip: p("chip"),
  chipRemove: p("chip__remove"),

  // ── Alert ──
  alert: p("alert"),
  alertVariant: {
    success: p("alert--success"),
    warning: p("alert--warning"),
    danger: p("alert--danger"),
    info: p("alert--info"),
  },
  alertIcon: p("alert__icon"),
  alertBody: p("alert__body"),
  alertTitle: p("alert__title"),
  alertClose: p("alert__close"),

  // ── Form controls ──
  input: p("input"),
  inputSize: { sm: p("input--sm"), lg: p("input--lg") },
  textarea: p("textarea"),
  select: p("select"),
  selectSize: { sm: p("select--sm"), lg: p("select--lg") },
  checkbox: p("checkbox"),
  radio: p("radio"),
  switch: p("switch"),
  check: p("check"),
  label: p("label"),
  labelReq: p("label__req"),
  help: p("help"),
  error: p("error"),
  field: p("field"),
  fieldset: p("fieldset"),
  legend: p("legend"),

  // ── Price ──
  price: p("price"),
  priceSale: p("price--sale"),
  priceSize: { sm: p("price--sm"), lg: p("price--lg") },
  priceNow: p("price__now"),
  priceWas: p("price__was"),
  priceOff: p("price__off"),
  priceSep: p("price__sep"),

  // ── Rating ──
  rating: p("rating"),
  ratingSize: { sm: p("rating--sm"), lg: p("rating--lg") },
  ratingCount: p("rating__count"),

  // ── Swatches ──
  swatches: p("swatches"),
  swatch: p("swatch"),
  swatchSize: p("swatch--size"),

  // ── Stepper ──
  stepper: p("stepper"),
  stepperSize: { sm: p("stepper--sm"), lg: p("stepper--lg") },
  stepperBtn: p("stepper__btn"),
  stepperInput: p("stepper__input"),

  // ── Wishlist ──
  wishlist: p("wishlist"),

  // ── Product card ──
  card: p("product-card"),
  cardVariant: {
    horizontal: p("product-card--horizontal"),
    compact: p("product-card--compact"),
    flat: p("product-card--flat"),
  },
  cardMedia: p("product-card__media"),
  cardImg: p("product-card__img"),
  cardBadges: p("product-card__badges"),
  cardWishlist: p("product-card__wishlist"),
  cardBody: p("product-card__body"),
  cardEyebrow: p("product-card__eyebrow"),
  cardTitle: p("product-card__title"),
  cardLink: p("product-card__link"),
  cardMeta: p("product-card__meta"),
  cardActions: p("product-card__actions"),

  // ── Breadcrumb ──
  breadcrumbList: p("breadcrumb__list"),
  breadcrumbItem: p("breadcrumb__item"),
  breadcrumbLink: p("breadcrumb__link"),

  // ── Pagination ──
  pagination: p("pagination"),
  paginationLink: p("pagination__link"),
  paginationEllipsis: p("pagination__ellipsis"),

  // ── Skeleton ──
  skeleton: p("skeleton"),
  skeletonVariant: {
    text: p("skeleton--text"),
    title: p("skeleton--title"),
    circle: p("skeleton--circle"),
    block: p("skeleton--block"),
  },

  // ── Modal ──
  modal: p("modal"),
  modalSize: { sm: p("modal--sm"), lg: p("modal--lg") },
  modalPanel: p("modal__panel"),
  modalHeader: p("modal__header"),
  modalTitle: p("modal__title"),
  modalClose: p("modal__close"),
  modalBody: p("modal__body"),
  modalFooter: p("modal__footer"),

  // ── Tabs ──
  tabs: p("tabs"),
  tabsPill: p("tabs--pill"),
  tabsList: p("tabs__list"),
  tab: p("tab"),
  tabsPanel: p("tabs__panel"),

  // ── Accordion ──
  accordion: p("accordion"),
  accordionItem: p("accordion__item"),
  accordionTrigger: p("accordion__trigger"),
  accordionMarker: p("accordion__marker"),
  accordionPanel: p("accordion__panel"),
} as const;

// The `data-sk-tooltip` attribute family (attribute-driven, not a class).
export const attr = {
  tooltip: `data-${PREFIX}-tooltip`,
  tooltipPos: `data-${PREFIX}-tooltip-pos`,
} as const;
