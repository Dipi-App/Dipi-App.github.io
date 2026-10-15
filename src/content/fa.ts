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

export interface ScreenshotItem {
  readonly src: string
  readonly alt: string
}

export const fa = {
  meta: {
    title: 'دیپی — دفتر کار و پرداخت آفلاین',
    description:
      'دیپی یک برنامهٔ آفلاین اندروید برای ثبت روزهای کاری و پرداخت‌ها روی تقویم شمسی است. بدون ثبت‌نام، داده‌ها روی گوشی خودت.',
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
    ariaLabel: 'ناوبری اصلی',
  },

  hero: {
    title: 'دیپی',
    tagline: 'دفتر کار و پرداخت آفلاین برای کارگرها و پیمانکارها.',
    description:
      'روزهای کاری و پرداخت‌ها را روی تقویم شمسی ثبت کن و همیشه بدان چه کسی چقدر بدهکار است.',
    downloadCta: 'دانلود برای اندروید',
    installGuideCta: 'راهنمای نصب',
    versionLabel: 'نسخه',
    sizeLabel: 'حجم فایل',
    releasedLabel: 'تاریخ انتشار',
    releaseUnavailable: 'اطلاعات آخرین نسخه در دسترس نیست.',
    releaseLoading: 'در حال خواندن اطلاعات آخرین نسخه…',
  },

  features: {
    title: 'ویژگی‌ها',
    subtitle: 'هر چیزی که برای حساب‌وکتاب روزانه لازم داری، بدون پیچیدگی.',
    items: [
      {
        icon: 'calendar',
        title: 'تقویم کار',
        description: 'هر روز کاری را روی تقویم شمسی ثبت کن؛ رنگ هر روز، رنگ کارفرماست.',
      },
      {
        icon: 'users',
        title: 'کارفرماها',
        description: 'کارفرماها را اضافه، ویرایش و بایگانی کن؛ حساب هرکدام جدا نگه داشته می‌شود.',
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
    placeholderNotice: 'این تصاویر نمونه هستند و به‌زودی با تصاویر واقعی برنامه جایگزین می‌شوند.',
    previous: 'تصویر قبلی',
    next: 'تصویر بعدی',
    items: [
      { src: '/screens/screen-1.png', alt: 'صفحهٔ تقویم کار در دیپی' },
      { src: '/screens/screen-2.png', alt: 'صفحهٔ مدیریت کارفرماها در دیپی' },
      { src: '/screens/screen-3.png', alt: 'صفحهٔ پرداخت‌ها و مانده‌حساب در دیپی' },
      { src: '/screens/screen-4.png', alt: 'صفحهٔ آمار در دیپی' },
    ] satisfies readonly ScreenshotItem[],
  },

  download: {
    title: 'دانلود',
    subtitle: 'آخرین نسخهٔ دیپی برای اندروید، مستقیم از گیت‌هاب.',
    button: 'دانلود فایل APK',
    installGuideLink: 'افتادن به راهنمای نصب',
    versionLabel: 'نسخه',
    sizeLabel: 'حجم فایل',
    releasedLabel: 'تاریخ انتشار',
    shaLabel: 'SHA-256',
    loading: 'در حال خواندن اطلاعات آخرین نسخه…',
    unavailable:
      'اطلاعات آخرین نسخه الان در دسترس نیست. با دکمهٔ دانلود، آخرین نسخه را از گیت‌هاب بگیر.',
    shaUnavailable: 'مقدار SHA-256 برای این نسخه در دسترس نیست.',
    directLinkNote: 'دکمهٔ دانلود همیشه به آخرین نسخهٔ منتشرشده وصل است.',
  },

  install: {
    title: 'راهنمای نصب',
    subtitle: 'دیپی را در سه گام ساده نصب کن.',
    steps: [
      {
        title: 'فایل را دانلود کن',
        description: 'روی «دانلود برای اندروید» بزن و فایل APK را روی گوشی ذخیره کن.',
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
        'برای اطمینان از سالم بودن فایل، می‌توانی SHA-256 آن را با مقدار نمایش‌داده‌شده در بخش دانلود مقایسه کنی.',
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
    tagline: 'ساخته‌شده برای کارگرها و پیمانکارها.',
  },
} as const

export type SiteContent = typeof fa
