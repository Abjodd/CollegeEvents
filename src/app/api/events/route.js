import { connectDB } from "../../lib/mongodb";
import Event from "../../model/Event";
import { NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const file = formData.get("image");
    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadedImage = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });

    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");

    if (!latitude || !longitude) {
      return NextResponse.json({ error: "Latitude and Longitude are required" }, { status: 400 });
    }

   
    const endDate = formData.get("endDate");
    const endTime = formData.get("endTime");
    const expiresAt = new Date(`${endDate}T${endTime}:00`);

    const newEvent = new Event({
      name: formData.get("name"),
      description: formData.get("description"),
      banner: uploadedImage.secure_url,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      startDate: formData.get("startDate"),
      startTime: formData.get("startTime"),
      endDate,
      endTime,
      expiresAt, 
    });

    await newEvent.save();
    return NextResponse.json({ message: "Event created", event: newEvent }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({});
    return NextResponse.json({ events: events || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

