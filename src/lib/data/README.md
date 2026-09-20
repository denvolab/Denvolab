# `data/` — Content, With Tomorrow's Admin Panel in Mind

| File | Holds |
|---|---|
| `navigation.ts` | The header's nav links + "Become a Client" button. |
| `footer.ts` | The footer's four link columns. |

## Why every function here is `async`, even though it doesn't need to be yet

```ts
export async function getPrimaryNavigation(): Promise<NavLink[]> {
  return PRIMARY_NAV; // hardcoded for now
}
```

Right now this just hands back a hardcoded list — there's no admin panel yet. But `Header`/`Footer` already `await` these functions. That's deliberate: **the day the admin panel exists, this becomes:**

```ts
export async function getPrimaryNavigation(): Promise<NavLink[]> {
  const res = await fetch(`${process.env.API_URL}/navigation`);
  return res.json();
}
```

...and nothing in `components/` needs to change at all, because it was always calling this function the same way. This is the whole point of keeping content in `lib/data/` instead of writing it directly inside the header/footer components.
