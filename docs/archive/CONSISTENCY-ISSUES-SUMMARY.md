# Consistency Issues - Quick Fix Guide

## 🚨 CRITICAL - Fix Immediately!

### 1. ❌ WRONG PHONE NUMBER on Pizza Page
**File:** `/app/food/pizza/page.tsx`  
**Line:** 115 & 206  
**Current:** `01784421181`  
**Should be:** `01753682707`  
**Fix:** Replace both instances immediately

### 2. ❌ WRONG OPENING HOURS in Schema  
**File:** `/lib/schema.ts`  
**Lines:** 64-69  
**Issue:** Shows Monday as OPEN (16:00-22:00)  
**Reality:** CLOSED on Mondays  
**Fix:** Remove entire Monday block from openingHoursSpecification

### 3. ❌ FAKE GPS COORDINATES
**File:** `/lib/schema.ts`  
**Line:** 49-50  
**Current:** `51.4567, -0.4567` (placeholder!)  
**Correct:** `51.4764, -0.4735`  
**Fix:** Update to real coordinates

## 🟡 Quick Fixes (Under 5 mins each)

### Phone Number Format
Create `/lib/constants.ts`:
```typescript
export const CONTACT = {
  phone: '01753 682707',
  phoneHref: 'tel:01753682707',
  phoneIntl: '+441753682707'
}
```

### Brand Name Rule
- Always use: **"The Anchor"**
- With location: **"The Anchor, Stanwell Moor"**
- Never: "The Anchor Pub" ❌

### Parking Capacity
- Find actual number (likely 30-40 spaces)
- Update `/app/find-us/page.tsx` line mentioning "20 spaces"

## 📊 Impact Score

**Customer Impact:**
- Wrong phone: ⭐⭐⭐⭐⭐ (customers can't call!)
- Wrong hours: ⭐⭐⭐⭐ (Monday visitors disappointed)
- Wrong location: ⭐⭐⭐ (navigation failures)

**Fix Priority:**
1. Phone number - 2 minutes
2. Monday hours - 2 minutes  
3. GPS coords - 2 minutes
4. Everything else - 1-2 hours total

---

*These 3 critical issues could be losing customers RIGHT NOW. Fix them first!*