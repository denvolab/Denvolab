import { HomeClosing } from "@/components/sections/home-chrome/home-chrome";
import "@/app/home.css";

/** Every route uses the current Figma footer. SitePage renders its own closing. */
export function Footer() {
  return <HomeClosing invitation={false} />;
}
