import Image from 'next/image';
import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.
 
export const runtime = 'edge';

const getData = async (slug) => {
    // console.log(slug)
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews/${slug}`);
    if (!res.ok) {
        notFound()
        // throw new Error('Failed to fetch Single Post data');
    }
    return res.json();
}
 
export async function GET(request) {
    const slug = request.nextUrl.searchParams.get('slug');
    const data = await getData(slug)
    console.log(data.movies[0].coverImage)
  return new ImageResponse(
    (
        <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'black',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{color: 'red'}}>{slug}</p>
        <img
        alt='dadada'
        itemType='image/jpeg'
        height='1000'
        width='500'
          src={`${data.movies[0].coverImage}`}
        />
        
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}