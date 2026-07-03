import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const { id } = await params;
  const task = await Task.findOneAndUpdate(
    { _id: id, userId: session.user.id },
    body,
    { new: true }
  );
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(task);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id } = await params;
  await Task.findOneAndDelete({ _id: id, userId: session.user.id });
  return NextResponse.json({ success: true });
}
