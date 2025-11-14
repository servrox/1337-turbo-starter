// Copyright (c) 2024 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { PaginatedObjectsResponse } from "@iota/iota-sdk/client";
import { hasDisplayData } from "@repo/iota-core";

export function filterAssetList(pages: PaginatedObjectsResponse[], shouldBeVisual: boolean) {
  return (
    pages
      .flatMap((page) => page.data)
      .filter((asset) => asset.data && asset.data.objectId && hasDisplayData(asset) === shouldBeVisual)
      .map((response) => response.data!) ?? []
  );
}
