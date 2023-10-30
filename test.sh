#!/bin/bash

#
# This source file is part of the Stanford OwnYourData Application project
#
# SPDX-FileCopyrightText: 2023 Stanford University
#
# SPDX-License-Identifier: MIT
#

set -e

CONTENT=$(curl --fail http://localhost)
echo "$CONTENT" | grep "Welcome to the Stanford Spezi Template Web Dashboard"

echo "✅ Test Passed!"
