import { createClient } from "../../../lib/supabase/server";
import { FeedContainer } from "../../../components/feed/FeedContainer";
import type { BusinessData } from "../../../components/feed/BusinessCard";

export default async function HomePage() {
  const supabase = await createClient();

  // We are fetching basic business payload if it existed
  // Gracefully handle absent database via missing logic
  let { data: businesses, error } = await supabase
    .from('businesses')
    .select('*')
    .limit(10);

  let feedItems: BusinessData[] = [];

  if (businesses && businesses.length > 0) {
    feedItems = businesses.map(b => ({
      id: b.business_id || b.id,
      name: b.name,
      category: b.category,
      avatarUrl: b.logo_url || null,
      visitCount: Math.floor(Math.random() * 10), // Default representation
      triggerVisitCount: 10,
      offerTeaser: "Get a free reward!",
    }));
  } else {
    // Inject Mock Data explicitly so UI can be visualized beautifully
    feedItems = [
      {
        id: "1",
        name: "Neon Beans Coffee",
        category: "Cafe",
        visitCount: 7,
        triggerVisitCount: 10,
        offerTeaser: "Free artisan pastry on 10th visit",
      },
      {
        id: "2",
        name: "Cyber Fit Gym",
        category: "Gym",
        visitCount: 3,
        triggerVisitCount: 10,
        offerTeaser: "1 month free premium upgrade",
      },
      {
        id: "3",
        name: "Glamour Salon",
        category: "Salon",
        visitCount: 4,
        triggerVisitCount: 5,
        offerTeaser: "50% off styling session",
      }
    ];
  }

  return (
    <div style={{ paddingTop: "16px", paddingBottom: "32px", display: "flex", flexDirection: "column" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "var(--color-text-primary)" }}>
          Hey Customer 👋
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", marginTop: "4px" }}>
          Ready to earn some rewards?
        </p>
      </div>

      <FeedContainer initialItems={feedItems} />

    </div>
  );
}

// Ensure dynamic rendering
export const dynamic = "force-dynamic";
