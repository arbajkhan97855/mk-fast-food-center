/**
 * WhatsApp Utility Functions for MK FAST-FOOD CENTER
 * Business Number: 9785589164 (India country code +91)
 */

export const WHATSAPP_PHONE = "919785589164";
export const OWNER1_PHONE = "9928588415";
export const OWNER2_PHONE = "9785589164";

/**
 * Creates the formatted WhatsApp order URL with deep-linking
 */
export function createWhatsAppOrder({
  orderId = '',
  customerName = "Customer",
  phone = "",
  mobile = "",
  orderType = "Takeaway",
  items = [],
  subtotal = 0,
  discountAmount = 0,
  discount = 0,
  packagingFee = 0,
  deliveryFee = 0,
  total = 0,
  paymentMethod = "Cash / UPI on Pickup",
  upiRef = "",
  address = "",
  instructions = ""
}) {
  const customerPhone = phone || mobile || "Not provided";
  const finalDiscount = discountAmount || discount || 0;
  const finalDeliveryOrPkg = packagingFee || deliveryFee || 0;
  const shortOrderId = orderId ? `#${String(orderId).slice(-6)}` : `#MK${Date.now().toString().slice(-4)}`;

  const itemsList = items
    .map(item => {
      const addons = (item.selectedAddons || item.addons || []).length > 0
        ? ` (+ ${(item.selectedAddons || item.addons).map(a => a.name).join(", ")})`
        : "";
      return `• ${item.name}${addons} × ${item.quantity} = ₹${item.price * item.quantity}`;
    })
    .join("\n");

  const message = `*NEW ORDER ${shortOrderId} - MK FAST-FOOD CENTER, CHOMU*
---------------------------------------
👤 *CUSTOMER DETAILS:*
• Name: ${customerName}
• Phone: ${customerPhone}
• Order Mode: ${orderType.toUpperCase()}
💳 *PAYMENT MODE:* ${paymentMethod}${upiRef ? ` (UPI Ref: ${upiRef})` : ''}

🍽️ *ITEMS ORDERED:*
${itemsList || "• Custom Items"}

💰 *BILL DETAILS:*
• Subtotal: ₹${subtotal}
${finalDiscount > 0 ? `• Discount Applied: -₹${finalDiscount}\n` : ""}${finalDeliveryOrPkg > 0 ? `• Packaging/Takeaway: ₹${finalDeliveryOrPkg}\n` : ""}• *TOTAL PAYABLE: ₹${total}*
---------------------------------------
${orderType.toLowerCase().includes("delivery") && address ? `📍 *DELIVERY ADDRESS (CHOMU):*\n${address}\n\n` : ""}${instructions ? `📝 *SPECIAL NOTES:*\n${instructions}\n\n` : ""}📍 Counter Pickup: Near Nagar Palika & New Gareeb Nawaj Hotel, Chomu
📞 Contact: Arbaj (9785589164) / Mumtaj (9928588415)

Please confirm this order and start preparation. Thank you!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

/**
 * Creates enquiry URL for a specific product
 */
export function createWhatsAppProductEnquiry(productName) {
  const msg = `Hello MK FAST-FOOD CENTER,
I want to enquire about *${productName}*.

Please share availability, preparation time and details.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
}

/**
 * Creates custom combo/item order enquiry URL
 */
export function createWhatsAppCustomOrder(itemTitle, details = "", price = "") {
  const priceText = price ? ` (₹${price})` : "";
  const detailsText = details ? `\n\n*Included Items / Details:*\n${details}` : "";
  const msg = `Hello MK FAST-FOOD CENTER,
I would like to order *${itemTitle}*${priceText}.${detailsText}

Please prepare it for takeaway at your Chomu counter. Thank you!`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
}

/**
 * Creates general enquiry URL
 */
export function createWhatsAppGeneralEnquiry(topic = "General Menu") {
  const msg = `Hello MK FAST-FOOD CENTER,
I would like to enquire about your menu and quick takeaway service in Chomu.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
}

/**
 * Creates contact form inquiry URL
 */
export function createWhatsAppContact({ name, phone, message, topic = "General" }) {
  const msg = `Hello MK FAST-FOOD CENTER,

*NEW WEBSITE ENQUIRY*
• Name: ${name}
• Phone: ${phone}
• Topic: ${topic}

*Message:*
${message}

Please get back to me.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
}
