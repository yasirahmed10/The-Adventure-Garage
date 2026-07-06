import os
import sys
import re

# Add the project root to the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from sqlalchemy import text
from backend.database.db import SessionLocal, engine
from backend.models.service import Service
from backend.models.gallery import Gallery
from backend.models.testimonial import Testimonial, TestimonialStatus


def create_slug(name: str) -> str:
    """Generate a URL-friendly slug from a service name."""
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    return slug.strip('-')


def run_migrations():
    print("Running migrations...")
    with engine.begin() as conn:
        # Website settings design columns
        migrations = [
            ("website_settings", "primary_color", "VARCHAR(50) DEFAULT '#00f2fe'"),
            ("website_settings", "background_color", "VARCHAR(50) DEFAULT '#09090b'"),
            ("website_settings", "font_family", "VARCHAR(50) DEFAULT 'Inter'"),
            ("website_settings", "secondary_color", "VARCHAR(50) DEFAULT '#0a1f1a'"),
            ("website_settings", "accent_hover_color", "VARCHAR(50) DEFAULT '#00936F'"),
            ("website_settings", "button_radius", "VARCHAR(20) DEFAULT 'full'"),
            ("website_settings", "card_radius", "VARCHAR(20) DEFAULT '3xl'"),
            ("website_settings", "navbar_style", "VARCHAR(20) DEFAULT 'glass'"),
            ("website_settings", "footer_style", "VARCHAR(20) DEFAULT 'detailed'"),
            ("website_settings", "glassmorphism_enabled", "BOOLEAN DEFAULT 1"),
            ("website_settings", "hero_title", "TEXT"),
            ("website_settings", "hero_subtitle", "TEXT"),
            ("website_settings", "hero_bg_image", "VARCHAR(500)"),
            ("website_settings", "cta_text", "VARCHAR(200) DEFAULT 'Book Appointment'"),
            ("website_settings", "show_about_section", "BOOLEAN DEFAULT 1"),
            ("website_settings", "show_gallery_section", "BOOLEAN DEFAULT 1"),
            ("website_settings", "show_testimonials_section", "BOOLEAN DEFAULT 1"),
            ("website_settings", "show_services_section", "BOOLEAN DEFAULT 1"),
            ("website_settings", "show_offers_section", "BOOLEAN DEFAULT 1"),
        ]

        for table, col, col_type in migrations:
            try:
                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {col} {col_type};"))
                print(f"  Added {table}.{col}")
            except Exception as e:
                pass  # Column already exists


def seed_services(db):
    print("Seeding services...")
    services_data = [
        {
            "name": "Ceramic Coating",
            "short_description": "Durable ceramic coating enhancing gloss while shielding from UV, dirt, and scratches.",
            "description": "High-gloss ceramic coating for maximum protection. Our premium ceramic coating creates an ultra-durable, hydrophobic layer that bonds to your vehicle's paint at a molecular level, providing years of protection against environmental contaminants, UV damage, and micro-scratches.",
            "price": 15000,
            "cover_image": "/images/services/ceramic_coating.png",
            "benefits": ["9H hardness ceramic layer", "5+ years durability", "Extreme hydrophobic effect", "UV and oxidation protection", "Enhanced paint gloss and depth"],
            "is_active": True,
            "is_featured": True,
            "display_order": 1
        },
        {
            "name": "Paint Protection Film (PPF)",
            "short_description": "Premium self-healing TPU film protecting from chips, scratches, and daily wear.",
            "description": "Invisible armor for your vehicle's paint. Our Paint Protection Film is a thermoplastic urethane film applied to painted surfaces to protect from stone chips, bug splatters, and minor abrasions.",
            "price": 45000,
            "cover_image": "/images/services/ppf.png",
            "benefits": ["Self-healing technology", "10-year non-yellowing warranty", "Protects against gravel impact", "Invisible protection", "Maintains resale value"],
            "is_active": True,
            "is_featured": True,
            "display_order": 2
        },
        {
            "name": "Vehicle Wrapping",
            "short_description": "Premium vinyl wraps in hundreds of colors, matte, gloss, and carbon fiber finishes.",
            "description": "Transform your car's appearance completely with our professional vinyl wrapping service. Choose from hundreds of colors, textures, and finishes.",
            "price": 25000,
            "cover_image": "/images/services/vehicle_wrapping.png",
            "benefits": ["Hundreds of color options", "Removable without paint damage", "Matte, gloss, satin finishes", "Carbon fiber textures available", "Full or partial wraps"],
            "is_active": True,
            "is_featured": True,
            "display_order": 3
        },
        {
            "name": "Premium Detailing",
            "short_description": "Professional detailing packages designed to restore your vehicle to showroom condition.",
            "description": "Deep cleaning for interior and exterior. Our multi-stage detailing process uses premium products and techniques to bring your vehicle back to its original glory.",
            "price": 5000,
            "cover_image": "/images/services/premium_detailing.png",
            "benefits": ["Interior deep clean", "Paint correction & polish", "Engine bay cleaning", "Leather conditioning", "Showroom finish"],
            "is_active": True,
            "is_featured": False,
            "display_order": 4
        },
        {
            "name": "Premium Body Kits",
            "short_description": "Upgrade appearance with custom front lips, diffusers, spoilers, and wide body kits.",
            "description": "Aggressive styling and aerodynamic improvements. We source and install premium aftermarket body kits that transform your vehicle's stance.",
            "price": 30000,
            "cover_image": "/images/services/premium_body_kits.png",
            "benefits": ["Custom fitment guaranteed", "OEM+ quality materials", "Professional paint matching", "Wind tunnel tested aero", "Track-ready options"],
            "is_active": True,
            "is_featured": False,
            "display_order": 5
        },
        {
            "name": "4x4 Modifications",
            "short_description": "Complete off-road packages: lift kits, bumpers, winches, and massive off-road alloys.",
            "description": "Get ready for the toughest trails. Our 4x4 modification packages are designed for serious off-roaders looking to push boundaries.",
            "price": 80000,
            "cover_image": "/images/services/offroad_modifications.png",
            "benefits": ["Lift kit installation", "Off-road bumpers & winches", "Snorkel installation", "Locking differentials", "Heavy-duty suspension"],
            "is_active": True,
            "is_featured": True,
            "display_order": 6
        },
        {
            "name": "Custom Wraps",
            "short_description": "Personalized graphics, racing stripes, camouflage, and custom-designed liveries.",
            "description": "Unique racing liveries and custom graphics. Stand out from the crowd with our custom design wraps.",
            "price": 18000,
            "cover_image": "/images/services/custom_wraps.png",
            "benefits": ["Custom design service", "High-resolution printing", "Racing stripe packages", "Camo & specialty finishes", "Brand livery wraps"],
            "is_active": True,
            "is_featured": False,
            "display_order": 7
        },
        {
            "name": "Ambient Lighting",
            "short_description": "Premium multi-color interior ambient lighting with smartphone app control.",
            "description": "Set the mood inside your cabin with our premium ambient lighting solutions. App-controlled, multi-zone, and dimmable.",
            "price": 12000,
            "cover_image": "/images/services/ambient_lighting.png",
            "benefits": ["App-controlled colors", "Multi-zone configuration", "OEM-like integration", "Dimmable brightness", "Music reactive mode"],
            "is_active": True,
            "is_featured": False,
            "display_order": 8
        },
        {
            "name": "OBD Digital Meters",
            "short_description": "Real-time performance displays for RPM, turbo boost, temps, and fuel economy.",
            "description": "Monitor your engine's vitals in style. Our OBD digital displays provide real-time performance data in a sleek package.",
            "price": 8500,
            "cover_image": "/images/services/obd_digital_meters.png",
            "benefits": ["Real-time RPM & boost", "Coolant & oil temp monitoring", "Fault code reader", "Heads-up display option", "Clean dashboard integration"],
            "is_active": True,
            "is_featured": False,
            "display_order": 9
        },
        {
            "name": "Custom Thar Tail Lights",
            "short_description": "Stylish aftermarket LED sequential and dynamic tail lights specially for Mahindra Thar.",
            "description": "Stand out from the crowd at night. Our custom Thar tail lights feature sequential indicators and dynamic lighting patterns.",
            "price": 14000,
            "cover_image": "/images/services/thar_tail_lights.png",
            "benefits": ["Sequential LED indicators", "Dynamic brake pattern", "Plug-and-play install", "IP67 waterproof rated", "2-year warranty"],
            "is_active": True,
            "is_featured": True,
            "display_order": 10
        }
    ]

    for s_data in services_data:
        existing = db.query(Service).filter(Service.name == s_data["name"]).first()
        if not existing:
            slug = create_slug(s_data["name"])
            # Ensure slug uniqueness
            counter = 1
            base_slug = slug
            while db.query(Service).filter(Service.slug == slug).first():
                slug = f"{base_slug}-{counter}"
                counter += 1
            service = Service(slug=slug, **s_data)
            db.add(service)
            print(f"  Added service: {s_data['name']} (slug: {slug})")
        else:
            print(f"  Skipped (exists): {s_data['name']}")
    db.commit()


def seed_gallery(db):
    print("Seeding gallery...")
    gallery_data = [
        {
            "title": "GTR Widebody Wrap",
            "description": "Full satin black wrap with carbon fiber accents on a Nissan GTR R35.",
            "file_url": "/images/services/custom_wraps.png",
            "category": "Wrap",
            "is_featured": True,
            "is_active": True,
            "display_order": 1
        },
        {
            "title": "Thar Offroad Build",
            "description": "Complete off-road transformation with lift kit, bumpers, and 35-inch tires.",
            "file_url": "/images/services/offroad_modifications.png",
            "category": "4x4",
            "is_featured": True,
            "is_active": True,
            "display_order": 2
        },
        {
            "title": "BMW Ceramic Polish",
            "description": "Multi-stage paint correction followed by premium ceramic coating application.",
            "file_url": "/images/services/ceramic_coating.png",
            "category": "Ceramic",
            "is_featured": True,
            "is_active": True,
            "display_order": 3
        },
        {
            "title": "Audi RS PPF Installation",
            "description": "Full front PPF installation protecting from highway stone chips.",
            "file_url": "/images/services/ppf.png",
            "category": "PPF",
            "is_featured": False,
            "is_active": True,
            "display_order": 4
        },
        {
            "title": "Lamborghini Custom Wrap",
            "description": "Stunning color-shift wrap on a Lamborghini Huracán.",
            "file_url": "/images/services/vehicle_wrapping.png",
            "category": "Wrap",
            "is_featured": True,
            "is_active": True,
            "display_order": 5
        },
        {
            "title": "Interior Deep Clean",
            "description": "Complete interior restoration with steam cleaning and leather conditioning.",
            "file_url": "/images/services/premium_detailing.png",
            "category": "Detailing",
            "is_featured": False,
            "is_active": True,
            "display_order": 6
        }
    ]

    for g_data in gallery_data:
        existing = db.query(Gallery).filter(Gallery.title == g_data["title"]).first()
        if not existing:
            item = Gallery(**g_data)
            db.add(item)
            print(f"  Added gallery: {g_data['title']}")
        else:
            print(f"  Skipped (exists): {g_data['title']}")
    db.commit()


def seed_testimonials(db):
    print("Seeding testimonials...")
    testimonials_data = [
        {
            "reviewer_name": "Rahul S.",
            "reviewer_email": "rahul@example.com",
            "rating": 5.0,
            "review": "The ceramic coating on my BMW is flawless. It looks better than when I bought it from the showroom. Highly professional team at TAG!",
            "status": TestimonialStatus.approved,
            "is_featured": True
        },
        {
            "reviewer_name": "Amit Patel",
            "reviewer_email": "amit@example.com",
            "rating": 5.0,
            "review": "Got my Thar modified with their 4x4 package and custom tail lights. The off-road capability is now insane. Best garage in Bhopal.",
            "status": TestimonialStatus.approved,
            "is_featured": True
        },
        {
            "reviewer_name": "Neha Sharma",
            "reviewer_email": "neha@example.com",
            "rating": 5.0,
            "review": "I opted for the PPF on my new Audi. The application is completely invisible and has already saved me from multiple rock chips on the highway.",
            "status": TestimonialStatus.approved,
            "is_featured": True
        },
        {
            "reviewer_name": "Vikram Singh",
            "reviewer_email": "vikram@example.com",
            "rating": 4.5,
            "review": "Amazing ambient lighting installation in my Fortuner. The app control is smooth and the integration looks factory-fitted. Will be back for ceramic coating!",
            "status": TestimonialStatus.approved,
            "is_featured": False
        },
        {
            "reviewer_name": "Priya Mehta",
            "reviewer_email": "priya@example.com",
            "rating": 5.0,
            "review": "Had my Creta wrapped in matte black. The finish is absolutely stunning and the attention to detail is unmatched. TAG is the real deal!",
            "status": TestimonialStatus.approved,
            "is_featured": True
        }
    ]

    for t_data in testimonials_data:
        existing = db.query(Testimonial).filter(
            Testimonial.reviewer_name == t_data["reviewer_name"]
        ).first()
        if not existing:
            testimonial = Testimonial(**t_data)
            db.add(testimonial)
            print(f"  Added testimonial: {t_data['reviewer_name']}")
        else:
            print(f"  Skipped (exists): {t_data['reviewer_name']}")
    db.commit()


if __name__ == "__main__":
    run_migrations()
    db = SessionLocal()
    try:
        seed_services(db)
        seed_gallery(db)
        seed_testimonials(db)
        print("\n✅ Seeding complete!")
    finally:
        db.close()
