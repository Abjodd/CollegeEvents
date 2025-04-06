import { connectDB } from "../../../lib/mongodb";
import Event from "../../../model/Event";
import cloudinary from "../../../lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET(req) {
  // This is the same code you already have in your manual cron job
  console.log("🚀 Cron job triggered!");

  try {
    await connectDB();
    console.log("✅ Connected to Database");

    const now = new Date();
    console.log("⏳ Current Time:", now.toISOString());

    const expiredEvents = await Event.find({ expiresAt: { $lt: now } });
    console.log(`📌 Found ${expiredEvents.length} expired events`);

    let deletedCount = 0;

    for (const event of expiredEvents) {
      console.log(`🗑 Deleting Event: ${event.name} (${event._id})`);

      // Delete from cloudinary
      if (event.banner) {
        try {
          const publicId = event.banner.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
          console.log(`✅ Deleted Cloudinary image: ${publicId}`);
        } catch (err) {
          console.error(`❌ Failed to delete Cloudinary image: ${event._id}`, err);
        }
      }

      // Delete event from MongoDB
      await Event.findByIdAndDelete(event._id);
      deletedCount++;
    }

    console.log(`✅ Successfully deleted ${deletedCount} expired events`);
    return NextResponse.json({ success: true, deleted: deletedCount });
  } catch (error) {
    console.error("❌ Cron job error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}