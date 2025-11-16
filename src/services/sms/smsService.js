// src/services/sms/smsService.js
export const smsService = {
  // Send vaccination reminder
  sendReminder: async (phoneNumber, childName, vaccineName, dueDate) => {
    const message = `Hello! This is a reminder that ${childName} is due for ${vaccineName} vaccination on ${new Date(dueDate).toLocaleDateString()}. Please visit your nearest health facility.`;
    
    return await sendSMS(phoneNumber, message);
  },

  // Send defaulter follow-up message
  sendDefaulterAlert: async (phoneNumber, childName, vaccineName, daysOverdue) => {
    const message = `URGENT: ${childName} has missed ${vaccineName} vaccination. It's ${daysOverdue} days overdue. Please visit health facility immediately to protect your child.`;
    
    return await sendSMS(phoneNumber, message);
  },

  // Send confirmation message
  sendConfirmation: async (phoneNumber, childName, vaccineName, nextVisitDate) => {
    const message = `Thank you! ${childName} has received ${vaccineName}. Next vaccination due on ${new Date(nextVisitDate).toLocaleDateString()}. Keep your child protected.`;
    
    return await sendSMS(phoneNumber, message);
  },

  // Send stock alert to health workers
  sendStockAlert: async (phoneNumber, vaccineName, currentStock, minStock) => {
    const message = `ALERT: ${vaccineName} stock is low. Current: ${currentStock}, Minimum: ${minStock}. Please restock soon.`;
    
    return await sendSMS(phoneNumber, message);
  }
};

// Mock SMS sending function
// In production, integrate with SMS gateway like Africa's Talking
async function sendSMS(phoneNumber, message) {
  console.log(`Sending SMS to ${phoneNumber}: ${message}`);
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, messageId: `msg_${Date.now()}` });
    }, 1000);
  });
}