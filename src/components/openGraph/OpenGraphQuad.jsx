/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { formatRating } from '../rating/Rating'

export default function OpenGraphQuad({data, images}) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#141414',
                display: 'flex',
                padding: '12px',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            
            <div style={{display: 'flex', width: '25%', height: '100%', padding: '12px', overflow: 'hidden', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', width: '100%', overflow: 'hidden', borderRadius: 20}}>
                    <img
                        alt=''
                        itemType='image/jpeg'
                        src={images[0]}
                        style={{boxShadow: '0px 0px 21px 1px #000000', width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                </div>
                <h1 style={{color: 'rgba(237, 222, 222, 1)', fontSize: 30, fontWeight: 700, marginTop: '-10px', textAlign: 'center', height: '100%', marginTop: '24px'}}>{data[0].title}</h1>
                <img height='30' style={{height: '30px'}} src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/images/rating/big${formatRating(data[0].rating)}.png`} alt={`rating: ${data[0].rating}/5`}/>
            </div>
            <div style={{display: 'flex', width: '25%', height: '100%', padding: '12px', overflow: 'hidden', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', width: '100%', overflow: 'hidden', borderRadius: 20}}>
                    <img
                        alt=''
                        itemType='image/jpeg'
                        src={images[1]}
                        style={{boxShadow: '0px 0px 21px 1px #000000', width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                </div>
                <h1 style={{color: 'rgba(237, 222, 222, 1)', fontSize: 30, fontWeight: 700, marginTop: '-10px', textAlign: 'center', height: '100%', marginTop: '24px'}}>{data[1].title}</h1>
                <img height='30' style={{height: '30px'}} src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/images/rating/big${formatRating(data[1].rating)}.png`} alt={`rating: ${data[1].rating}/5`}/>
            </div>
            <div style={{display: 'flex', width: '25%', height: '100%', padding: '12px', overflow: 'hidden', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', width: '100%', overflow: 'hidden', borderRadius: 20}}>
                    <img
                        alt=''
                        itemType='image/jpeg'
                        src={images[2]}
                        style={{boxShadow: '0px 0px 21px 1px #000000', width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                </div>
                <h1 style={{color: 'rgba(237, 222, 222, 1)', fontSize: 30, fontWeight: 700, marginTop: '-10px', textAlign: 'center', height: '100%', marginTop: '24px'}}>{data[2].title}</h1>
                <img height='30' style={{height: '30px'}} src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/images/rating/big${formatRating(data[2].rating)}.png`} alt={`rating: ${data[2].rating}/5`}/>
            </div>
            <div style={{display: 'flex', width: '25%', height: '100%', padding: '12px', overflow: 'hidden', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', width: '100%', overflow: 'hidden', borderRadius: 20}}>
                    <img
                        alt=''
                        itemType='image/jpeg'
                        src={images[3]}
                        style={{boxShadow: '0px 0px 21px 1px #000000', width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                </div>
                <h1 style={{color: 'rgba(237, 222, 222, 1)', fontSize: 30, fontWeight: 700, marginTop: '-10px', textAlign: 'center', height: '100%', marginTop: '24px'}}>{data[3].title}</h1>
                <img height='30' style={{height: '30px'}} src={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/images/rating/big${formatRating(data[3].rating)}.png`} alt={`rating: ${data[3].rating}/5`}/>
            </div>
        </div>
    )
}
