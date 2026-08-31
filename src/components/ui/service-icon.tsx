import {
  Building2,
  Car,
  HardHat,
  Lightbulb,
  Milestone,
  Palette,
  Printer,
  SquareStack,
  Tags,
  Type,
  type LucideIcon,
} from "lucide-react";

/**
 * Hizmet ikonları statik olarak eşlenir.
 * Dinamik `lucide-react/dist/esm/icons/${name}` importu tüm kütüphaneyi
 * paketleyeceği için bilinçli olarak kullanılmadı.
 */
const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Type,
  Milestone,
  SquareStack,
  Building2,
  Car,
  Printer,
  Palette,
  Tags,
  HardHat,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Lightbulb;
  return <Icon className={className} aria-hidden="true" />;
}
