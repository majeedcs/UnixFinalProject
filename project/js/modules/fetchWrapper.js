export async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
    }
    return await response.json();
}
