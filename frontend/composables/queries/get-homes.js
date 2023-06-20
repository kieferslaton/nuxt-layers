export default async function (queryString) {
  const config = useRuntimeConfig();
  const response = await fetch(
    `${config.public.regionalApiUrl}/search?storeId=1${queryString}`
  );
  const data = await response.json();
  return data;
};