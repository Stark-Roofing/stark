
import React from 'react';
import { Phone, Droplets, Percent, Home, Wrench, Layers, Camera, Building2, AppWindow, Sun, LayoutGrid } from 'lucide-react';
import { DropdownItem } from './NavDropdown';

export const getRoofingItems = (): DropdownItem[] => [
  {
    to: "/roof-replacement",
    icon: <Home size={14} className="mr-2" />,
    label: "Roof Replacement"
  },
  {
    to: "/roof-repair",
    icon: <Wrench size={14} className="mr-2" />,
    label: "Roof Repair"
  },
  {
    to: "/roof-cleaning",
    icon: <Droplets size={14} className="mr-2" />,
    label: "Roof Cleaning"
  }
];

export const getGutterItems = (): DropdownItem[] => [
  {
    to: "/gutter-replacement",
    icon: <Layers size={14} className="mr-2" />,
    label: "Gutters Replacement"
  },
  {
    to: "/gutter-repair",
    icon: <Wrench size={14} className="mr-2" />,
    label: "Gutter Repair"
  }
];

export const getSkylightItems = (): DropdownItem[] => [
  {
    to: "/skylights",
    label: "Skylights Overview"
  }
];

export const getServicesItems = (): DropdownItem[] => [
  {
    to: "/our-projects",
    icon: <Camera size={14} className="mr-2" />,
    label: "Our Projects"
  },
  {
    to: "/about",
    label: "About Us"
  },
  {
    to: "/warranty",
    label: "Warranty"
  },
  {
    to: "/blog",
    label: "Blog"
  }
];

// Standalone data for the desktop top-bar "Services" dropdown.
// Deliberately separate from getRoofingItems/getGutterItems/getSkylightItems,
// which are still used by the homepage service-card dropdowns and must not change.
export const getAllServicesDropdownItems = (): DropdownItem[] => [
  {
    to: "/roof-replacement",
    icon: <Home size={14} className="mr-2" />,
    label: "Roof Replacement"
  },
  {
    to: "/roof-repair",
    icon: <Wrench size={14} className="mr-2" />,
    label: "Roof Repair"
  },
  {
    to: "/roof-cleaning",
    icon: <Droplets size={14} className="mr-2" />,
    label: "Roof Cleaning"
  },
  {
    to: "/commercial-roofing",
    icon: <Building2 size={14} className="mr-2" />,
    label: "Commercial Roofing"
  },
  {
    to: "/gutter-replacement",
    icon: <Layers size={14} className="mr-2" />,
    label: "Gutter Replacement"
  },
  {
    to: "/gutter-repair",
    icon: <Wrench size={14} className="mr-2" />,
    label: "Gutter Repair"
  },
  {
    to: "/window-replacement",
    icon: <AppWindow size={14} className="mr-2" />,
    label: "Window Replacement"
  },
  {
    to: "/skylights",
    icon: <Sun size={14} className="mr-2" />,
    label: "Skylight Installation"
  },
  {
    to: "/siding-installation",
    icon: <LayoutGrid size={14} className="mr-2" />,
    label: "Siding Installation"
  }
];

export const getMenuItems = (): DropdownItem[] => [
  {
    to: "/our-projects",
    label: "Our Projects"
  },
  {
    to: "/warranty",
    label: "Warranty Info"
  },
  {
    to: "/finance",
    label: "Financing Help"
  },
  {
    to: "/about",
    label: "About Us"
  },
  {
    to: "/blog",
    label: "Blog"
  }
];

export const getServiceAreasItems = (): DropdownItem[] => [
  {
    to: "/service-area/seattle",
    label: "Seattle"
  },
  {
    to: "/service-area/bellevue",
    label: "Bellevue"
  },
  {
    to: "/service-area/sammamish",
    label: "Sammamish"
  },
  {
    to: "/service-area/redmond",
    label: "Redmond"
  },
  {
    to: "/service-area/kirkland",
    label: "Kirkland"
  },
  {
    to: "/service-area/issaquah",
    label: "Issaquah"
  },
  {
    to: "/service-area/woodinville",
    label: "Woodinville"
  },
  {
    to: "/service-area/renton",
    label: "Renton"
  },
  {
    to: "/service-area/everett",
    label: "Everett"
  },
  {
    to: "/service-area/lynnwood",
    label: "Lynnwood"
  },
  {
    to: "/service-area/bothell",
    label: "Bothell"
  },
  {
    to: "/service-area/tacoma",
    label: "Tacoma"
  },
  {
    to: "/service-area/maple-valley",
    label: "Maple Valley"
  }
];
