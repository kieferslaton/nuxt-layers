export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const locations = [
    {
      name: "Regional Homes of Byram",
      address: "Byram Home Center, 5551 I-55, Byram, MS 39272",
      latitude: 32.1881828,
      longitude: -90.2558432,
      phoneNumber: "601-373-4453",
      locationUrl: "http://regionalhomesbyram.com",
      city: "Byram",
      state: "MS",
      zip: "39272",
    },
    {
      name: "Regional Homes of Columbus",
      address: "Columbus Home Center, 7120 US-45, Columbus, MS 39705",
      latitude: 33.59541430000001,
      longitude: -88.4245957,
      phoneNumber: "662-570-1375",
      locationUrl: "https://regionalhomescolumbus.com",
      city: "Columbus",
      state: "MS",
      zip: "39705",
    },
    {
      name: "Regional Homes of Gulfport",
      address: "Gulfport Home Center, 8655, 15489 US 49, Gulfport, MS 39503",
      latitude: 30.5137278,
      longitude: -89.1095419,
      phoneNumber: "228-832-0710",
      locationUrl: "https://regionalhomesgulfport.com",
      city: "Gulfport",
      state: "MS",
      zip: "39503",
    },
    {
      name: "Repo Home Center of Hattiesburg",
      address: "Hattiesburg Home Center, 7756 US 49, Hattiesburg, MS 39402",
      latitude: 31.4157028,
      longitude: -89.40445700000001,
      phoneNumber: "601-261-6005",
      locationUrl: "https://reposofhattiesburg.com",
      city: "Hattiesburg",
      state: "MS",
      zip: "39402",
    },
    {
      name: "Town and Country Homes of Hattiesburg",
      address: "7495 US 49, Hattiesburg, MS 39402",
      latitude: 31.4007998,
      longitude: -89.3900006,
      phoneNumber: "601-602-2378",
      locationUrl: "https://townandcountryhattiesburg.com",
      city: "Hattiesburg",
      state: "MS",
      zip: "39402",
    },
    {
      name: "Regional Homes of Laurel",
      address: "Laurel Home Center, 5185 Hwy 84 W, Laurel, MS 39443",
      latitude: 31.67545609999999,
      longitude: -89.26077099999999,
      phoneNumber: "601-428-8218",
      locationUrl: "https://regionalhomeslaurel.com",
      city: "Laurel",
      state: "MS",
      zip: "39443",
    },
    {
      name: "Regional Homes of McComb",
      address: "McComb Home Center, 621 W Presley Blvd, McComb, MS 39648",
      latitude: 31.2241356,
      longitude: -90.4668216,
      phoneNumber: "601-249-4270",
      locationUrl: "https://regionalhomesmccomb.com",
      city: "McComb",
      state: "MS",
      zip: "39648",
    },
    {
      name: "Regional Homes of Pearl",
      address: "Pearl Home Center, 2845 US-80, Pearl, MS 39208",
      latitude: 32.2817862,
      longitude: -90.1223681,
      phoneNumber: "601-939-1459",
      locationUrl: "https://regionalhomespearl.com",
      city: "Pearl",
      state: "MS",
      zip: "39208",
    },
    {
      name: "Regional Homes of Pontotoc",
      address: "Pontotoc Home Center, 2753 MS-15, Pontotoc, MS 38863",
      latitude: 34.2482879,
      longitude: -89.0226858,
      phoneNumber: "662-488-9033",
      locationUrl: "https://regionalhomespontotoc.com",
      city: "Pontotoc",
      state: "MS",
      zip: "38863",
    },
    {
      name: "Regional Homes of Ecru",
      address: "Regional Home Center, 5048 MS-15, Pontotoc, MS 38863",
      latitude: 34.319374,
      longitude: -89.0381393,
      phoneNumber: "662-488-9488",
      locationUrl: "https://regionalhomesecru.com",
      city: "Pontotoc",
      state: "MS",
      zip: "38863",
    },
    {
      name: "Gum Tree Homes",
      address: "1503 S Gloster St, Tupelo, MS 38801",
      latitude: 34.22246700000001,
      longitude: -88.7194631,
      phoneNumber: "(662) 842-1024",
      locationUrl: "https://wheelestatetupelo.com",
      city: "Tupelo",
      state: "MS",
      zip: "38801",
    },
    {
      name: "Regional Homes of Lafayette",
      address: "2815 NW Evangeline Thruway, Lafayette, LA 70507",
      latitude: 30.2758823,
      longitude: -92.0208335,
      phoneNumber: "337-366-6631",
      locationUrl: "https://regionalhomeslafayette.com",
      city: "Lafayette",
      state: "LA",
      zip: "70507",
    },
    {
      name: "Regional Homes of Mobile",
      address:
        "Regional Home Center Of Mobile, 7251 Moffett Rd, Mobile, AL 36618",
      latitude: 30.754795,
      longitude: -88.2127532,
      phoneNumber: "251-649-2077",
      locationUrl: "https://regionalhomesmobile.com",
      city: "Mobile",
      state: "AL",
      zip: "36618",
    },
    {
      name: "Regional Homes of Florence",
      address: "2213 E Palmetto St, Florence, SC 29506",
      latitude: 34.1974406,
      longitude: -79.7262174,
      phoneNumber: "843-413-0440",
      locationUrl: "https://regionalhomesflorence.com",
      city: "Florence",
      state: "SC",
      zip: "29506",
    },
  ];

  let filteredLocations = locations;

  if (query.searchTerm && query.searchTerm.length > 2) {
    if (/\d/.test(query.searchTerm)) {
      filteredLocations = locations.filter((location) =>
        location.zip.includes(query.searchTerm)
      );
    } else {
      filteredLocations = locations.filter((location) =>
        location.city.toLowerCase().includes(query.searchTerm.toLowerCase())
      );
    }
  }

  return filteredLocations;
});
