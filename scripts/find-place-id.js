// Script to help find The Anchor's Google Place ID
console.log('Finding The Anchor\'s Google Place ID...\n');

console.log('Since the API key has referrer restrictions, please use one of these methods:\n');

console.log('METHOD 1: Google Place ID Finder (Recommended)');
console.log('==============================================');
console.log('1. Visit: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder');
console.log('2. In the search box, type: The Anchor Stanwell Moor');
console.log('3. Click on the result for The Anchor pub');
console.log('4. The Place ID will be displayed below the map');
console.log('5. It will look like: ChIJ... (starts with ChIJ)\n');

console.log('METHOD 2: From Google Maps URL');
console.log('==============================');
console.log('1. Visit: https://g.page/theanchorpubsm?share');
console.log('2. After it redirects, look at the URL');
console.log('3. The Place ID might be in the URL after "place/" or in the data parameter\n');

console.log('METHOD 3: Using Google Maps');
console.log('===========================');
console.log('1. Go to https://maps.google.com');
console.log('2. Search for: The Anchor, Horton Road, Stanwell Moor, Surrey TW19 6AQ');
console.log('3. Click on The Anchor pub');
console.log('4. In the URL, look for the Place ID after "place/"\n');

console.log('Known details for The Anchor:');
console.log('- Name: The Anchor');
console.log('- Address: Horton Road, Stanwell Moor, Surrey TW19 6AQ');
console.log('- Coordinates: 51.462509, -0.502067');
console.log('- Google Business Account ID: 3574093756936907293\n');

console.log('Once you have the Place ID, add it to .env.local:');
console.log('GOOGLE_PLACE_ID=ChIJ...');