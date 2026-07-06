import sys
import os
from datetime import datetime, timezone, date

# Ensure backend package can be imported
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.database.db import Base, SessionLocal, engine
from backend.models import (
    Admin, Service, BusinessSettings, WebsiteSettings,
    Testimonial, Gallery, BeforeAfter, TeamMember
)
from backend.auth.hashing import hash_password

def seed_db():
    print("Recreating database tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # 1. Seed Admin
        print("Seeding Admin account...")
        admin = Admin(
            name="TAG Admin Team",
            email="admin@theadventuregarage.com",
            hashed_password=hash_password("Admin@123"),
            role="admin",
            is_active=True
        )
        db.add(admin)

        # 2. Seed Business Settings
        print("Seeding Business Settings...")
        settings = BusinessSettings(
            id=1,
            name="THE ADVENTURE GARAGE (TAG)",
            tagline="Premium Automotive Customization, Detailing & 4x4 Modification Studio",
            logo="/logo.png",
            favicon="/favicon.svg",
            address="Shop No. 210, Old Secretary Gate, Sultania Rd, opposite Commissioner Office, Kohefiza, Bhopal, Madhya Pradesh 462001",
            phone="09560815118",
            email="info@theadventuregarage.com",
            whatsapp="9560815118",
            map_embed_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.986877402638!2d77.3828988!3d23.2435532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4274c43d3b73%3A0xe54d24a9cfb058a5!2sThe%20Adventure%20Garage!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
            opening_hours={
                "days": "Monday - Saturday",
                "timings": "10:00 AM - 08:30 PM",
                "sunday": "Closed"
            },
            social_links={
                "instagram": "https://instagram.com/the_adventure_garage",
                "facebook": "https://facebook.com/theadventuregarage",
                "youtube": "https://youtube.com/@theadventuregarage"
            }
        )
        db.add(settings)

        # 3. Seed Website SEO Settings
        print("Seeding Website Settings...")
        web_settings = WebsiteSettings(
            id=1,
            meta_title="THE ADVENTURE GARAGE | Premium Detailing & 4x4 Customization Bhopal",
            meta_description="Bhopal's premium studio for Ceramic Coating, Paint Protection Film (PPF), Car Wrapping, and Thar 4x4 modifications. Experience ultimate automotive luxury.",
            meta_keywords="car detailing bhopal, ceramic coating, paint protection film, car wrapping, 4x4 modifications, thar modifications, premium car detailing bhopal"
        )
        db.add(web_settings)

        # 4. Seed Services
        print("Seeding Garage Services...")
        services_data = [
            {
                "name": "Ceramic Coating",
                "slug": "ceramic-coating",
                "short_description": "Ultra-hydrophobic quartz shield providing multi-year paint protection and deep candy gloss.",
                "description": "Our premium Ceramic Coating service creates a semi-permanent bond with your vehicle's clear coat, producing a glass-like shell. It shields against UV rays, acid rain, chemical etching, and bird droppings while offering incredible self-cleaning hydrophobic properties.",
                "cover_image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
                "price": 18000.0,
                "display_order": 1,
                "is_featured": True,
                "benefits": [
                    "9H Hardness certified scratch resistance",
                    "Deep candy-like gloss and shine enhancement",
                    "Ultra-hydrophobic surface makes washing effortless",
                    "3-Year & 5-Year warranty variants available"
                ],
                "faqs": [
                    {"question": "How long does ceramic coating last?", "answer": "Depending on the package selected, our coatings last between 2 to 5 years with proper maintenance."},
                    {"question": "Does it prevent rock chips?", "answer": "No, ceramic coating protects against environmental elements and light swirls. For rock chip protection, we recommend PPF."}
                ]
            },
            {
                "name": "Paint Protection Film (PPF)",
                "slug": "paint-protection-film-ppf",
                "short_description": "Self-healing TPU film providing ultimate protection against rock chips, scratches, and road debris.",
                "description": "Our Paint Protection Film (PPF) is an elite thermoplastic polyurethane film applied directly to your car's painted surfaces. Featuring advanced self-healing technology, minor scratches disappear with the application of heat from the sun or warm water.",
                "cover_image": "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800&auto=format&fit=crop",
                "price": 65000.0,
                "display_order": 2,
                "is_featured": True,
                "benefits": [
                    "Self-healing properties under heat or hot water",
                    "Complete defense against rock chips and road gravel",
                    "Optical clarity preserves your original paint color",
                    "Up to 10-Year non-yellowing warranty protection"
                ],
                "faqs": [
                    {"question": "Can PPF be applied to matte paint?", "answer": "Yes, we offer specialized Matte/Stealth PPF which protects and converts glossy paint to a sleek satin finish."},
                    {"question": "How do I wash a car with PPF?", "answer": "Wait 7 days after installation. Hand wash using a clean microfiber mitt and pH-neutral soap. Avoid direct high-pressure spray near the edges."}
                ]
            },
            {
                "name": "Vehicle Wrapping",
                "slug": "vehicle-wrapping",
                "short_description": "Transform your ride with premium vinyl wraps in satin, matte, chrome, or gloss finishes.",
                "description": "Reimagine your vehicle's identity with our full vinyl wrap services. Using industry-leading films like 3M and Avery Dennison, we deliver premium color changes that protect your original paint underneath and are completely reversible.",
                "cover_image": "https://images.unsplash.com/photo-1611245785530-ab08a8a47de4?q=80&w=800&auto=format&fit=crop",
                "price": 45000.0,
                "display_order": 3,
                "is_featured": True,
                "benefits": [
                    "Choose from 500+ premium colors and unique textures",
                    "Reversible application preserves your factory resale value",
                    "Protects original paint from light abrasions and UV fade",
                    "Professional edge tucking for a seamless paint-like finish"
                ],
                "faqs": [
                    {"question": "Will vinyl wrap damage my original paint?", "answer": "No. When applied to healthy OEM factory paint, vinyl wraps actually protect the paint underneath and can be safely removed."},
                    {"question": "How long does a vehicle wrap last?", "answer": "With proper care, a premium vinyl wrap will look pristine for 3 to 5 years."}
                ]
            },
            {
                "name": "Premium Detailing",
                "slug": "premium-detailing",
                "short_description": "Deep multi-stage paint correction and clinical interior sanitization services.",
                "description": "Our deep-clean detailing service restores your vehicle to a showroom state. Includes multi-stage paint correction to remove 85%+ of swirl marks, followed by deep steam extraction, leather conditioning, and detailing of all dashboard, console, and engine bay components.",
                "cover_image": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
                "price": 8500.0,
                "display_order": 4,
                "is_featured": False,
                "benefits": [
                    "Multi-stage machine paint correction clears swirls",
                    "Deep steam extraction sanitization of all upholstery",
                    "Leather cleaning and premium conditioning creams",
                    "Detailing of engine bay, underbody, and alloys"
                ],
                "faqs": [
                    {"question": "What is paint correction?", "answer": "Paint correction is the mechanical leveling of the clear coat to remove swirls, oxidation, and scratches, restoring absolute clarity."},
                    {"question": "How often should I detail my car?", "answer": "We recommend a complete professional detailing twice a year to keep the interior clean and paint clear."}
                ]
            },
            {
                "name": "4x4 Modifications",
                "slug": "4x4-modifications",
                "short_description": "Heavy-duty off-road upgrades, lift kits, bumpers, snorkels, and high-performance tires.",
                "description": "Elevate your off-road adventures. We specialize in complete 4x4 builds, custom suspension lift kits (Old Man Emu, Profender), rugged off-road bumpers, snorkels, recovery winches, and premium wheel/tire setups that handle the toughest Indian terrains.",
                "cover_image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
                "price": 35000.0,
                "display_order": 5,
                "is_featured": True,
                "benefits": [
                    "Premium suspension lifts for extreme ground clearance",
                    "Heavy-duty metal front/rear bumpers and rock sliders",
                    "Professional snorkels and high-performance air intake systems",
                    "Top-tier off-road tires and alloy brand options"
                ],
                "faqs": [
                    {"question": "Will a lift kit void my vehicle warranty?", "answer": "Modifying suspension can affect warranty claims on those components, but we use premium, certified brands to ensure reliability."},
                    {"question": "Can you customize Mahindra Thar and Jeep Compass?", "answer": "Absolutely! Mahindra Thar, Jeep Wrangler/Compass, and Toyota Fortuner are our signature off-road project vehicles."}
                ]
            },
            {
                "name": "Custom Thar Tail Lights",
                "slug": "custom-thar-tail-lights",
                "short_description": "Aggressive, high-visibility LED tail lights customized specifically for the Mahindra Thar.",
                "description": "Upgrade your Mahindra Thar's rear profile with our custom LED tail lights. Featuring unique startup animations, dynamic sequential indicators, and intense brightness, these lights enhance safety and give your Thar an aggressive off-road signature.",
                "cover_image": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop",
                "price": 6500.0,
                "display_order": 6,
                "is_featured": False,
                "benefits": [
                    "Unique startup light animation sequence",
                    "Sleek dynamic indicators (sweeping turn signals)",
                    "Direct plug-and-play installation with zero wire cutting",
                    "1-Year replacement warranty on all LED chips"
                ],
                "faqs": [
                    {"question": "Do I need to cut any factory wires?", "answer": "No. Our Thar tail lights are fully plug-and-play and connect directly into your stock harness to protect your vehicle warranty."},
                    {"question": "Are they waterproof?", "answer": "Yes, they are IP67 sealed to withstand muddy off-road trails and high-pressure water washes."}
                ]
            }
        ]

        inserted_services = []
        for s_data in services_data:
            s = Service(**s_data)
            db.add(s)
            inserted_services.append(s)
        
        db.commit()
        for s in inserted_services:
            db.refresh(s)

        # 5. Seed Testimonials (Reviews)
        print("Seeding Testimonials...")
        testimonials_data = [
            {
                "reviewer_name": "Arjun Sharma",
                "reviewer_email": "arjun@gmail.com",
                "rating": 5.0,
                "review": "Brought my brand new Mahindra Thar to TAG for a full 4x4 suspension lift and dynamic LED tail lights. The team did an incredible job, absolutely zero wiring issues, and the ride is super smooth. Easily the best custom garage in Bhopal!",
                "service_id": inserted_services[4].id if len(inserted_services) > 4 else None,
                "status": "approved",
                "is_featured": True
            },
            {
                "reviewer_name": "Priyanka Verma",
                "reviewer_email": "priyanka@gmail.com",
                "rating": 5.0,
                "review": "Exceptional Paint Protection Film (PPF) installation on my Mercedes C-Class. Edges are completely tucked and invisible. The self-healing works like magic under warm water. Very professional behavior and luxury service.",
                "service_id": inserted_services[1].id if len(inserted_services) > 1 else None,
                "status": "approved",
                "is_featured": True
            },
            {
                "reviewer_name": "Kabir Mehta",
                "reviewer_email": "kabir@mehta.com",
                "rating": 5.0,
                "review": "Opted for a satin black full vinyl wrap for my Fortuner and Ceramic Coating on top. TAG transformed it completely. It looks like a stealth bomber! Highly recommended studio for luxury car wraps in MP.",
                "service_id": inserted_services[2].id if len(inserted_services) > 2 else None,
                "status": "approved",
                "is_featured": True
            }
        ]

        for t_data in testimonials_data:
            db.add(Testimonial(**t_data))

        # 6. Seed Before & After comparison slides
        print("Seeding Before & After Gallery...")
        bas_data = [
            {
                "title": "Mahindra Thar Detailing",
                "description": "Full mud restoration, paint decontamination, and premium detailing gloss treatment.",
                "before_image": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop", # Mock placeholder
                "after_image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
                "category": "Detailing"
            },
            {
                "title": "Jeep Wrangler Matte Wrap",
                "description": "Converted from original cherry red to a custom stealth satin grey vinyl wrap.",
                "before_image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
                "after_image": "https://images.unsplash.com/photo-1611245785530-ab08a8a47de4?q=80&w=800&auto=format&fit=crop",
                "category": "Wrap"
            }
        ]

        for ba_data in bas_data:
            db.add(BeforeAfter(**ba_data))

        # 7. Seed Gallery (Projects Showcase)
        print("Seeding Projects Showcase Gallery...")
        gallery_data = [
            {
                "title": "Satin Stealth Thar 4x4",
                "description": "Mahindra Thar fitted with suspension lift, 33-inch mud tires, metal bumpers, dynamic grill, and full matte wrap.",
                "file_url": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
                "category": "Thar",
                "is_featured": True,
                "display_order": 1
            },
            {
                "title": "Mercedes E-Class Paint Correction",
                "description": "Full paint correction and dual-layer 9H ceramic coating application.",
                "file_url": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop",
                "category": "Ceramic",
                "is_featured": True,
                "display_order": 2
            },
            {
                "title": "Fortuner Matte Military Wrap",
                "description": "Complete color change wrap using Avery Dennison Military Matte Green vinyl.",
                "file_url": "https://images.unsplash.com/photo-1611245785530-ab08a8a47de4?q=80&w=800&auto=format&fit=crop",
                "category": "Wrap",
                "is_featured": True,
                "display_order": 3
            },
            {
                "title": "Audi RS5 PPF Installation",
                "description": "Full body gloss self-healing PPF applied with custom digital templates.",
                "file_url": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop",
                "category": "PPF",
                "is_featured": True,
                "display_order": 4
            }
        ]

        for g_data in gallery_data:
            db.add(Gallery(**g_data))

        # 8. Seed Team Members
        print("Seeding Team members...")
        team_data = [
            {
                "name": "Vikram Singh",
                "role": "Founder & Lead Customization Designer",
                "bio": "Over 12 years of designing and engineering elite off-road builds and luxury wraps.",
                "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
                "display_order": 1
            },
            {
                "name": "Manish Patel",
                "role": "Master PPF Installer",
                "bio": "Certified installer with absolute precision in corner wrapping and knife-less tape templates.",
                "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
                "display_order": 2
            }
        ]
        for t_member in team_data:
            db.add(TeamMember(**t_member))

        db.commit()
        print("Database seeded successfully with TAG automotive data!")

    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == '__main__':
    seed_db()
