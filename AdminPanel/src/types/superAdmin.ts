export type AddinStatus = 'active' | 'maintenance' | 'deprecated';

export interface AddinPlan {
  id: string;
  name: string; // e.g. 'Standard', 'Pro', 'Enterprise'
  priceYearly: number; // e.g. 199
  maxActivationsPerLicense: number; // e.g. 5
  features: string[];
}

export interface Addin {
  id: string;
  name: string; // e.g. 'SheetExport Pro'
  slug: string; // e.g. 'sheet-export'
  category: string; // e.g. 'BIM & CAD Export', 'Document Sync'
  targetApplication: string; // e.g. 'Autodesk Revit & AutoCAD'
  version: string; // e.g. 'v2.4.0'
  description: string;
  developer: string; // e.g. 'Abubakar Chanda / Core BIM Team'
  iconBgColor: string; // e.g. 'bg-amber-500' or 'bg-blue-600'
  status: AddinStatus;
  createdAtUtc: string;
  updatedAtUtc: string;
  plans: AddinPlan[];
  stats: {
    totalCustomers: number;
    totalLicenses: number;
    activeLicenses: number;
    activeDevices: number;
    revokedLicenses: number;
    securityEvents: number;
  };
}

export interface GlobalStats {
  totalAddins: number;
  activeAddins: number;
  totalCustomers: number;
  totalLicenses: number;
  totalActiveLicenses: number;
  totalActiveDevices: number;
  totalSecurityEvents: number;
}
