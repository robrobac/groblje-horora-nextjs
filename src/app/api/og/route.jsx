import OpenGraphQuad from '@/components/openGraph/OpenGraphQuad';
import OpenGraphSingle from '@/components/openGraph/OpenGraphSingle';
import { formatRating } from '@/components/rating/Rating';
import { getRawContent } from '@/lib/utils';
import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';

const fetchLexendBold = fetch(
        new URL('../../../../public/Lexend-Bold.ttf', import.meta.url).href
    ).then(res => res.arrayBuffer());

const fetchLexendNormal = fetch(
        new URL('../../../../public/Lexend-Medium.ttf', import.meta.url).href
    ).then(res => res.arrayBuffer());
 
export async function GET(request) {
    const encodedData = request.nextUrl.searchParams.get('data');
    const encodedImages = request.nextUrl.searchParams.get('images');
    const images = JSON.parse(encodedImages)
    const movieNumber = request.nextUrl.searchParams.get('movieNumber');

    const decodedData = decodeURIComponent(encodedData)
    const data = JSON.parse(decodedData)

    const LexendBold = await fetchLexendBold;
    const LexendNormal = await fetchLexendNormal;

    const toRender = data.movies.length === 1 ? (
        <OpenGraphSingle coverImage={images[0]} title={data.movies[0].title} content={data.movies[0].reviewContent} rating={data?.movies[0].rating} year={data.movies[0].year}/>
    ) : (
        movieNumber ? (
            <OpenGraphSingle coverImage={images[movieNumber]} title={data.movies[movieNumber].title} content={data.movies[movieNumber].reviewContent} rating={data?.movies[movieNumber].rating} year={data.movies[movieNumber].year}/>
        ) : (
            <OpenGraphQuad data={data} images={images} />
        )
    );

    return new ImageResponse(
        toRender,
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
                headers: {
                    "Cache-Control": "public, max-age=86400", // 86400 seconds = 24 hours
                },
            },
        );
    }