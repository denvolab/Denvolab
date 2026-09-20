// ---------------------------------------------------------------------------
// Shared shapes for header/footer navigation. Kept identical to the response
// shape the future admin-panel API will return, so swapping the data source
// in lib/data/* from a local constant to a `fetch()` call requires no change
// here or in the components that consume it.
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
  /** Opens in a new tab (external profiles, socials, etc). */
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
