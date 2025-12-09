import { en_us } from './translations/en_us';
import { zh_cn } from './translations/zh_cn';
import { zh_tw } from './translations/zh_tw';

type SupportedLanguage = 'en_us' | 'zh_cn' | 'zh_tw';

type Translations = typeof en_us;

type TranslationPath = string;

class I18n {
  private currentLanguage: SupportedLanguage = 'en_us';
  private translations: Record<SupportedLanguage, Translations> = {
    en_us,
    zh_cn,
    zh_tw
  };

  constructor() {
    this.detectLanguage();
  }

  /**
   * Detect the user's preferred language from browser settings
   */
  private detectLanguage(): void {
    const browserLang = navigator.language.toLowerCase();
    
    if (browserLang.includes('zh-cn') || browserLang.includes('zh-sg')) {
      this.currentLanguage = 'zh_cn';
    } else if (browserLang.includes('zh-tw') || browserLang.includes('zh-hk')) {
      this.currentLanguage = 'zh_tw';
    } else {
      this.currentLanguage = 'en_us';
    }
  }

  /**
   * Set the current language
   */
  public setLanguage(lang: SupportedLanguage): void {
    this.currentLanguage = lang;
  }

  /**
   * Get the current language
   */
  public getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  /**
   * Translate a key with optional parameters
   * @param path - The translation path (e.g., 'dashboard.title')
   * @param params - Optional parameters for interpolation
   */
  public t(path: TranslationPath, params: Record<string, string | number> = {}): string {
    const keys = path.split('.');
    let value: any = this.translations[this.currentLanguage];

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${path}`);
      return path;
    }

    // Interpolate parameters
    return value.replace(/\{([^}]+)\}/g, (_, key) => {
      return params[key] !== undefined ? String(params[key]) : `{${key}}`;
    });
  }

  /**
   * Get all supported languages
   */
  public getSupportedLanguages(): SupportedLanguage[] {
    return Object.keys(this.translations) as SupportedLanguage[];
  }
}

// Create a singleton instance
export const i18n = new I18n();

export type { SupportedLanguage };
