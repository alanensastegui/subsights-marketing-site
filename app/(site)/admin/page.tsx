// "use client";

// import { useState, useEffect } from "react";
// import { DEMO_TARGETS } from "@/lib/config/demo-targets";
// import { getDemoEvents, clearDemoEvents } from "@/lib/demo/analytics";
// import { FALLBACK_MESSAGES } from "@/lib/demo/fallback";

// /**
//  * Demo Admin Dashboard
//  * 
//  * IMPORTANT: This dashboard only shows LOCAL browser data stored in localStorage.
//  * Each user/device will see their own demo events. This is intentional for:
//  * - Zero backend complexity
//  * - Privacy compliance
//  * - Immediate MVP functionality
//  * - Individual testing/debugging
//  */
// export default function AdminPage() {
//     const [events, setEvents] = useState<any[]>([]);
//     const [isAuthorized, setIsAuthorized] = useState(false);
//     const [password, setPassword] = useState("");

//     useEffect(() => {
//         // Simple password protection - in production, use proper auth
//         const stored = localStorage.getItem("admin_authorized");
//         if (stored === "true") {
//             setIsAuthorized(true);
//             loadEvents();
//         }
//     }, []);

//     const loadEvents = () => {
//         const demoEvents = getDemoEvents();
//         setEvents(demoEvents);
//     };

//     const handleLogin = () => {
//         const correctPassword = "subsights2025!";

//         if (password === correctPassword) {
//             setIsAuthorized(true);
//             localStorage.setItem("admin_authorized", "true");
//             loadEvents();
//         } else {
//             alert("Invalid password");
//         }
//     };

//     const handleClearEvents = () => {
//         if (confirm("Clear all demo events?")) {
//             clearDemoEvents();
//             setEvents([]);
//         }
//     };

//     const testDemo = async (slug: string, mode: string) => {
//         const url = `/demo/${slug}?force=${mode}`;
//         window.open(url, "_blank");
//     };

//     if (!isAuthorized) {
//         return (
//             <div className="py-20">
//                 <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border p-6">
//                     <h1 className="text-2xl font-bold mb-4">Demo Admin</h1>
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium mb-2">Password</label>
//                             <input
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="w-full rounded-lg border border-input bg-background px-3 py-2"
//                                 onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && handleLogin()}
//                             />
//                         </div>
//                         <button
//                             onClick={handleLogin}
//                             className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
//                         >
//                             Login
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const eventsBySlug = events.reduce((acc, event) => {
//         const slug = event.slug || "unknown";
//         if (!acc[slug]) acc[slug] = [];
//         acc[slug].push(event);
//         return acc;
//     }, {} as Record<string, any[]>);

//     const getSuccessRate = (slug: string) => {
//         const slugEvents = eventsBySlug[slug] || [];
//         const total = slugEvents.length;
//         const failures = slugEvents.filter((e: any) => e.reason !== "force-policy").length;
//         return total > 0 ? Math.round(((total - failures) / total) * 100) : 100;
//     };

//     return (
//         <div className="py-12 space-y-8">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-3xl font-bold">Demo Admin</h1>
//                     <p className="text-sm text-muted-foreground mt-1">
//                         📍 Local browser data only - not shared across devices or users
//                     </p>
//                 </div>
//                 <div className="flex gap-2">
//                     <button
//                         onClick={loadEvents}
//                         className="rounded-lg border border-input bg-background px-4 py-2 hover:bg-accent"
//                     >
//                         Refresh
//                     </button>
//                     <button
//                         onClick={handleClearEvents}
//                         className="rounded-lg bg-destructive px-4 py-2 text-destructive-foreground hover:bg-destructive/90"
//                     >
//                         Clear Events
//                     </button>
//                 </div>
//             </div>

//             {/* Demo Targets Overview */}
//             <div className="bg-white rounded-lg border">
//                 <div className="px-6 py-4 border-b">
//                     <h2 className="text-xl font-semibold">Demo Targets</h2>
//                     <p className="text-sm text-muted-foreground">
//                         {DEMO_TARGETS.length} configured demo targets
//                     </p>
//                 </div>
//                 <div className="divide-y">
//                     {DEMO_TARGETS.map((target) => (
//                         <div key={target.slug} className="px-6 py-4">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <h3 className="font-medium">{target.label}</h3>
//                                     <p className="text-sm text-muted-foreground">{target.url}</p>
//                                     <div className="flex gap-2 mt-1">
//                                         <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                                             {target.policy || "auto"}
//                                         </span>
//                                         {target.allowIframe === false && (
//                                             <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
//                                                 iframe disabled
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-4">
//                                     <div className="text-right">
//                                         <div className="text-lg font-semibold">
//                                             {getSuccessRate(target.slug)}%
//                                         </div>
//                                         <div className="text-xs text-muted-foreground">
//                                             success rate
//                                         </div>
//                                     </div>
//                                     <div className="flex gap-1">
//                                         <button
//                                             onClick={() => testDemo(target.slug, "proxy")}
//                                             className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 hover:bg-green-200"
//                                         >
//                                             Proxy
//                                         </button>
//                                         <button
//                                             onClick={() => testDemo(target.slug, "iframe")}
//                                             className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200"
//                                         >
//                                             Iframe
//                                         </button>
//                                         <button
//                                             onClick={() => testDemo(target.slug, "default")}
//                                             className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800 hover:bg-gray-200"
//                                         >
//                                             Default
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Recent Events */}
//             <div className="bg-white rounded-lg border">
//                 <div className="px-6 py-4 border-b">
//                     <h2 className="text-xl font-semibold">Recent Events</h2>
//                     <p className="text-sm text-muted-foreground">
//                         {events.length} events tracked in this browser only
//                     </p>
//                     <div className="mt-2 text-xs text-muted-foreground bg-blue-50 border border-blue-200 rounded-lg p-2">
//                         💡 <strong>Local Data Only:</strong> These events are stored in your browser's local storage.
//                         Other team members will see their own events on their devices.
//                     </div>
//                 </div>
//                 <div className="max-h-96 overflow-y-auto">
//                     {events.length === 0 ? (
//                         <div className="px-6 py-8 text-center text-muted-foreground">
//                             No events recorded yet. Visit some demo pages to see data here.
//                         </div>
//                     ) : (
//                         <div className="divide-y">
//                             {events.slice(0, 50).map((event, index) => (
//                                 <div key={index} className="px-6 py-3">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <div className="flex items-center gap-2">
//                                                 <span className="font-medium">{event.slug}</span>
//                                                 <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${event.chosenMode === "proxy"
//                                                     ? "bg-green-100 text-green-800"
//                                                     : event.chosenMode === "iframe"
//                                                         ? "bg-blue-100 text-blue-800"
//                                                         : "bg-gray-100 text-gray-800"
//                                                     }`}>
//                                                     {event.chosenMode}
//                                                 </span>
//                                             </div>
//                                             <p className="text-sm text-muted-foreground">
//                                                 {FALLBACK_MESSAGES[event.reason as keyof typeof FALLBACK_MESSAGES] || event.reason}
//                                             </p>
//                                         </div>
//                                         <div className="text-right text-xs text-muted-foreground">
//                                             {new Date(event.timestamp).toLocaleString()}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-white rounded-lg border p-6">
//                 <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
//                 <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                         <h3 className="font-medium mb-2">Test All Demos</h3>
//                         <div className="space-y-2">
//                             {DEMO_TARGETS.map((target) => (
//                                 <div key={target.slug} className="flex items-center gap-2">
//                                     <span className="text-sm min-w-0 flex-1 truncate">{target.label}</span>
//                                     <a
//                                         href={`/demo/${target.slug}`}
//                                         target="_blank"
//                                         className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
//                                     >
//                                         Test
//                                     </a>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div>
//                         <h3 className="font-medium mb-2">System Info</h3>
//                         <div className="text-sm space-y-1">
//                             <div>Total Targets: {DEMO_TARGETS.length}</div>
//                             <div>Total Events: {events.length}</div>
//                             <div>Avg Success Rate: {
//                                 DEMO_TARGETS.length > 0
//                                     ? Math.round(DEMO_TARGETS.reduce((sum, target) => sum + getSuccessRate(target.slug), 0) / DEMO_TARGETS.length)
//                                     : 100
//                             }%</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
