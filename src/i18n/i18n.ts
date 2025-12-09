import { en_us } from './translations/en_us';
import { zh_cn } from './translations/zh_cn';
import { zh_tw } from './translations/zh_tw';

type SupportedLanguage = 'en_us' | 'zh_cn' | 'zh_tw';

type Translations = typeof en_us;

type TranslationPath = string;

type LanguageChangeCallback = () => void;

class I18n {
  private currentLanguage: SupportedLanguage = 'en_us';
  private translations: Record<SupportedLanguage, Translations> = {
    en_us,
    zh_cn,
    zh_tw
  };
  private listeners: Set<LanguageChangeCallback> = new Set();
  private readonly LANGUAGE_KEY = 'app-language';

  constructor() {
    this.loadLanguage();
  }

  /**
   * Load language from localStorage or detect from browser settings
   */
  private loadLanguage(): void {
    // Try to load from localStorage first
    const savedLang = localStorage.getItem(this.LANGUAGE_KEY) as SupportedLanguage | null;
    if (savedLang && this.isSupportedLanguage(savedLang)) {
      this.currentLanguage = savedLang;
      return;
    }

    // Fallback to browser language
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
   * Check if a language is supported
   */
  private isSupportedLanguage(lang: string): lang is SupportedLanguage {
    return Object.keys(this.translations).includes(lang);
  }

  /**
   * Set the current language
   */
  public setLanguage(lang: SupportedLanguage): void {
    if (this.currentLanguage !== lang) {
      this.currentLanguage = lang;
      localStorage.setItem(this.LANGUAGE_KEY, lang);
      this.notifyListeners();
    }
  }

  /**
   * Get the current language
   */
  public getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  /**
   * Subscribe to language change events
   */
  public onLanguageChange(callback: LanguageChangeCallback): () => void {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Notify all listeners that language has changed
   */
  private notifyListeners(): void {
    this.listeners.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in language change callback:', error);
      }
    });
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
   * Get all supported languages with display names
   */
  public getSupportedLanguages(): { code: SupportedLanguage; name: string }[] {
    return [
      { code: 'en_us', name: 'English (US)' },
      { code: 'zh_cn', name: '中文 (简体)' },
      { code: 'zh_tw', name: '中文 (繁体)' }
    ];
  }
}

// Create a singleton instance
export const i18n = new I18n();

export type { SupportedLanguage };
