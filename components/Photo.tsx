import { PHOTOS } from "@/content/photo-manifest";
import Image from "next/image";

export function photoExists(slot: string) {
  return PHOTOS.includes(slot);
}
type P = { slot: string; alt: string; ratio?: string; cap?: string; priority?: boolean; sizes?: string; bw?: boolean; className?: string; style?: React.CSSProperties; scrim?: boolean };
/** A graded photograph. If the file isn't in /public/images yet, the grey placeholder shows with its caption. */
export function Photo({ slot, alt, ratio = "4 / 3", cap, priority, sizes = "(max-width: 900px) 100vw, 50vw", bw, className = "", style, scrim }: P) {
  const has = photoExists(slot);
  const base: React.CSSProperties = { aspectRatio: ratio, width: "100%", ...style };
  if (!has) {
    return <div className={`photo ${className}`} style={base} role="img" aria-label={alt}><span className="cap">Photo · {cap ?? alt}</span></div>;
  }
  return (
    <div className={`graded ${bw ? "bw" : ""} ${className}`} style={base}>
      <Image src={`/images/${slot}.jpg`} alt={alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : "lazy"} />
      {scrim && <span className="scrim" />}
    </div>
  );
}
type PP = { slot: string; name: string; ini: string; cap?: string; children?: React.ReactNode };
export function PortraitBox({ slot, name, ini, cap = "Portrait", children }: PP) {
  const has = photoExists(slot);
  return (
    <div className={`portrait ${has ? "graded" : ""}`}>
      {has ? <Image src={`/images/${slot}.jpg`} alt={`Portrait of ${name}`} fill sizes="(max-width: 700px) 50vw, 25vw" loading="lazy" /> : <><span className="ini" aria-hidden="true">{ini}</span><span className="cap">{cap}</span></>}
      {children}
    </div>
  );
}
export function AvatarImg({ slot, ini, name, lg }: { slot?: string; ini: string; name: string; lg?: boolean }) {
  const has = slot ? photoExists(slot) : false;
  return <span className={`avatar ${lg ? "lg" : ""}`} title={name}>{has ? <Image src={`/images/${slot}.jpg`} alt="" width={lg ? 72 : 40} height={lg ? 72 : 40} /> : <span aria-hidden="true">{ini}</span>}</span>;
}
