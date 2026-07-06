from sqlalchemy.orm import Session
from backend.models.user import User
from backend.models.admin import Admin
from backend.models.service import Service
from backend.models.gallery import Gallery
from backend.models.testimonial import Testimonial
from backend.models.team import TeamMember
from backend.models.settings import BusinessSettings, WebsiteSettings
from backend.auth.hashing import hash_password

def seed_database_safe(db: Session):
    # 1. Seed Admin
    existing_admin = db.query(Admin).first()
    if not existing_admin:
        admin = Admin(
            name="TAG Admin Team",
            email="admin@theadventuregarage.com",
            hashed_password=hash_password("Admin@123"),
            role="admin",
            is_active=True
        )
        db.add(admin)

    # 2. Seed Business Settings
    existing_settings = db.query(BusinessSettings).filter(BusinessSettings.id == 1).first()
    if not existing_settings:
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

    # 3. Seed Website Settings
    existing_web = db.query(WebsiteSettings).filter(WebsiteSettings.id == 1).first()
    if not existing_web:
        web_settings = WebsiteSettings(
            id=1,
            meta_title="THE ADVENTURE GARAGE | Premium Detailing & 4x4 Customization Bhopal",
            meta_description="Bhopal's premium studio for Ceramic Coating, Paint Protection Film (PPF), Car Wrapping, and Thar 4x4 modifications. Experience ultimate automotive luxury.",
            meta_keywords="car detailing bhopal, ceramic coating, paint protection film, car wrapping, 4x4 modifications, thar modifications, premium car detailing bhopal"
        )
        db.add(web_settings)

    # 4. Seed Services
    if db.query(Service).count() == 0:
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
        for s_data in services_data:
            db.add(Service(**s_data))

    # 5. Seed Testimonials
    if db.query(Testimonial).count() == 0:
        testimonials_data = [
            {
                "reviewer_name": "Arjun Sharma",
                "reviewer_email": "arjun@gmail.com",
                "rating": 5.0,
                "review": "Brought my brand new Mahindra Thar to TAG for a full 4x4 suspension lift and dynamic LED tail lights. The team did an incredible job, absolutely zero wiring issues, and the ride is super smooth. Easily the best custom garage in Bhopal!",
                "status": "approved",
                "is_featured": True
            },
            {
                "reviewer_name": "Priyanka Verma",
                "reviewer_email": "priyanka@gmail.com",
                "rating": 5.0,
                "review": "Exceptional Paint Protection Film (PPF) installation on my Mercedes C-Class. Edges are completely tucked and invisible. The self-healing works like magic under warm water. Very professional behavior and luxury service.",
                "status": "approved",
                "is_featured": True
            },
            {
                "reviewer_name": "Kabir Mehta",
                "reviewer_email": "kabir@mehta.com",
                "rating": 5.0,
                "review": "Opted for a satin black full vinyl wrap for my Fortuner and Ceramic Coating on top. TAG transformed it completely. It looks like a stealth bomber! Highly recommended studio for luxury car wraps in MP.",
                "status": "approved",
                "is_featured": True
            }
        ]
        for t_data in testimonials_data:
            db.add(Testimonial(**t_data))

    # 6. Seed Gallery Projects
    if db.query(Gallery).count() == 0:
        gallery_data = [
            {
                "title": "Satin Stealth Thar 4x4",
                "description": "Mahindra Thar fitted with suspension lift, 33-inch mud tires, metal bumpers, dynamic grill, and full matte wrap.",
                "file_url": "/images/gallery/stealth_thar.png",
                "category": "Thar",
                "is_featured": True,
                "display_order": 1
            },
            {
                "title": "Desert Gold Thar Custom",
                "description": "Mahindra Thar modified in satin desert sand gold color, custom bronze off-road wheels, and dynamic snorkel kit.",
                "file_url": "/images/gallery/desert_gold_thar.png",
                "category": "Thar",
                "is_featured": True,
                "display_order": 2
            },
            {
                "title": "Thar Offroad Beast",
                "description": "Mahindra Thar off-road build featuring custom tail lights, rugged front bumper, and heavy-duty winch.",
                "file_url": "/images/services/offroad_modifications.png",
                "category": "Thar",
                "is_featured": True,
                "display_order": 3
            },
            {
                "title": "Gloss Emerald Range Rover",
                "description": "Luxury Range Rover Sport in gloss emerald green finished with a dual-layer nano ceramic coating.",
                "file_url": "/images/gallery/emerald_range_rover.png",
                "category": "SUV",
                "is_featured": True,
                "display_order": 4
            },
            {
                "title": "Matte Charcoal Defender",
                "description": "Land Rover Defender wrapped in premium satin charcoal grey vinyl with gloss black roof accents.",
                "file_url": "/images/gallery/charcoal_defender.png",
                "category": "SUV",
                "is_featured": True,
                "display_order": 5
            },
            {
                "title": "Monster Jeep Wrangler",
                "description": "Heavily modified Jeep Wrangler 4x4 with 4-inch suspension lift, 37-inch rugged mud tires, and orange detailing.",
                "file_url": "/images/gallery/monster_wrangler.png",
                "category": "4x4",
                "is_featured": True,
                "display_order": 6
            },
            {
                "title": "Toyota Hilux Overland Edition",
                "description": "Toyota Hilux dual-cab pickup truck custom-built for overlanding, complete with roof tent and snorkel.",
                "file_url": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
                "category": "4x4",
                "is_featured": True,
                "display_order": 7
            },
            {
                "title": "Audi RS5 Paint Protection",
                "description": "Full body self-healing gloss paint protection film (PPF) application protecting against rock chips.",
                "file_url": "/images/services/ppf.png",
                "category": "PPF",
                "is_featured": True,
                "display_order": 8
            },
            {
                "title": "Porsche 911 GT3 Satin PPF",
                "description": "Custom satin/matte paint protection film (PPF) transformation on a metallic silver Porsche 911 GT3.",
                "file_url": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
                "category": "PPF",
                "is_featured": True,
                "display_order": 9
            },
            {
                "title": "Nissan GTR Satin Wrap",
                "description": "Nissan GTR R35 wrapped in premium Avery Dennison satin black vinyl with gloss carbon fiber accents.",
                "file_url": "/images/services/custom_wraps.png",
                "category": "Wrap",
                "is_featured": True,
                "display_order": 10
            },
            {
                "title": "Lamborghini Color Shift Wrap",
                "description": "Stunning psychedelic color-shifting vinyl wrap applied to a Lamborghini Huracán.",
                "file_url": "/images/services/vehicle_wrapping.png",
                "category": "Wrap",
                "is_featured": True,
                "display_order": 11
            },
            {
                "title": "Ford Mustang Chrome Blue Wrap",
                "description": "Ford Mustang custom wrapped in gloss liquid chrome metallic blue with dual black stripes.",
                "file_url": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop",
                "category": "Wrap",
                "is_featured": True,
                "display_order": 12
            },
            {
                "title": "Mercedes E-Class Quartz Coating",
                "description": "Multi-stage paint correction and premium 9H quartz dual-layer ceramic coating for mirror-like finish.",
                "file_url": "/images/services/ceramic_coating.png",
                "category": "Ceramic",
                "is_featured": True,
                "display_order": 13
            },
            {
                "title": "BMW M4 Quartz Detail",
                "description": "BMW M4 treated with deep paint rejuvenation and premium glass ceramic coating for extreme hydrophobicity.",
                "file_url": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop",
                "category": "Ceramic",
                "is_featured": True,
                "display_order": 14
            },
            {
                "title": "Interior Detailing & Leather Coat",
                "description": "Deep steam restoration and premium ceramic leather protection applied to vehicle seats and dashboard.",
                "file_url": "/images/services/premium_detailing.png",
                "category": "Ceramic",
                "is_featured": True,
                "display_order": 15
            }
        ]
        for g_data in gallery_data:
            db.add(Gallery(**g_data))

    # 7. Seed Team
    if db.query(TeamMember).count() == 0:
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
