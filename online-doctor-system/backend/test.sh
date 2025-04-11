#!/bin/bash

echo "🔄 Starting Full API Test Suite..."

API_URL="http://localhost:5000/api"
CONTENT_TYPE_HEADER="Content-Type: application/json"

# User credentials
ADMIN_EMAIL="admin@y"
ADMIN_PASS="adminy"
DOCTOR_EMAIL="doctor@y"
DOCTOR_PASS="doctory"
PATIENT_EMAIL="user@y"
PATIENT_PASS="usery"

# Test users for delete & block
DELETE_EMAIL="delete@y"
DELETE_PASS="deletey"
BLOCK_EMAIL="block@y"
BLOCK_PASS="blocky"

# Storage
TOKENS=()

# --- 1. Login users ---
echo "🔐 Logging in users..."

login() {
  local EMAIL=$1
  local PASS=$2

  RESPONSE=$(curl -s -X POST $API_URL/auth/login \
    -H "$CONTENT_TYPE_HEADER" \
    -d "{\"email\":\"$EMAIL\", \"password\":\"$PASS\"}")

  TOKEN=$(echo $RESPONSE | jq -r .token)
  echo $TOKEN
}

ADMIN_TOKEN=$(login "$ADMIN_EMAIL" "$ADMIN_PASS")
DOCTOR_TOKEN=$(login "$DOCTOR_EMAIL" "$DOCTOR_PASS")
PATIENT_TOKEN=$(login "$PATIENT_EMAIL" "$PATIENT_PASS")

if [[ -z "$ADMIN_TOKEN" || -z "$DOCTOR_TOKEN" || -z "$PATIENT_TOKEN" ]]; then
  echo "❌ Login failed for one or more users."
  exit 1
else
  echo "✅ All users logged in successfully."
fi

# --- 2. Create Test Users ---
echo "👤 Creating test users..."

create_user() {
  local NAME=$1
  local EMAIL=$2
  local PASS=$3
  local ROLE=$4

  RESPONSE=$(curl -s -X POST $API_URL/auth/register \
    -H "$CONTENT_TYPE_HEADER" \
    -d "{\"name\":\"$NAME\", \"email\":\"$EMAIL\", \"password\":\"$PASS\", \"role\":\"$ROLE\"}")

  echo $RESPONSE | grep -q "User registered successfully"
}

create_user "User Delete" "$DELETE_EMAIL" "$DELETE_PASS" "Patient"
create_user "User Block" "$BLOCK_EMAIL" "$BLOCK_PASS" "Patient"

if [[ $? -eq 0 ]]; then
  echo "✅ Test users created."
else
  echo "❌ Test user creation failed."
  exit 1
fi

# --- 3. Admin Dashboard ---
echo "📊 Admin dashboard..."
curl -s -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $ADMIN_TOKEN" "$API_URL/admin/dashboard" | jq

# --- 4. Admin get all users ---
echo "📋 Getting all users..."
curl -s -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $ADMIN_TOKEN" "$API_URL/admin/users" | jq

# --- 5. Admin toggle block ---
echo "🚫 Blocking user $BLOCK_EMAIL..."
BLOCK_USER_ID=$(curl -s -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $ADMIN_TOKEN" "$API_URL/admin/users" | jq -r ".[] | select(.email==\"$BLOCK_EMAIL\") | .id")

curl -s -X PATCH "$API_URL/admin/users/$BLOCK_USER_ID/block" \
  -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $ADMIN_TOKEN" | jq

# --- 6. Admin delete user ---
echo "🗑️ Deleting user $DELETE_EMAIL..."
DELETE_USER_ID=$(curl -s -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $ADMIN_TOKEN" "$API_URL/admin/users" | jq -r ".[] | select(.email==\"$DELETE_EMAIL\") | .id")

curl -s -X DELETE "$API_URL/admin/users/$DELETE_USER_ID" \
  -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $ADMIN_TOKEN" | jq

# --- 7. Doctor dashboard ---
echo "🩺 Doctor dashboard..."
curl -s -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $DOCTOR_TOKEN" "$API_URL/doctor/dashboard" | jq

# --- 8. Doctor set availability ---
echo "📅 Doctor sets availability..."
curl -s -X POST "$API_URL/doctor/availability" \
  -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $DOCTOR_TOKEN" \
  -d '{"date": "2025-04-11", "time": "15:00"}' | jq

# --- 9. Patient books appointment ---
echo "📞 Patient books appointment..."
DOCTOR_ID=$(curl -s -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $ADMIN_TOKEN" "$API_URL/admin/users/Doctor" | jq -r '.[0]._id')

curl -s -X POST "$API_URL/appointments/book" \
  -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $PATIENT_TOKEN" \
  -d "{\"doctorId\":\"$DOCTOR_ID\",\"date\":\"2025-04-11\",\"time\":\"15:00\"}" | jq

# --- 10. Doctor views appointments ---
echo "🗂️ Doctor views appointments..."
curl -s -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $DOCTOR_TOKEN" "$API_URL/appointments/doctor" | jq

# --- 11. Patient views appointments ---
echo "🧑 Patient views appointments..."
curl -s -H "$CONTENT_TYPE_HEADER" -H "Authorization: Bearer $PATIENT_TOKEN" "$API_URL/appointments/patient" | jq

echo "✅ All tests executed."
