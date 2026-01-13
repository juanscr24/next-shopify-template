export default function AboutPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">Our Story</h1>
            <div className="mt-10 space-y-8 text-lg text-neutral-600 leading-relaxed">
                <p>
                    Founded in 2024, STORE was born out of a desire for high-quality, minimalist essentials that stand the test of time. We believe that the objects we surround ourselves with should be both beautiful and functional.
                </p>
                <p>
                    Our mission is to provide a curated selection of products that reflect a modern lifestyle—one that values simplicity, sustainability, and exceptional craftsmanship.
                </p>
                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
                        alt="Our studio"
                        className="h-full w-full object-cover"
                    />
                </div>
                <p>
                    We work closely with artisans and manufacturers who share our commitment to quality and ethical production. Every item in our store is carefully vetted to ensure it meets our high standards.
                </p>
                <p>
                    Thank you for being part of our journey. We're excited to help you find your next favorite essential.
                </p>
            </div>
        </div>
    );
}
