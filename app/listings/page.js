"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Listings() {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [formStatus, setFormStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadUser();
    loadListings();
  }, []);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data?.user || null);
  }

  async function loadListings() {
    setLoading(true);
    const { data } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });
    setListings(data || []);
    setLoading(false);
  }

  async function handleAddListing(e) {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus(null);

    const { error } = await supabase.from("listings").insert({
      landlord_id: user.id,
      title,
      location,
      price: Number(price),
      description,
    });

    setSubmitting(false);

    if (error) {
      setFormStatus({ type: "error", message: error.message });
    } else {
      setFormStatus({ type: "success", message: "Listing posted." });
      setTitle("");
      setLocation("");
      setPrice("");
      setDescription("");
      loadListings();
    }
  }

  const isLandlord = user?.user_metadata?.role === "landlord";

  return (
    <div className="container">
      <nav>
        <a href="/" className="logo">Nestly</a>
        <div className="nav-links">
          {!user && <a href="/login">Sign in</a>}
          {user && <span className="user-tag">{user.email}</span>}
        </div>
      </nav>

      {isLandlord && (
        <div className="listing-form-wrap">
          <h2>Post a listing</h2>
          <form onSubmit={handleAddListing} className="listing-form">
            <input
              type="text"
              placeholder="Title (e.g. 2 bedroom flat, Lekki Phase 1)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Annual rent (NGN)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? "Posting..." : "Post listing"}
            </button>
          </form>
          {formStatus && (
            <p className={formStatus.type === "error" ? "form-error" : "form-success"}>
              {formStatus.message}
            </p>
          )}
        </div>
      )}

      <div className="listings-section">
        <h2>Available rentals</h2>
        {loading && <p>Loading listings...</p>}
        {!loading && listings.length === 0 && (
          <p className="empty-state">No listings yet — be the first to post one.</p>
        )}
        <div className="listing-grid">
          {listings.map((item) => (
            <div className="listing-card" key={item.id}>
              <h3>{item.title}</h3>
              <p className="listing-location">{item.location}</p>
              <p className="listing-price">
                ₦{Number(item.price).toLocaleString()} / year
              </p>
              <p className="listing-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
