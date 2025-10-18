import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // 1️⃣ ADMIN USER
    const hash = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@velora.test' },
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@velora.test',
            password: hash,
            role: 'ADMIN',
        },
    });
    console.log('✅ Seed OK: admin@velora.test');

    // 2️⃣ PRODUCTS
    const imageUrl =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjt-ewgNomB7qqJH9Hn5VxQsnOgH_rRb2u9Q&s';

    const products = [
        {
            name: 'Samsung Galaxy S24 Ultra',
            description:
                'Najnoviji flagship telefon sa Snapdragon 8 Gen 3 čipsetom i 200MP kamerom.',
            price: 1299.99,
            currency: 'EUR',
            stock: 25,
            imageUrl,
        },
        {
            name: 'Apple iPhone 15 Pro Max',
            description:
                'Premium Apple uređaj sa A17 Pro čipsetom i Titanium kućištem.',
            price: 1399.99,
            currency: 'EUR',
            stock: 30,
            imageUrl,
        },
        {
            name: 'Xiaomi Redmi Note 13 Pro',
            description:
                'Odličan balans performansi i cene, sa AMOLED ekranom i 120Hz osvežavanjem.',
            price: 349.99,
            currency: 'EUR',
            stock: 50,
            imageUrl,
        },
        {
            name: 'Apple iPad Air (2024)',
            description: 'Tanak i brz tablet sa M2 čipom, idealan za rad i zabavu.',
            price: 699.99,
            currency: 'EUR',
            stock: 20,
            imageUrl,
        },
        {
            name: 'Samsung Galaxy Tab S9',
            description:
                'Vrhunski Android tablet sa AMOLED ekranom i podrškom za S-Pen.',
            price: 799.99,
            currency: 'EUR',
            stock: 18,
            imageUrl,
        },
        {
            name: 'Logitech MX Master 3S',
            description:
                'Profesionalni bežični miš sa odličnom ergonomijom i preciznošću.',
            price: 99.99,
            currency: 'EUR',
            stock: 40,
            imageUrl,
        },
        {
            name: 'Razer DeathAdder V3 Pro',
            description:
                'Lagani gaming miš sa Focus Pro 30K optičkim senzorom i niskim latencijama.',
            price: 159.99,
            currency: 'EUR',
            stock: 35,
            imageUrl,
        },
        {
            name: 'Keychron K8 Pro Mechanical Keyboard',
            description:
                'Kompaktna mehanička tastatura sa RGB osvetljenjem i mogućnošću bežičnog povezivanja.',
            price: 129.99,
            currency: 'EUR',
            stock: 28,
            imageUrl,
        },
        {
            name: 'Logitech G Pro X Keyboard',
            description:
                'Modularna tastatura sa zamjenjivim switch-evima i profesionalnim dizajnom.',
            price: 149.99,
            currency: 'EUR',
            stock: 22,
            imageUrl,
        },
        {
            name: 'Sony WH-1000XM5 Headphones',
            description:
                'Vrhunske bežične slušalice sa aktivnim poništavanjem buke i dugim trajanjem baterije.',
            price: 379.99,
            currency: 'EUR',
            stock: 15,
            imageUrl,
        },
        {
            name: 'Apple AirPods Pro (2nd Gen)',
            description:
                'Bežične slušalice sa aktivnim poništavanjem buke i MagSafe punjenjem.',
            price: 279.99,
            currency: 'EUR',
            stock: 25,
            imageUrl,
        },
        {
            name: 'Samsung Odyssey G9 Monitor',
            description:
                'Ogroman zakrivljeni QLED monitor od 49 inča, idealan za gejming i multitasking.',
            price: 1499.99,
            currency: 'EUR',
            stock: 10,
            imageUrl,
        },
        {
            name: 'LG Ultragear 27GN950-B',
            description:
                '4K Nano IPS gaming monitor sa 144Hz osvežavanjem i 1ms odzivom.',
            price: 799.99,
            currency: 'EUR',
            stock: 12,
            imageUrl,
        },
        {
            name: 'Anker PowerCore 26800mAh Power Bank',
            description:
                'Moćna eksterna baterija sa brzim punjenjem i velikim kapacitetom.',
            price: 79.99,
            currency: 'EUR',
            stock: 45,
            imageUrl,
        },
        {
            name: 'Amazon Echo Dot (5th Gen)',
            description: 'Pametni zvučnik sa Alexom i poboljšanim kvalitetom zvuka.',
            price: 59.99,
            currency: 'EUR',
            stock: 60,
            imageUrl,
        },
    ];

    console.log(`🌱 Seeding ${products.length} products...`);
    for (const product of products) {
        await prisma.product.upsert({
            where: { name: product.name },
            update: {},
            create: {
                ...product,
                isActive: true,
            },
        });
    }
    console.log('✅ Products seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
