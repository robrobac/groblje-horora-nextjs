import { formatRating } from '@/components/rating/Rating';
import { getRawContent } from '@/lib/utils';
import { ImageResponse } from 'next/og';

export const revalidate = 0
 
export const runtime = 'edge';

export function shortenString(str) {
    const cleanedString = str.replace(/<\/?[^>]+(>|$)/g, "");
    const cleanedStringWithoutTags = cleanedString.replace(/<\/?(p|b|strong|em|i|u|strike)>/g, "");
    const words = cleanedStringWithoutTags.split(' ');
    const shortenedWords = words.slice(0, 40);
    const shortenedString = shortenedWords.join(' ');
    return shortenedString;
}

const getData = async (slug) => {
    // console.log(slug)
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews/${slug}`);
    if (!res.ok) {
        notFound()
        // throw new Error('Failed to fetch Single Post data');
    }
    return res.json();
}

const fetchLexendBold = fetch(
    new URL('../../../../public/Lexend-Bold.ttf', import.meta.url).href
).then(res => res.arrayBuffer());
const fetchLexendNormal = fetch(
    new URL('../../../../public/Lexend-Medium.ttf', import.meta.url).href
).then(res => res.arrayBuffer());
 
export async function GET(request) {
    const slug = request.nextUrl.searchParams.get('slug');
    const data = await getData(slug)
    console.log(data.movies[0].coverImage)

    const LexendBold = await fetchLexendBold;
    const LexendNormal = await fetchLexendNormal;
    

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    color: 'black',
                    backgroundColor: '#141414',
                    padding: '24px',
                    display: 'flex',
                    gap: '32px',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <div style={{display: 'flex'}}>
                    <img
                        alt='dadada'
                        itemType='image/jpeg'
                        height='100%'
                        src={`${data.movies[0].coverImage}`}
                        style={{borderRadius: '24px', boxShadow: '0px 0px 21px 1px #000000'}}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        flex: '1',
                    }}
                >
                    <h1 style={{color: 'rgba(237, 222, 222, 1)', fontSize: 60, fontWeight: 700, lineHeight: '80px', marginTop: '-10px'}}>{data.movies[0].title}</h1>
                    <p style={{color: 'rgba(237, 222, 222, 1)', fontSize: 30, fontWeight: 400, marginTop: '-10px'}}>{shortenString(getRawContent(data?.movies[0].reviewContent))}...</p>
                    <div style={{display: 'flex', gap: '16px', color: 'rgba(237, 222, 222, 0.8)'}}>
                        <img height='20' src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/images/rating/${formatRating(data.movies[0].rating)}.png`} alt={`rating: ${data.movies[0].rating}/5`}/>
                        <span>{data.movies[0].rating} / 5</span>
                    </div>
                </div>
        
            </div>
        ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                      name: 'Lexend',
                      data: LexendBold,
                      style: 'normal',
                      weight: 700,
                    },
                    {
                        name: 'Lexend',
                        data: LexendNormal,
                        style: 'normal',
                        weight: 400,
                      },
                  ],
            },
        );
    }