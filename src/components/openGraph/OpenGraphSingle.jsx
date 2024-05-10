/* eslint-disable @next/next/no-img-element */
import { formatRating } from '../rating/Rating'

export default function OpenGraphSingle({coverImage, title, content, rating, year}) {
  return (
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
        <img
            alt=''
            itemType='image/jpeg'
            height='100%'
            src={coverImage}
            style={{borderRadius: '24px', boxShadow: '0px 0px 21px 1px #000000'}}
        />

        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                flex: '1',
            }}
        >
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h1 style={{color: 'rgba(237, 222, 222, 1)', fontSize: 60, fontWeight: 700, marginTop: '-10px'}}>{title}</h1>
                <span style={{fontSize: 60, fontWeight: 700, color: 'rgba(237, 222, 222, 0.5)'}}>({year})</span>
            </div>
            
            <p style={{color: 'rgba(237, 222, 222, 1)', fontSize: 30, lineHeight: '45px', fontWeight: 400, marginTop: '-10px'}}>{content}...</p>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', color: 'rgba(237, 222, 222, 0.8)'}}>
                <img height='45' src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/images/rating/big${formatRating(rating)}.png`} alt={`rating: ${rating}/5`}/>
                <span style={{fontSize: 32}}>{rating} / 5</span>
            </div>
        </div>

    </div>
  )
}
