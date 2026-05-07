import { NextRequest, NextResponse } from 'next/server';

function validatePhone(phone: string) {
    return /^\+[1-9]\d{7,14}$/.test(phone);
}

const BOT_REGEX =
    /TelegramBot|facebookexternalhit|Twitterbot|Slackbot|WhatsApp|Discordbot/i;

export async function proxy(req: NextRequest) {
    const ua = req.headers.get('user-agent') || '';
    const isBot = BOT_REGEX.test(ua);

    // БОТАМ НЕ ДАЕМ УЙТИ В REDIRECT CHAIN
    // ИНАЧЕ ОНИ ТАЩАТ МЕТАДАННЫЕ ИЗ yoldosh.uz/ru ИЛИ /en
    if (isBot) {
        return NextResponse.redirect('https://yoldosh.uz/uz');
    }

    const { pathname } = req.nextUrl;

    const raw = pathname.replace('/go/', '');
    const phone = decodeURIComponent(raw);

    if (!validatePhone(phone)) {
        return new NextResponse('Invalid phone number', { status: 400 });
    }

    const res = await fetch(
        `http://213.230.65.139:8080/go/${encodeURIComponent(phone)}`,
        {
            method: 'GET',
            redirect: 'manual',
        }
    );

    const location = res.headers.get('location');

    console.log('location', location);

    if (!location) {
        console.log('failed going to fallback');
        return NextResponse.redirect('https://app.yoldosh.uz');
    }

    console.log('success going to location');
    return NextResponse.redirect(location);
}

export const config = {
    matcher: ['/go/:path*'],
};