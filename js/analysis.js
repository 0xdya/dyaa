// إعداد Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-479579142');

// دالة لجمع عنوان IP
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('❌ خطأ في جلب عنوان IP:', error);
        return null;
    }
}

// دالة للحصول على الموقع الجغرافي بناءً على IP
async function getLocation(ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        return `${data.city}, ${data.country_name}`;
    } catch (error) {
        console.error('❌ خطأ في جلب الموقع:', error);
        return 'غير معروف';
    }
}

// دالة لتحديد نوع الجهاز ونظام التشغيل والطراز
function getDeviceInfo() {
    const userAgent = navigator.userAgent;

    let deviceType = 'غير معروف';
    if (/Mobi|Android/i.test(userAgent)) {
        deviceType = ' هاتف محمول';
    } else if (/Tablet|iPad/i.test(userAgent)) {
        deviceType = ' جهاز لوحي';
    } else {
        deviceType = ' كمبيوتر';
    }

    let os = 'غير معروف';
    if (/Android/i.test(userAgent)) {
        os = ' Android';
    } else if (/iOS|iPhone|iPad/i.test(userAgent)) {
        os = 'iOS';
    } else if (/Windows/i.test(userAgent)) {
        os = ' Windows';
    } else if (/Mac/i.test(userAgent)) {
        os = ' macOS';
    } else if (/Linux/i.test(userAgent)) {
        os = ' Linux';
    }

    let deviceModel = 'غير متوفر';
    if (/Android/i.test(userAgent)) {
        const modelMatch = userAgent.match(/Build\/([^;]+)/);
        if (modelMatch) {
            deviceModel = modelMatch[1].split(';')[0].trim();
        }
    } else if (/iPhone|iPad/i.test(userAgent)) {
        const modelMatch = userAgent.match(/iPhone|iPad/);
        if (modelMatch) {
            deviceModel = modelMatch[0];
        }
    }

    return { deviceType, os, deviceModel };
}

// دالة لإرسال البيانات إلى Telegram باستخدام HTML
async function sendToBot(message) {
    const botToken = '7514072650:AAFGKtQP-8eITRR9ccZcjs65KzTyqHzKwu0'; // استبدل هذا بتوكين البوت
    const chatId = '5962064921'; // استبدل هذا بـ chat_id الخاص بك

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML' // استخدام HTML لتحسين التنسيق
            })
        });

        const data = await response.json();
        if (data.ok) {
            console.log('✅ تم إرسال البيانات إلى البوت بنجاح!');
        } else {
            console.error('❌ فشل إرسال البيانات:', data);
        }
    } catch (error) {
        console.error('🚨 حدث خطأ أثناء الإرسال:', error);
    }
}

// الكود الرئيسي
window.onload = async function() {
    const startTime = new Date(); // وقت بدء الجلسة

    // جمع المعلومات
    const ipAddress = await getIPAddress();
    const location = ipAddress ? await getLocation(ipAddress) : 'غير معروف';
    const { deviceType, os, deviceModel } = getDeviceInfo();
    const siteURL = window.location.href; // الحصول على رابط الموقع الحالي

    // فصل التاريخ والوقت
    const entryDate = startTime.toLocaleDateString(); // تاريخ الدخول
    const entryTime = startTime.toLocaleTimeString(); // وقت الدخول

    // تنسيق الرسالة باستخدام HTML
    const entryMessage = `
📢 <b>دخول جديد إلى الموقع!</b>

🆔 <b>عنوان IP:</b> <code>${ipAddress || 'غير معروف'}</code>  
🌍 <b>الموقع:</b> <code>${location}</code>  
📱 <b>نوع الجهاز:</b> <code>${deviceType}</code>  
🖥 <b>نظام التشغيل:</b> <code>${os}</code>  
🔍 <b>طراز الجهاز:</b> <code>${deviceModel}</code>  

📅 <b>تاريخ الدخول:</b> <code>${entryDate}</code>  
⏰ <b>وقت الدخول:</b> <code>${entryTime}</code>  
🔗 <b>رابط الموقع:</b> <a href="${siteURL}">${siteURL}</a>  
    `;

    await sendToBot(entryMessage);
};