import { PrismaClient, UserRole, StudioStatus, GearKitStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("[*] Seeding database...");

  // 1. Studios
  const studios = [
    {
      name: "Studio A: Podcast Booth",
      slug: "studio-a",
      description:
        "Acoustically isolated studio suited for 1-4 person broadcast recordings and podcast productions.",
      capacity: 4,
      status: StudioStatus.AVAILABLE,
    },
    {
      name: "Studio B: Green Screen VFX Bay",
      slug: "studio-b",
      description:
        "High-demand cyclorama wall facility for film shoots, green-screen compositing, and VFX tracking.",
      capacity: 6,
      status: StudioStatus.AVAILABLE,
    },
    {
      name: "Studio C: Product Photography Studio",
      slug: "studio-c",
      description:
        "Specialized tabletop and backdrop bay equipped for high-precision product photography and stop-motion.",
      capacity: 4,
      status: StudioStatus.AVAILABLE,
    },
  ];

  for (const studio of studios) {
    await prisma.studio.upsert({
      where: { slug: studio.slug },
      update: studio,
      create: studio,
    });
  }
  console.log("[OK] Seeded 3 studios.");

  // 2. Gear Kits
  const gearKits = [
    {
      name: "Cinema Camera Kit",
      slug: "cinema-camera-kit",
      description:
        "Professional 4K digital cinema camera package for narrative productions.",
      items: [
        "Cinema Camera Body",
        "35mm T1.5 Prime Lens",
        "Heavy Duty Fluid Head Tripod",
        "2x 128GB High-Speed CFast Cards",
        "2x V-Mount Batteries & Dual Charger",
      ],
      status: GearKitStatus.AVAILABLE,
    },
    {
      name: "Studio Lighting Strobe Kit",
      slug: "studio-lighting-strobe-kit",
      description:
        "Precision lighting kit for portraiture, commercial sets, and stop-motion photography.",
      items: [
        "2x 500W Studio Strobe Heads",
        "2x Quick-Fold Softboxes",
        "2x Heavy C-Stands with Grip Arms",
        "Wireless Flash Trigger Transmitter",
        "Translucent Diffusion Panel",
      ],
      status: GearKitStatus.AVAILABLE,
    },
    {
      name: "Audio Podcast Kit",
      slug: "audio-podcast-kit",
      description:
        "Broadcast-grade vocal capture kit for podcasting and multi-mic panel discussions.",
      items: [
        "4x Shure Dynamic Broadcast Microphones",
        "4-Channel USB Audio Interface",
        "4x Broadcast Boom Arms & XLR Cables",
        "4x Closed-Back Studio Monitor Headphones",
      ],
      status: GearKitStatus.AVAILABLE,
    },
  ];

  for (const kit of gearKits) {
    await prisma.gearKit.upsert({
      where: { slug: kit.slug },
      update: kit,
      create: kit,
    });
  }
  console.log("[OK] Seeded 3 gear kits.");

  // 3. Users
  const passwordHash = await bcrypt.hash("password123", 10);

  const users = [
    {
      email: "maya@prism.edu",
      name: "Maya Lin",
      studentId: "STU-2026-0891",
      role: UserRole.STUDENT,
      passwordHash,
    },
    {
      email: "roland@prism.edu",
      name: "Roland Vance",
      studentId: "TECH-001",
      role: UserRole.TECHNICIAN,
      passwordHash,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }
  console.log("[OK] Seeded student and technician users.");
  console.log("==================================================");
  console.log("[OK] Database seed finished cleanly.");
}

main()
  .catch((e) => {
    console.error("[x] Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
