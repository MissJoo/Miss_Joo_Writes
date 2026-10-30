export const CONTACT_EMAIL = "missjodiaries@gmail.com";

/**
 * Opens a new email to Miss Joo, ready to send. Phones open their mail app (mailto). Computers often have no mail
 * app set up, where mailto does nothing, so they get Gmail's compose window in a new tab instead.
 */
export const composeEmail = (subject: string, body = "") => {
  const phone = window.matchMedia("(pointer: coarse)").matches;
  if (phone) {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return;
  }
  const params = new URLSearchParams({ view: "cm", fs: "1", to: CONTACT_EMAIL, su: subject, body });
  window.open(`https://mail.google.com/mail/?${params}`, "_blank", "noopener,noreferrer");
};
