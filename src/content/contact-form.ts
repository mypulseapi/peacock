/**
 * The contact form's own strings: the states a form has that a static page never did.
 *
 * The labels all exist already in both languages (`contact.section1.8`, `.9`, `.16`), so what is
 * left is the placeholders, the validation messages, the two outcomes and the Calendly invitation.
 *
 * They are here rather than in `messages/` because the form is a client component that already
 * reads this module, and splitting fifteen short strings across two mechanisms makes both harder
 * to find. The shape is the same `byLocale` one the other content modules use.
 */
import { byLocale } from "./locale";

const COPY = {
  en: {
    /** Shown under the heading, before anything is submitted. */
    note: "Two fields, nothing else. We reply within one business day. No newsletter, no sales sequence.",

    /* Placeholders. An example, not a restatement of the label: "Company Name" above an input
       reading "Enter company name" is the label twice. */
    companyHint: "Acme Retail",
    emailHint: "you@company.com",

    /* Validation, client side. The same rules run again on the server, which is the one that
       counts: anything here can be removed with a devtools console. */
    required: "This field is required",
    emailInvalid: "Enter a valid work email address",
    emailFree:
      "Please use your work email, not a personal one, so we can see which company is asking",

    /* Outcomes. */
    sending: "Sending…",
    /** Beside the button, in the pill. One word, because the pill is small by design. */
    sentShort: "Sent",
    sent: "Thank you. We have your details and will reply within one business day.",
    failed: "That did not send. Try again, or email us directly.",
    rateLimited: "We already have a request from you today. We will reply to that one.",

    /** The call booking, beside the form. */
    callTitle: "Rather talk it through?",
    callBody: "Book a free 30 minute call. Bring one category and we will look at it with you.",
    callCta: "Book a 30 minute call",
  },
  vi: {
    note: "Chỉ hai ô, không gì thêm. Chúng tôi trả lời trong vòng một ngày làm việc. Không bản tin, không chuỗi email bán hàng.",

    companyHint: "Công ty Bán lẻ Acme",
    emailHint: "ban@congty.com",

    required: "Ô này là bắt buộc",
    emailInvalid: "Hãy nhập một email công việc hợp lệ",
    emailFree:
      "Vui lòng dùng email công việc thay vì email cá nhân, để chúng tôi biết công ty nào đang hỏi",

    sending: "Đang gửi…",
    sentShort: "Đã gửi",
    sent: "Cảm ơn bạn. Chúng tôi đã nhận được thông tin và sẽ trả lời trong vòng một ngày làm việc.",
    failed: "Chưa gửi được. Hãy thử lại, hoặc gửi email trực tiếp cho chúng tôi.",
    rateLimited: "Hôm nay chúng tôi đã nhận được một yêu cầu từ bạn. Chúng tôi sẽ trả lời yêu cầu đó.",

    callTitle: "Bạn muốn trao đổi trực tiếp hơn?",
    callBody:
      "Đặt một cuộc gọi 30 phút miễn phí. Hãy mang theo một ngành hàng và chúng tôi sẽ cùng bạn xem xét nó.",
    callCta: "Đặt cuộc gọi 30 phút",
  },
} as const;

/** The form's strings for the active locale. */
export const contactForm = (locale: string) => byLocale(COPY, locale);

/**
 * Free-mail domains, for the "use your work email" nudge.
 *
 * Deliberately short and deliberately a *nudge*, not a block: this is the frontend, the list can
 * never be complete, and a founder whose company really does run on Gmail is a lead, not a
 * mistake. The server does the checking that matters, including whether the domain can receive
 * mail at all.
 */
export const FREE_MAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "mail.com",
  "yandex.com",
  "zoho.com",
  "qq.com",
  "163.com",
];
