#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"

if [[ "$VERCEL_ENV" == "production" ]] ; then
  # Proceed with the build
  echo "✅ - Pushing Production. Build can proceed"
  exit 1;

elif [[ "$VERCEL_ENV" == "staging" ]] ; then
  # Proceed with the build
  echo "✅ - Pushing Staging. Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi