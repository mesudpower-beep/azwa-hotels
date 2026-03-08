import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarDays, Users, DollarSign, TrendingUp, 
  Search, Filter, Eye, Check, X, ChevronLeft,
  Mail, Phone, MessageCircle, BarChart3, Inbox,
  LogIn, Lock
} from "lucide-react";
import { toast } from "sonner";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  room_type: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  total_price: number;
  currency: string;
  status: string;
  payment_status: string;
  special_requests: string | null;
  created_at: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

const ADMIN_PASSWORD = "azwa2024admin";

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"bookings" | "messages" | "analytics">("bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
  }, [authenticated]);

  const fetchData = async () => {
    setLoading(true);
    const [bookingsRes, messagesRes] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    if (bookingsRes.data) setBookings(bookingsRes.data);
    if (messagesRes.data) setMessages(messagesRes.data);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      toast.success("Welcome to Admin Dashboard");
    } else {
      toast.error("Invalid password");
    }
  };

  const markMessageRead = async (id: string) => {
    await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.total_price), 0);
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const unreadMessages = messages.filter(m => !m.is_read).length;

  if (!authenticated) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold gold-text tracking-wider mb-2">AZWA HOTEL</h1>
            <p className="text-muted-foreground font-body text-sm">Admin Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-border/50 rounded-lg text-foreground font-body text-sm outline-none focus:border-primary/40 transition-all"
              />
            </div>
            <button type="submit" className="w-full neon-button text-primary-foreground py-3 text-sm tracking-wider uppercase font-body font-semibold flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Top Bar */}
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-display text-xl font-bold gold-text tracking-wider">AZWA</a>
            <span className="text-muted-foreground font-body text-sm">/ Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {unreadMessages > 0 && (
              <span className="text-xs font-body bg-destructive/20 text-destructive px-2 py-1 rounded-full">
                {unreadMessages} new messages
              </span>
            )}
            <button onClick={() => setAuthenticated(false)} className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: CalendarDays, label: "Total Bookings", value: bookings.length, color: "text-primary" },
            { icon: DollarSign, label: "Total Revenue", value: `${totalRevenue.toLocaleString()} ETB`, color: "text-accent" },
            { icon: Users, label: "Pending", value: pendingBookings, color: "text-yellow-500" },
            { icon: Inbox, label: "Unread Messages", value: unreadMessages, color: "text-destructive" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs font-body text-muted-foreground tracking-wider uppercase">{stat.label}</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "bookings" as const, label: "Bookings", icon: CalendarDays },
            { key: "messages" as const, label: "Messages", icon: Mail },
            { key: "analytics" as const, label: "Analytics", icon: BarChart3 },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs tracking-wider uppercase font-body rounded-lg border transition-all ${
                activeTab === tab.key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/30 text-muted-foreground hover:border-primary/30"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.key === "messages" && unreadMessages > 0 && (
                <span className="bg-destructive text-destructive-foreground text-[9px] px-1.5 py-0.5 rounded-full">{unreadMessages}</span>
              )}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/30 border border-border/50 rounded-lg text-foreground font-body text-sm outline-none focus:border-primary/40 transition-all"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-secondary/30 border border-border/50 rounded-lg text-foreground font-body text-sm outline-none focus:border-primary/40"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-20 text-muted-foreground font-body">Loading bookings...</div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground font-body">No bookings found</div>
            ) : (
              <div className="space-y-3">
                {filteredBookings.map((booking, i) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedBooking(booking)}
                    className="glass-card p-4 cursor-pointer hover:border-primary/30 transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-body font-bold text-xs">
                          {booking.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-display text-sm font-bold text-foreground">{booking.name}</p>
                          <p className="text-xs text-muted-foreground font-body">{booking.room_type} · {booking.check_in} → {booking.check_out}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                          booking.status === "confirmed" ? "bg-primary/20 text-primary" :
                          booking.status === "cancelled" ? "bg-destructive/20 text-destructive" :
                          "bg-yellow-500/20 text-yellow-500"
                        }`}>
                          {booking.status}
                        </span>
                        <span className="font-display text-sm font-bold text-foreground">{Number(booking.total_price).toLocaleString()} {booking.currency}</span>
                        <Eye className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground font-body">No messages yet</div>
            ) : messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`glass-card p-5 ${!msg.is_read ? "border-primary/30" : ""}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                      {msg.name}
                      {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    </p>
                    <p className="text-xs text-muted-foreground font-body">{msg.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground font-body">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                    {!msg.is_read && (
                      <button
                        onClick={() => markMessageRead(msg.id)}
                        className="text-xs text-primary hover:text-primary/80 font-body transition-colors"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-foreground/80 font-body leading-relaxed">{msg.message}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "King Rooms Booked", value: bookings.filter(b => b.room_type === "king").length },
                { label: "Deluxe Rooms Booked", value: bookings.filter(b => b.room_type === "deluxe").length },
                { label: "Twin Double Booked", value: bookings.filter(b => b.room_type === "twin-double").length },
                { label: "Family Triple Booked", value: bookings.filter(b => b.room_type === "family-triple").length },
                { label: "Avg Revenue / Booking", value: bookings.length > 0 ? `${Math.round(totalRevenue / bookings.length).toLocaleString()} ETB` : "N/A" },
                { label: "Total Messages", value: messages.length },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card p-6 text-center"
                >
                  <p className="text-xs font-body text-muted-foreground tracking-wider uppercase mb-2">{stat.label}</p>
                  <p className="font-display text-3xl font-bold gold-text">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-6 mt-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Recent Booking Timeline</h3>
              <div className="space-y-3">
                {bookings.slice(0, 10).map((b, i) => (
                  <div key={b.id} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm font-body text-foreground">{b.name} — {b.room_type}</span>
                      <span className="text-xs text-muted-foreground font-body">
                        {new Date(b.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-foreground">Booking Details</h3>
                <button onClick={() => setSelectedBooking(null)} className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center hover:bg-primary/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Guest Name", value: selectedBooking.name },
                  { label: "Email", value: selectedBooking.email },
                  { label: "Phone", value: selectedBooking.phone },
                  { label: "Room Type", value: selectedBooking.room_type },
                  { label: "Check-in", value: selectedBooking.check_in },
                  { label: "Check-out", value: selectedBooking.check_out },
                  { label: "Adults", value: selectedBooking.adults },
                  { label: "Children", value: selectedBooking.children },
                  { label: "Total Price", value: `${Number(selectedBooking.total_price).toLocaleString()} ${selectedBooking.currency}` },
                  { label: "Status", value: selectedBooking.status },
                  { label: "Payment Status", value: selectedBooking.payment_status },
                  { label: "Booked On", value: new Date(selectedBooking.created_at).toLocaleString() },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-xs font-body text-muted-foreground tracking-wider uppercase">{label}</span>
                    <span className="text-sm font-body text-foreground font-medium">{value}</span>
                  </div>
                ))}
                {selectedBooking.special_requests && (
                  <div className="pt-2">
                    <p className="text-xs font-body text-muted-foreground tracking-wider uppercase mb-2">Special Requests</p>
                    <p className="text-sm font-body text-foreground/80 bg-secondary/30 p-3 rounded-lg">{selectedBooking.special_requests}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <a
                  href={`https://wa.me/${selectedBooking.phone.replace(/[^0-9]/g, "")}?text=Hello ${selectedBooking.name}, regarding your booking at Azwa Hotel...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-primary/30 text-primary py-2.5 text-xs tracking-wider uppercase font-body rounded-lg hover:bg-primary/10 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
                <a
                  href={`mailto:${selectedBooking.email}`}
                  className="flex-1 flex items-center justify-center gap-2 border border-primary/30 text-primary py-2.5 text-xs tracking-wider uppercase font-body rounded-lg hover:bg-primary/10 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
