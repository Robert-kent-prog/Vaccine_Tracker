// src/services/sms/templates.js
export const smsTemplates = {
  // Vaccination reminders
  reminders: {
    upcoming: {
      english: (childName, vaccineName, dueDate, daysUntil) => 
        `Hello! Reminder: ${childName} is due for ${vaccineName} on ${dueDate} (in ${daysUntil} days). Please visit your nearest health facility.`,

      swahili: (childName, vaccineName, dueDate, daysUntil) =>
        `Habar! Ukumbusho: ${childName} anahitaji chanjo ya ${vaccineName} tarehe ${dueDate} (siku ${daysUntil} zimebaki). Tafadhali tembelea kituo cha afya karibu nawe.`,

      kikuyu: (childName, vaccineName, dueDate, daysUntil) =>
        `Watho! Ukumbusho: ${childName} niweke chanjo ya ${vaccineName} mweri ${dueDate} (mahanu ${daysUntil} makoragwo). Thi kundu wa ugwati wa thakame ukaruhu.`
    },

    overdue: {
      english: (childName, vaccineName, daysOverdue) =>
        `URGENT: ${childName} has missed ${vaccineName} vaccination. It's ${daysOverdue} days overdue. Please visit health facility immediately to protect your child.`,

      swahili: (childName, vaccineName, daysOverdue) =>
        `MUHIMU: ${childName} amekosa chanjo ya ${vaccineName}. Imekwisha chelewa siku ${daysOverdue}. Tafadhali tembelea kituo cha afya haraka ili kumlinda mtoto wako.`,

      kikuyu: (childName, vaccineName, daysOverdue) =>
        `KUHUTU: ${childName} niukire chanjo ya ${vaccineName}. Ni mahanu ${daysOverdue} mekuhitukira. Thi kundu wa ugwati wa thakame ukaruhu niugitarie mwana.`
    }
  },

  // Confirmation messages
  confirmations: {
    vaccination: {
      english: (childName, vaccineName, nextVisitDate) =>
        `Thank you! ${childName} has received ${vaccineName}. Next vaccination due on ${nextVisitDate}. Keep your child protected.`,

      swahili: (childName, vaccineName, nextVisitDate) =>
        `Asante! ${childName} amepata chanjo ya ${vaccineName}. Chanjo ijayo itakapaswa kupigwa tarehe ${nextVisitDate}. Endelea kumlinda mtoto wako.`,

      kikuyu: (childName, vaccineName, nextVisitDate) =>
        `Niwega! ${childName} niugire chanjo ya ${vaccineName}. Chanjo ingi niikuhitukira mweri ${nextVisitDate}. Tigaira kugitara mwana.`
    },

    registration: {
      english: (childName) =>
        `Welcome! ${childName} has been registered in the vaccination system. You will receive reminders for upcoming vaccinations.`,

      swahili: (childName) =>
        `Karibu! ${childName} amesajiliwa kwenye mfumo wa chanjo. Utapokea ukumbusho kuhusu chanjo zijazo.`,

      kikuyu: (childName) =>
        `Uguo! ${childName} niandikitwo kunduni wa chanjo. Niuheane ukumbusho wa chanjo ciri cionekire.`
    }
  },

  // Alert messages
  alerts: {
    stock: {
      english: (vaccineName, currentStock, minStock) =>
        `ALERT: ${vaccineName} stock is low. Current: ${currentStock}, Minimum: ${minStock}. Please restock soon.`,

      swahili: (vaccineName, currentStock, minStock) =>
        `TAHADHARI: Hisa ya ${vaccineName} imekaribia kuisha. Sasa: ${currentStock}, Kima cha chini: ${minStock}. Tafadhali ongeza hisa hivi karibuni.`,

      kikuyu: (vaccineName, currentStock, minStock) =>
        `KUHUTU: Ugwati wa ${vaccineName} niukinyire. Uria uguo: ${currentStock}, Uria munini: ${minStock}. Ongerera ugwati ucio.`
    },

    defaulter: {
      english: (childName, vaccineName, chwName, chwPhone) =>
        `FOLLOW-UP: ${childName} missed ${vaccineName}. CHW ${chwName} (${chwPhone}) will contact you. Please ensure your child gets vaccinated.`,

      swahili: (childName, vaccineName, chwName, chwPhone) =>
        `UFUATILIAJI: ${childName} amekosa chanjo ya ${vaccineName}. Mhudumu wa afya ${chwName} (${chwPhone}) atawasiliana nawe. Tafadhali hakikisha mtoto wako anapata chanjo.`,

      kikuyu: (childName, vaccineName, chwName, chwPhone) =>
        `GUTHERERIA: ${childName} niukire chanjo ya ${vaccineName}. Mundu wa ugwati ${chwName} (${chwPhone}) niukwambirira. Hakikisha mwana niugira chanjo.`
    }
  },

  // Educational messages
  education: {
    importance: {
      english: () =>
        `Vaccines protect children from dangerous diseases. Complete all vaccinations on time to ensure your child's health and development.`,

      swahili: () =>
        `Chanjo hulinda watoto dhidi ya magonjwa hatari. Kamiliisha chanjo zote kwa wakati ili kuhakikisha afya na ukuaji wa mtoto wako.`,

      kikuyu: () =>
        `Chanjo cigitagira ciana kuuma ugwati wa indo. Ukiranira chanjo ciothe hanini niugitarie ugwati wa mwana na ukuri wake.`
    },

    sideEffects: {
      english: () =>
        `Mild fever or swelling after vaccination is normal. If high fever persists, visit health facility. Vaccines are safe and save lives.`,

      swahili: () =>
        `Homa ndogo au uvimbe baada ya chanjo ni kawaida. Ikiwa homa kubwa inaendelea, tembelea kituo cha afya. Chanjo ni salama na zinaokoa maisha.`,

      kikuyu: () =>
        `Kuhua kana guku njuui tondu wa chanjo ni kwega. Ning'wa kuhua guku nene niguikara, thi kundu wa ugwati. Chanjo ni thema na cionagwo.`
    }
  }
};

// Helper function to get template by type and language
export const getSMSTemplate = (type, subtype, language = 'english') => {
  const templateGroup = smsTemplates[type];
  if (!templateGroup) {
    throw new Error(`SMS template type '${type}' not found`);
  }

  const template = templateGroup[subtype];
  if (!template) {
    throw new Error(`SMS template subtype '${subtype}' not found in '${type}'`);
  }

  const templateFunc = template[language];
  if (!templateFunc) {
    // Fallback to English if language not available
    return template.english;
  }

  return templateFunc;
};

// Format date for SMS (simple format)
export const formatDateForSMS = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Validate phone number for Kenyan format
export const validatePhoneNumber = (phone) => {
  const kenyanPhoneRegex = /^(?:\+254|0)?[17]\d{8}$/;
  return kenyanPhoneRegex.test(phone.replace(/\s/g, ''));
};

// Format phone number to E.164 format
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.startsWith('0')) {
    return '+254' + cleaned.substring(1);
  }
  if (cleaned.startsWith('254')) {
    return '+' + cleaned;
  }
  return cleaned;
};