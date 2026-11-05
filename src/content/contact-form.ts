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
    emailInvalid: "Enter a valid email address",

    /* Outcomes. */
    sending: "Sending…",
    /** Beside the button, in the pill. One word, because the pill is small by design. */
    sentShort: "Sent",
    sent: "Thank you. We have your details and will reply within one business day.",
    failed: "That did not send. Try again, or email us directly.",
    rateLimited: "We already have a request from you today. We will reply to that one.",

    /** The call booking, beside the form. */
    callTitle: "Rather talk it through?",
    callBody:
      "Book a free 30 minute call with either of us. Bring one category and we will look at it with you.",
    /** Per person, under their name. The role itself comes from the About page's catalogue. */
    callCta: "30 minutes, free",
  },
  vi: {
    note: "Chỉ hai ô, không gì thêm. Chúng tôi trả lời trong vòng một ngày làm việc. Không bản tin, không chuỗi email bán hàng.",

    companyHint: "Công ty Bán lẻ Acme",
    emailHint: "ban@congty.com",

    required: "Ô này là bắt buộc",
    emailInvalid: "Hãy nhập một địa chỉ email hợp lệ",

    sending: "Đang gửi…",
    sentShort: "Đã gửi",
    sent: "Cảm ơn bạn. Chúng tôi đã nhận được thông tin và sẽ trả lời trong vòng một ngày làm việc.",
    failed: "Chưa gửi được. Hãy thử lại, hoặc gửi email trực tiếp cho chúng tôi.",
    rateLimited: "Hôm nay chúng tôi đã nhận được một yêu cầu từ bạn. Chúng tôi sẽ trả lời yêu cầu đó.",

    callTitle: "Bạn muốn trao đổi trực tiếp hơn?",
    callBody:
      "Đặt một cuộc gọi 30 phút miễn phí với một trong hai chúng tôi. Hãy mang theo một ngành hàng và chúng tôi sẽ cùng bạn xem xét nó.",
    callCta: "30 phút, miễn phí",
  },
} as const;

/** The form's strings for the active locale. */
export const contactForm = (locale: string) => byLocale(COPY, locale);

