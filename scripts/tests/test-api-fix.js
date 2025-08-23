#!/usr/bin/env node

// Test script to verify API fix for opening hours
// Run this with: ANCHOR_API_KEY=your_key node test-api-fix.js

const API_KEY = process.env.ANCHOR_API_KEY;

if (!API_KEY) {
  console.error('Error: ANCHOR_API_KEY environment variable not set');
  process.exit(1);
}

const API_URL = 'https://management.orangejelly.co.uk/api/business/hours';

async function testAPI() {
  console.log('=== API FIX VERIFICATION TEST ===');
  console.log('Testing API endpoint:', API_URL);
  console.log('Current time:', new Date().toISOString());
  console.log('Current UK time:', new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }));
  
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentTimeDecimal = currentHour + (currentMinute / 60);
  console.log(`Current time (decimal): ${currentTimeDecimal.toFixed(2)}`);
  console.log('---\n');
  
  try {
    const response = await fetch(API_URL, {
      headers: {
        'X-Authorization': API_KEY,
        'Accept': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.status !== 200) {
      console.error('❌ API returned non-200 status');
      return;
    }
    
    const data = await response.json();
    
    // Get today's info
    const today = new Date().toLocaleDateString('en-GB', { weekday: 'long' }).toLowerCase();
    const todayHours = data.regularHours[today];
    
    console.log(`\n=== TODAY'S HOURS (${today.toUpperCase()}) ===`);
    console.log(`Bar Opens: ${todayHours.opens}`);
    console.log(`Bar Closes: ${todayHours.closes}`);
    if (todayHours.kitchen) {
      console.log(`Kitchen Opens: ${todayHours.kitchen.opens}`);
      console.log(`Kitchen Closes: ${todayHours.kitchen.closes}`);
    } else {
      console.log('Kitchen: No service today');
    }
    
    console.log('\n=== CURRENT STATUS (from API) ===');
    console.log(`Bar isOpen: ${data.currentStatus.isOpen}`);
    console.log(`Kitchen isOpen: ${data.currentStatus.kitchenOpen}`);
    console.log(`API Current Time: ${data.currentStatus.currentTime}`);
    
    if (data.currentStatus.services) {
      console.log(`\nVenue Status: ${data.currentStatus.services.venue.open ? 'OPEN' : 'CLOSED'}`);
      if (data.currentStatus.services.venue.closesIn) {
        console.log(`Venue Closes In: ${data.currentStatus.services.venue.closesIn}`);
      }
      console.log(`Kitchen Status: ${data.currentStatus.services.kitchen.open ? 'OPEN' : 'CLOSED'}`);
      if (data.currentStatus.services.kitchen.closesIn) {
        console.log(`Kitchen Closes In: ${data.currentStatus.services.kitchen.closesIn}`);
      }
    }
    
    // Verify the fix
    console.log('\n=== FIX VERIFICATION ===');
    
    // Parse opening/closing times
    const [openHour, openMin] = todayHours.opens.split(':').map(Number);
    let [closeHour, closeMin] = todayHours.closes.split(':').map(Number);
    
    const openTime = openHour + (openMin / 60);
    let closeTime = closeHour + (closeMin / 60);
    
    // Handle midnight closing
    if (closeTime === 0) {
      closeTime = 24;
    }
    
    // Check if we should be open
    let shouldBeOpen = false;
    if (closeTime < openTime) {
      // Closes after midnight
      shouldBeOpen = currentTimeDecimal >= openTime || currentTimeDecimal < closeTime;
    } else {
      // Normal hours
      shouldBeOpen = currentTimeDecimal >= openTime && currentTimeDecimal < closeTime;
    }
    
    console.log(`Based on hours, bar should be: ${shouldBeOpen ? 'OPEN' : 'CLOSED'}`);
    console.log(`API says bar is: ${data.currentStatus.isOpen ? 'OPEN' : 'CLOSED'}`);
    
    if (shouldBeOpen === data.currentStatus.isOpen) {
      console.log('✅ API STATUS IS CORRECT!');
    } else {
      console.log('❌ API STATUS IS STILL INCORRECT!');
      console.log('   The bug has NOT been fixed.');
    }
    
    // Check kitchen if applicable
    if (todayHours.kitchen) {
      console.log('\n--- Kitchen Status Check ---');
      const [kitchenOpenHour, kitchenOpenMin] = todayHours.kitchen.opens.split(':').map(Number);
      const [kitchenCloseHour, kitchenCloseMin] = todayHours.kitchen.closes.split(':').map(Number);
      
      const kitchenOpenTime = kitchenOpenHour + (kitchenOpenMin / 60);
      const kitchenCloseTime = kitchenCloseHour + (kitchenCloseMin / 60);
      
      const kitchenShouldBeOpen = currentTimeDecimal >= kitchenOpenTime && currentTimeDecimal < kitchenCloseTime;
      
      console.log(`Based on hours, kitchen should be: ${kitchenShouldBeOpen ? 'OPEN' : 'CLOSED'}`);
      console.log(`API says kitchen is: ${data.currentStatus.kitchenOpen ? 'OPEN' : 'CLOSED'}`);
      
      if (kitchenShouldBeOpen === data.currentStatus.kitchenOpen) {
        console.log('✅ Kitchen status is correct');
      } else {
        console.log('❌ Kitchen status is incorrect');
      }
    }
    
    // Summary
    console.log('\n=== SUMMARY ===');
    if (shouldBeOpen === data.currentStatus.isOpen && 
        (!todayHours.kitchen || 
         (currentTimeDecimal >= parseFloat(todayHours.kitchen.opens.split(':')[0]) + parseFloat(todayHours.kitchen.opens.split(':')[1])/60 &&
          currentTimeDecimal < parseFloat(todayHours.kitchen.closes.split(':')[0]) + parseFloat(todayHours.kitchen.closes.split(':')[1])/60) === data.currentStatus.kitchenOpen)) {
      console.log('🎉 THE API FIX IS WORKING CORRECTLY!');
      console.log('All status indicators are now showing the correct values.');
    } else {
      console.log('⚠️ THE API FIX IS NOT COMPLETE');
      console.log('There are still issues with the status calculation.');
    }
    
  } catch (error) {
    console.error('Error making request:', error);
  }
}

testAPI();