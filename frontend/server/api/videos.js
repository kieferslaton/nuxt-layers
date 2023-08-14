export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  let baseUrl = "https://www.googleapis.com/youtube/v3";
  let key = "AIzaSyBFXUNTPnfh7WzYHM-N5AAKOfQlcPy7a20";

  try {
    const response = await fetch(
      `${baseUrl}/channels?part=contentDetails&id=UCo7FiV7YkNPb5lBnh0p5grA&key=${key}&maxResults=50`
    );
    const channel = await response.json();
    const playlistId = channel.items[0].contentDetails.relatedPlaylists.uploads;
    const playlistResponse = await fetch(
      `${baseUrl}/playlistItems?part=snippet&playlistId=${playlistId}&key=${key}&maxResults=10`
    );
    const data = await playlistResponse.json();
    return data.items.map((item) => {
      return {
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
      };
    });
  } catch (e) {
    console.log(e);
  }
});
