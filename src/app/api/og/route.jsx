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
                    "Cache-Control":
                      "no-cache",
                },
            },
        );
    }



//     <div style={{display: 'flex', height: '400px', overflow: 'hidden', borderRadius: '24px', alignContent: 'center', justifyContent: 'center'}}>
//     <img
//         alt='dadada'
//         itemType='image/jpeg'
//         src={images[0]}
//         style={{boxShadow: '0px 0px 21px 1px #000000', height: '100%'}}
//     />
// </div>
// <h1 style={{color: 'rgba(237, 222, 222, 1)', fontSize: 30, fontWeight: 700, marginTop: '-10px', textAlign: 'center'}}>{data.movies[0].title}</h1>
// <div style={{display: 'flex', justifyContent: 'center', gap: '16px', color: 'rgba(237, 222, 222, 0.8)'}}>
//     <img height='30' style={{height: '30px'}} src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/images/rating/big${formatRating(data.movies[0].rating)}.png`} alt={`rating: ${data.movies[0].rating}/5`}/>
// </div>