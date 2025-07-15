#!/usr/bin/env node

/**
 * Fix Wix Image URLs
 * Converts Wix thumbnail URLs to full-size image URLs
 */

function getFullSizeWixUrl(thumbnailUrl) {
  // Check if it's a Wix static URL
  if (!thumbnailUrl.includes('static.wixstatic.com')) {
    return thumbnailUrl;
  }
  
  // Extract the base image ID and extension
  const match = thumbnailUrl.match(/\/media\/([a-f0-9_]+~mv2\.[a-zA-Z]+)/);
  if (match) {
    const imageId = match[1];
    // Return full size URL without any transformation parameters
    return `https://static.wixstatic.com/media/${imageId}`;
  }
  
  // If it already has transformation parameters, remove them
  if (thumbnailUrl.includes('/v1/')) {
    const baseUrl = thumbnailUrl.split('/v1/')[0];
    return baseUrl;
  }
  
  return thumbnailUrl;
}

// Test examples
const testUrls = [
  'https://static.wixstatic.com/media/1c749e_016664c745da4451be66cac2c1a62bbc~mv2.jpg/v1/fill/w_147,h_83,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/1c749e_016664c745da4451be66cac2c1a62bbc~mv2.jpg',
  'https://static.wixstatic.com/media/1c749e_8d5c6a4f8f5648c5a2cef9f4dac4f8c0~mv2.png/v1/fill/w_200,h_200/image.png'
];

console.log('Testing URL conversion:\n');
testUrls.forEach(url => {
  console.log('Thumbnail:', url);
  console.log('Full Size:', getFullSizeWixUrl(url));
  console.log('');
});

module.exports = { getFullSizeWixUrl };