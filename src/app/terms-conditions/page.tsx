'use client';

export default function TermsConditionsPage() {
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
                    Terms & Conditions
                </h1>

                <div className="space-y-12 text-stone font-montreal text-sm md:text-base leading-relaxed text-justify">
                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the Naath Model Management website, you accept and agree to be bound by the
                            terms and provision of this agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">2. Intellectual Property</h2>
                        <p>
                            All content on this website, including but not limited to text, graphics, logos, images, audio clips,
                            digital downloads, and model portfolios, is the property of Naath Model Management or its content
                            suppliers (photographers, models) and is protected by international copyright laws.
                        </p>
                        <p className="mt-4">
                            You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of
                            the Service, or access to the Service without express written permission by us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">3. User Submissions</h2>
                        <p>
                            By submitting an application or content to Naath Model Management, you grant us a non-exclusive license
                            to use, reproduce, and review these materials for the purpose of evaluation and casting. You represent
                            that you own or have the necessary rights to the content you submit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">4. Limitation of Liability</h2>
                        <p>
                            Naath Model Management shall not be liable for any direct, indirect, incidental, special, or consequential
                            damages resulting from the use or the inability to use the website or for the cost of procurement of
                            substitute goods and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">5. Governing Law</h2>
                        <p>
                            Any disputes arising out of or related to these Terms and Conditions and/or any use by you of the Site
                            shall be governed by the laws of Kenya, without regard to the conflicts of laws provisions therein.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-charcoal uppercase tracking-widest text-xs font-bold mb-4">6. Changes to Terms</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes
                            a material change will be determined at our sole discretion.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}