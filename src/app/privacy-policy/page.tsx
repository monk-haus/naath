'use client';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-alabaster pt-32 md:pt-48 pb-20 px-6 md:px-12 w-full">
            <div className="max-w-3xl mx-auto">
                <h1
                    className="text-charcoal mb-16 leading-none"
                    style={{
                        fontFamily: 'var(--font-editorial)',
                        fontWeight: 200,
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                    }}
                >
                    Privacy Policy
                </h1>

                <div className="space-y-12 text-stone font-montreal text-sm md:text-base leading-relaxed text-justify">
                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">1. Introduction</h2>
                        <p>
                            Naath Model Management ("we", "us", or "our") is committed to protecting the privacy of our models,
                            applicants, and website visitors. This Privacy Policy outlines how we collect, use, disclosure, and
                            safeguard your information in compliance with the Data Protection Act, 2019 of Kenya.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">2. Information We Collect</h2>
                        <p className="mb-4">
                            We collect personal data that you voluntarily provide to us when applying for representation.
                            This includes, but is not limited to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Personal Identity: Name, age, and contact details (email, phone number, Instagram handle).</li>
                            <li>Physical Attributes: Height, measurements (bust, waist, hips), and shoe size.</li>
                            <li>Visual Data: Photographs (headshots, profiles, full-body shots) and videos submitted for scouting purposes.</li>
                            <li>Location Data: City and country of residence.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">3. How We Use Your Information</h2>
                        <p>
                            The information collected is used solely for the purpose of:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Evaluating your potential for representation by Naath Model Management.</li>
                            <li>Contacting you regarding your application or casting opportunities.</li>
                            <li>Presenting your portfolio to potential clients (if you are signed).</li>
                            <li>Internal record keeping and talent management.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">4. Data Sharing</h2>
                        <p>
                            We do not sell your personal data. However, if you are selected for representation, your images and
                            physical statistics may be shared with our network of clients, photographers, and partner agencies
                            in London, New York, Paris, and Milan for professional booking purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">5. Security</h2>
                        <p>
                            We use administrative, technical, and physical security measures to help protect your personal
                            information. While we have taken reasonable steps to secure the personal information you provide
                            to us, please be aware that no security measures are perfect or impenetrable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">6. Contact Us</h2>
                        <p>
                            If you have questions or comments about this Privacy Policy, please contact us at:<br />
                            <span className="text-charcoal font-medium">nyagua@naathmodels.com</span>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}