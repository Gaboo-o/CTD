export async function dataFetch(url) {
    try {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.github.v3+json" //force JSON response
            }
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        return await response.json();
    } 
    catch (error) {
        console.error(error);
    }
}