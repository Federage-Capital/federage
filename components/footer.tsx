import Link from "next/link"
import { DrupalMenuLinkContent } from "next-drupal"
import Menu2 from "components/menu";

interface FooterProps {
  links: DrupalMenuLinkContent[]
}

export function Footer({ links }: FooterProps) {
  return (
    <footer className="white">
      <div className="container max-w-screen-md px-6 mx-auto">
        <div className="flex-col items-center justify-between text-sm md:flex-row">
    <Menu2 />
        <li className="liste-footer bold">  Federage, groupement d’intérêt économique basé à Paris 🇫🇷</li>
        </div>
      </div>
    </footer>
  )
}
