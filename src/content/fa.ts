/**
 * All page text lives here, in Persian only.
 * Components read from this file so copy can be changed in one place.
 */

export type FeatureIconId = 'calendar' | 'users' | 'wallet' | 'stats' | 'offline' | 'backup'

export interface FeatureItem {
  readonly icon: FeatureIconId
  readonly title: string
  readonly description: string
}

export const fa = {
  meta: {
    title: 'دیپی — دفتر کارگر، آفلاین',
    description:
      'دیپی الان فقط برای کارگر است. روزکار و پرداخت را روی تقویم شمسی ثبت کن. برنامه کارفرما جدا می‌آید.',
    siteName: 'دیپی',
  },

  skipToContent: 'پرش به محتوای اصلی',

  nav: {
    brand: 'دیپی',
    features: 'ویژگی‌ها',
    screenshots: 'تصاویر',
    download: 'دانلود',
    install: 'نصب',
    openSource: 'متن‌باز',
    menu: 'منو',
    ariaLabel: 'ناوبری اصلی',
  },

  hero: {
    title: 'دیپی',
    badge: 'فقط برای کارگر',
    tagline: 'دفتر کار و پرداخت آفلاین برای کارگر.',
    description:
      'روزهای کاری و پرداخت‌ها را روی تقویم شمسی ثبت کن و بدان هر کارفرما چقدر بدهکار است. این نسخه برای کارفرما نیست.',
    downloadCta: 'دانلود نسخه کارگر',
    fromSize: 'از',
    installGuideCta: 'راهنمای نصب',
    versionLabel: 'نسخه',
    sizeLabel: 'حجم فایل',
    releasedLabel: 'تاریخ انتشار',
    releaseUnavailable: 'اطلاعات آخرین نسخه در دسترس نیست.',
    releaseLoading: 'در حال خواندن اطلاعات آخرین نسخه…',
    themeDark: 'حالت تیره',
    themeLight: 'حالت روشن',
  },

  features: {
    title: 'ویژگی‌ها',
    subtitle: 'حساب‌وکتاب روزانه کارگر، بدون پیچیدگی.',
    items: [
      {
        icon: 'calendar',
        title: 'تقویم کار',
        description: 'هر روز کاری را روی تقویم شمسی ثبت کن؛ رنگ هر روز، رنگ همان کارفرماست.',
      },
      {
        icon: 'users',
        title: 'کارفرماهایت',
        description: 'کارفرماهایی که براشان کار می‌کنی را ثبت کن؛ حساب هرکدام جدا می‌ماند.',
      },
      {
        icon: 'wallet',
        title: 'پرداخت‌ها و مانده‌حساب',
        description: 'پرداخت هر کارفرما را ثبت کن و مانده‌حساب را یک‌نگاه ببین.',
      },
      {
        icon: 'stats',
        title: 'آمار',
        description: 'جمع روزها، دستمزد و پرداخت‌ها، همراه با نمودار ماهانه و کارت هر کارفرما.',
      },
      {
        icon: 'offline',
        title: 'کاملاً آفلاین و بدون ثبت‌نام',
        description: 'بدون اینترنت و بدون حساب کاربری کار می‌کند؛ نصب کن و همان لحظه شروع کن.',
      },
      {
        icon: 'backup',
        title: 'پشتیبان‌گیری خودکار روی گوشی',
        description: 'هر ۱۲ ساعت یک فایل پشتیبان JSON روی حافظهٔ گوشی ساخته می‌شود.',
      },
    ] satisfies readonly FeatureItem[],
  },

  screenshots: {
    title: 'تصاویر برنامه',
    subtitle: 'نمایی از صفحه‌های اصلی دیپی.',
    previous: 'تصویر قبلی',
    next: 'تصویر بعدی',
    themeDark: 'تیره',
    themeLight: 'روشن',
    themeAuto: 'خودکار',
    themeAria: 'انتخاب ظاهر تصاویر',
  },

  download: {
    title: 'دانلود نسخه کارگر',
    subtitle: 'این فایل فقط برای کارگر است. کارفرما باید منتظر برنامهٔ جدا بماند.',
    audienceNote: 'کارفرما این فایل را نصب نکند. نسخهٔ کارفرما بعداً جدا منتشر می‌شود.',
    button: 'دانلود فایل APK کارگر',
    choose:
      'سه فایل هست. اگر نمی‌دانی گوشی‌ات کدام است، نسخهٔ همگانی را بگیر. گوشی‌های جدید معمولاً با نسخهٔ ۶۴بیتی سبک‌تر راه می‌افتند.',
    variants: {
      universal: {
        title: 'همگانی',
        abi: 'Universal',
        devices: 'روی همهٔ گوشی‌های اندروید نصب می‌شود. حجمش بیشتر است؛ اگر مطمئن نیستی همین را بگیر.',
        button: 'دانلود نسخهٔ همگانی',
      },
      v8: {
        title: '۶۴بیتی',
        abi: 'arm64-v8a',
        devices: 'برای تقریباً همهٔ گوشی‌های چند سال اخیر. حجم کمتر از نسخهٔ همگانی.',
        button: 'دانلود نسخهٔ ۶۴بیتی',
      },
      v7: {
        title: '۳۲بیتی',
        abi: 'armeabi-v7a',
        devices: 'برای گوشی‌های قدیمی‌تر که نسخهٔ ۶۴بیتی را نصب نمی‌کنند.',
        button: 'دانلود نسخهٔ ۳۲بیتی',
      },
    },
    openRelease: 'دانلود از صفحهٔ انتشار',
    installGuideLink: 'افتادن به راهنمای نصب',
    versionLabel: 'نسخه',
    sizeLabel: 'حجم فایل',
    releasedLabel: 'تاریخ انتشار',
    shaLabel: 'SHA-256',
    loading: 'در حال خواندن اطلاعات آخرین نسخه…',
    unavailable:
      'اطلاعات آخرین نسخه الان در دسترس نیست. نسخهٔ همگانی را از گیت‌هاب بگیر؛ نسخه‌های ۶۴بیتی و ۳۲بیتی هم همان‌جا هستند.',
    shaUnavailable: 'مقدار SHA-256 برای این نسخه در دسترس نیست.',
    directLinkNote: 'لینک همگانی همیشه به آخرین نسخهٔ منتشرشده وصل است.',
  },

  install: {
    title: 'راهنمای نصب',
    subtitle: 'اگر کارگر هستی، دیپی را در سه گام ساده نصب کن.',
    steps: [
      {
        title: 'فایل را دانلود کن',
        description:
          'از بخش دانلود، فایل مناسب گوشی‌ات را بگیر: همگانی، ۶۴بیتی یا ۳۲بیتی. اگر مطمئن نیستی، همگانی را انتخاب کن.',
      },
      {
        title: 'اجازهٔ نصب از این منبع را روشن کن',
        description:
          'اگر گوشی اجازه خواست، برای مرورگر یا برنامهٔ فایل‌ها گزینهٔ «نصب از این منبع» را روشن کن.',
      },
      {
        title: '«More details» و بعد «Install anyway»',
        description:
          'اگر هشدار Play Protect دیدی، «More details» و سپس «Install anyway» را بزن و در پایان «نصب» را انتخاب کن.',
      },
    ],
    warningNote:
      'این هشدار طبیعی است، چون دیپی از فروشگاه اپ اندروید نصب نمی‌شود. برنامه هیچ تغییری در گوشی تو نمی‌دهد و کاملاً آفلاین کار می‌کند.',
    sha: {
      title: 'بررسی SHA-256 (اختیاری)',
      description:
        'برای اطمینان از سالم بودن فایل، SHA-256 همان نسخه‌ای را که دانلود کردی با مقدار نمایش‌داده‌شده در کارت دانلود مقایسه کن.',
      caution:
        'این گام اختیاری است و تنها زمانی معنا دارد که مقدار SHA-256 در بخش دانلود نمایش داده شده باشد. اگر نمایش داده نشده، می‌توانی آن را در یادداشت‌های آخرین نسخه در گیت‌هاب ببینی.',
      match: 'اگر مقدارها یکی بودند فایل سالم است؛ اگر یکی نبود، فایل را دوباره دانلود کن.',
    },
  },

  openSource: {
    title: 'متن‌باز',
    body: 'دیپی متن‌باز است و کد آن روی گیت‌هاب برای همه در دسترس است. می‌توانی اشکال گزارش بدهی، ویژگی پیشنهاد بدهی یا خودت در توسعه مشارکت کنی.',
    licenseLabel: 'مجوز',
    licenseValue: 'MIT',
    repositoryLabel: 'مخزن برنامه در گیت‌هاب',
    issuesLabel: 'گزارش اشکال و پیشنهاد ویژگی',
  },

  developer: {
    title: 'توسعه‌دهنده',
    label: 'توسعه‌دهنده: مصطفی',
    linkText: 'مشاهدهٔ صفحهٔ توسعه‌دهنده',
    url: 'https://mst-ghi.github.io/',
  },

  footer: {
    licenseLabel: 'مجوز MIT',
    githubLabel: 'گیت‌هاب',
    websiteLabel: 'وب‌سایت',
    tagline: 'ساخته‌شده برای کارگر. برنامه کارفرما به‌زودی جدا می‌آید.',
  },
} as const

export type SiteContent = typeof fa
