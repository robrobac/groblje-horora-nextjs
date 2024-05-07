const getViews = async (slug) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/incr`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug }),
        });
        const data = await response.json();
        console.log("dadaadadadaa:",data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default async function ViewCounter({slug}) {
    const views = await getViews(slug)

    return `${views} ${views % 10 === 1 ? 'pregled' : 'pregleda'}`
}
