import { Addin } from '../types';
import { supabaseService } from './supabaseClient';

export interface AddinManifestInput {
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  category?: 'Excel Add-in' | 'Revit Add-in' | string;
  targetApplication: 'Microsoft Excel' | 'Autodesk Revit' | string;
  version: string;
  developer?: string;
  iconBgColor?: string;
  assemblyName?: string;
  manifestName?: string;
  releasePackage?: string;
  plans?: any[];
}

export const NETWORK_REPOSITORY_PATH = 'Z:\\09 PUBLIC SHARE\\Abubakar Chanda\\AddinsRepository\\';
export const LOCAL_REPOSITORY_PATH = 'C:\\Users\\Admin\\.gemini\\antigravity\\scratch\\AdminPanel\\addins_repository\\';

export const addinScanner = {
  // Parse raw JSON or manifest content dropped by developers
  parseAddinManifest(rawContent: string, fileName?: string): Addin | null {
    try {
      const parsed: AddinManifestInput = JSON.parse(rawContent);
      if (!parsed.name || !parsed.targetApplication || !parsed.version) {
        return null;
      }

      const now = new Date().toISOString();
      const slug = parsed.slug || parsed.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const id = parsed.id || `addin_${slug}`;

      const isExcel = parsed.targetApplication.toLowerCase().includes('excel') || parsed.category?.toLowerCase().includes('excel');
      const category = isExcel ? 'Excel Add-in' : 'Revit Add-in';
      const iconBgColor = parsed.iconBgColor || (isExcel ? 'bg-emerald-600' : 'bg-blue-600');

      const addin: Addin = {
        id,
        name: parsed.name,
        slug,
        description: parsed.description || `Compiled ${category} release package (${fileName || 'Developer Release Bundle'})`,
        category,
        targetApplication: parsed.targetApplication,
        version: parsed.version,
        developer: parsed.developer || 'Consistent Solutions',
        iconBgColor,
        status: 'active',
        createdAtUtc: now,
        updatedAtUtc: now,
        plans: parsed.plans || [
          {
            id: `plan_${slug}_pro`,
            name: 'Pro',
            priceYearly: isExcel ? 199 : 299,
            maxActivationsPerLicense: 5,
            features: isExcel ? ['TeamProductivityReport', 'LiveOrchestrator', 'ExcelDataSync'] : ['DWGExport', 'PDFExport', 'BatchExport']
          }
        ],
        stats: {
          totalCustomers: 0,
          totalLicenses: 0,
          activeLicenses: 0,
          activeDevices: 0,
          revokedLicenses: 0,
          securityEvents: 0
        }
      };

      return addin;
    } catch {
      return null;
    }
  },

  // Process File Object from UI Drag & Drop / File Browser
  async importAddinFromFile(file: File): Promise<{ success: boolean; addin: Addin | null; message: string }> {
    try {
      const content = await file.text();
      const addin = this.parseAddinManifest(content, file.name);

      if (!addin) {
        return {
          success: false,
          addin: null,
          message: `Could not parse valid compiled add-in metadata from "${file.name}". Please ensure it contains a valid addin.json manifest.`
        };
      }

      // Automatically register new compiled release bundle in Supabase PostgreSQL database
      await supabaseService.saveAddin(addin);

      return {
        success: true,
        addin,
        message: `Successfully imported "${addin.name}" (${addin.targetApplication} ${addin.version}) compiled release bundle to Supabase database!`
      };
    } catch (err: any) {
      return {
        success: false,
        addin: null,
        message: err.message || `Error reading file ${file.name}`
      };
    }
  }
};
