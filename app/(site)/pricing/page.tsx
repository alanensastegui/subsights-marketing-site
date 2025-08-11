export default function Pricing() {
    return (
        <div className="py-20 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
                <p className="text-xl text-muted-foreground">
                    Choose the plan that fits your business needs
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Starter Plan */}
                <div className="border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold">Starter</h3>
                        <p className="text-muted-foreground">Perfect for small websites</p>
                    </div>
                    <div className="text-3xl font-bold">$29<span className="text-base text-muted-foreground">/month</span></div>
                    <ul className="space-y-2 text-sm">
                        <li>✓ Up to 10,000 monthly visitors</li>
                        <li>✓ Basic analytics</li>
                        <li>✓ Email support</li>
                        <li>✓ 1 website</li>
                    </ul>
                    <button className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
                        Get Started
                    </button>
                </div>

                {/* Professional Plan */}
                <div className="border-2 border-primary rounded-lg p-6 space-y-4 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                            Most Popular
                        </span>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Professional</h3>
                        <p className="text-muted-foreground">For growing businesses</p>
                    </div>
                    <div className="text-3xl font-bold">$99<span className="text-base text-muted-foreground">/month</span></div>
                    <ul className="space-y-2 text-sm">
                        <li>✓ Up to 100,000 monthly visitors</li>
                        <li>✓ Advanced analytics & insights</li>
                        <li>✓ A/B testing</li>
                        <li>✓ Priority support</li>
                        <li>✓ Up to 5 websites</li>
                        <li>✓ Custom targeting</li>
                    </ul>
                    <button className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
                        Get Started
                    </button>
                </div>

                {/* Enterprise Plan */}
                <div className="border rounded-lg p-6 space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold">Enterprise</h3>
                        <p className="text-muted-foreground">For large organizations</p>
                    </div>
                    <div className="text-3xl font-bold">Custom</div>
                    <ul className="space-y-2 text-sm">
                        <li>✓ Unlimited visitors</li>
                        <li>✓ Full feature access</li>
                        <li>✓ Dedicated support</li>
                        <li>✓ Unlimited websites</li>
                        <li>✓ Custom integrations</li>
                        <li>✓ SLA guarantee</li>
                    </ul>
                    <button className="w-full rounded-lg border border-input bg-background px-4 py-2 hover:bg-accent">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    );
}
