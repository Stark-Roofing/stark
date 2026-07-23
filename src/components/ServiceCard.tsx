
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  delay?: number;
  dropdownItems?: { to: string; label: string; icon?: React.ReactNode }[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageUrl,
  link,
  delay = 0,
  dropdownItems
}) => {
  const isInternalLink = link.startsWith('/');

  // Wrapper with common styles. The entire card scales together as one unit
  // (a single "zoom"), and only when the trigger inside (dropdown button, or
  // the "Services" link in default mode) is hovered — not from hovering the
  // card at large, and not as a separate effect on the image — via the
  // `:has()`-based has-[] variant rather than a plain self-hover.
  // Also stays zoomed while the dropdown is open (Radix sets data-state="open"
  // on the trigger button), even after the pointer leaves the button — e.g.
  // while the user is hovering a menu item instead.
  const cardClasses = "service-card flex flex-col rounded-xl overflow-hidden shadow-md bg-white h-full group transition-transform duration-300 has-[button:hover,a:hover,button[data-state=open]]:scale-[1.03]";

  // The image + title + description block (shared between both variants).
  // Static — the zoom lives on the outer card as a whole, not on the image.
  const cardMedia = (
    <>
      <div className="relative h-56 flex-shrink-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent opacity-80"></div>
      </div>
    </>
  );

  // ── Dropdown variant ──────────────────────────────────────────────
  // The card is not navigable at all here — only the dropdown trigger and
  // its menu items are clickable. Root is a plain <div>; the image/title/
  // description are static, non-interactive content.
  if (dropdownItems) {
    return (
      <div
        className={cardClasses}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="flex flex-col flex-grow">
          {cardMedia}
          <div className="px-6 pt-6 text-center md:text-left flex flex-col flex-grow">
            <h3 className="text-xl font-heading font-bold text-navy mb-3">{title}</h3>
            <p className="text-charcoal/80 mb-4 flex-grow">{description}</p>
          </div>
        </div>
        <div className="px-6 pb-6 text-center md:text-left mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="group/trigger inline-flex items-center text-stark-red font-medium hover:text-navy transition-colors focus:outline-none"
              >
                Services
                <ChevronRight className="ml-1 transition-transform duration-300 group-hover/trigger:translate-x-1" size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white">
              {dropdownItems.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link to={item.to} className="flex items-center cursor-pointer">
                    {item.icon}
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  // ── Default variant ─────────────────────────────────────────────────
  // The card itself is not navigable — only the "Services" row at the
  // bottom is a link. Image/title/description are static, non-interactive.
  const servicesLinkClasses = "group/trigger inline-flex items-center text-stark-red font-medium hover:text-navy transition-colors mt-auto";
  const servicesLinkContent = (
    <>
      Services
      <ChevronRight className="ml-1 transition-transform duration-300 group-hover/trigger:translate-x-1" size={18} />
    </>
  );

  return (
    <div
      className={cardClasses}
      style={{ animationDelay: `${delay}ms` }}
    >
      {cardMedia}
      <div className="p-6 text-center md:text-left flex flex-col h-full">
        <h3 className="text-xl font-heading font-bold text-navy mb-3">{title}</h3>
        <p className="text-charcoal/80 mb-4 flex-grow">{description}</p>

        {isInternalLink ? (
          <Link to={link} className={servicesLinkClasses} aria-label={`Learn more about ${title}`}>
            {servicesLinkContent}
          </Link>
        ) : (
          <a href={link} className={servicesLinkClasses} aria-label={`Learn more about ${title}`}>
            {servicesLinkContent}
          </a>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
