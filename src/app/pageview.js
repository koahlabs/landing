// app/pageview.js
"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function PostHogPageView() {
  // Track pageviews
  useEffect(() => {
    if (posthog) {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
      });
    }
  }, [location]);
  return null;
}
