import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import Sidebar from "@/app/components/sidebar";
import currentWar from '../../data/currentWar.json';

export default function Home() {
  const bigBadge = currentWar.clan.badgeUrls.large;

  return (
    <>
      <Sidebar />
      <div className="bg-gradient-to-tr from-zinc-950 to-zinc-900 ml-32 h-[100vh]">
        <img src={ bigBadge } className="mx-auto pt-12" />
        <h2 className="font-medium tracking-tight text-center text-5xl text-zinc-200">Xanthe BB</h2>
      </div>
    </>
  );
}
