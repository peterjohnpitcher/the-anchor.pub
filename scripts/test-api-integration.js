#!/usr/bin/env node

/**
 * Test script for verifying API integration changes
 * Run with: node scripts/test-api-integration.js
 */

async function testBusinessHoursAPI() {
  console.log('🔍 Testing Business Hours API Integration\n');
  
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  
  try {
    // Test 1: Internal API endpoint
    console.log('1. Testing internal API endpoint (/api/business-hours)...');
    const internalResponse = await fetch(`${baseUrl}/api/business-hours`);
    const internalData = await internalResponse.json();
    
    if (!internalResponse.ok) {
      console.error('❌ Internal API failed:', internalData);
      return;
    }
    
    // Check response structure
    if (internalData.success === true && internalData.data) {
      console.log('✅ Internal API returns wrapped response format');
      console.log('   - Has success wrapper:', !!internalData.success);
      console.log('   - Has data object:', !!internalData.data);
      console.log('   - Has regularHours:', !!internalData.data.regularHours);
      console.log('   - Has currentStatus:', !!internalData.data.currentStatus);
    } else if (internalData.regularHours) {
      console.log('⚠️  Internal API returns data directly (backward compatible)');
    } else {
      console.error('❌ Invalid response structure:', internalData);
      return;
    }
    
    // Test 2: Day names
    console.log('\n2. Testing day name format...');
    const hours = internalData.data || internalData;
    const dayNames = Object.keys(hours.regularHours);
    const allLowercase = dayNames.every(day => day === day.toLowerCase());
    
    if (allLowercase) {
      console.log('✅ Day names are lowercase:', dayNames.join(', '));
    } else {
      console.error('❌ Day names are not lowercase:', dayNames);
    }
    
    // Test 3: Time format
    console.log('\n3. Testing time format...');
    const monday = hours.regularHours.monday || hours.regularHours.Monday;
    if (monday && monday.opens) {
      const hasSeconds = monday.opens.split(':').length === 3;
      console.log(`✅ Time format ${hasSeconds ? 'includes' : 'missing'} seconds:`, monday.opens);
    }
    
    // Test 4: Kitchen status
    console.log('\n4. Testing kitchen status formats...');
    let foundKitchenFormats = new Set();
    
    Object.entries(hours.regularHours).forEach(([day, dayHours]) => {
      if (dayHours.kitchen === null) {
        foundKitchenFormats.add('null (no service)');
      } else if (dayHours.kitchen && dayHours.kitchen.is_closed === true) {
        foundKitchenFormats.add('is_closed: true');
      } else if (dayHours.kitchen && dayHours.kitchen.opens) {
        foundKitchenFormats.add('has opens/closes times');
      }
    });
    
    console.log('✅ Found kitchen formats:', Array.from(foundKitchenFormats).join(', '));
    
    // Test 5: Current status
    console.log('\n5. Testing current status...');
    console.log('   - Is Open:', hours.currentStatus.isOpen);
    console.log('   - Kitchen Open:', hours.currentStatus.kitchenOpen);
    console.log('   - Closes In:', hours.currentStatus.closesIn || 'N/A');
    console.log('   - Opens In:', hours.currentStatus.opensIn || 'N/A');
    
    // Test 6: Error handling
    console.log('\n6. Testing error handling...');
    const errorResponse = await fetch(`${baseUrl}/api/business-hours-fake`);
    console.log('   - 404 returns status:', errorResponse.status);
    
    console.log('\n✅ All tests completed!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
}

// Run tests
testBusinessHoursAPI();