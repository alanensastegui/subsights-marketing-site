import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

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
                <Card>
                    <CardHeader>
                        <CardTitle>Starter</CardTitle>
                        <p className="text-muted-foreground">Perfect for small websites</p>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">$29<span className="text-base text-muted-foreground">/month</span></div>
                        <ul className="space-y-2 text-sm">
                            <li>✓ Up to 10,000 monthly visitors</li>
                            <li>✓ Basic analytics</li>
                            <li>✓ Email support</li>
                            <li>✓ 1 website</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">
                            Get Started
                        </Button>
                    </CardFooter>
                </Card>

                {/* Professional Plan */}
                <Card className="border-2 border-primary relative">
                    <CardHeader>
                        <CardTitle>Professional</CardTitle>
                        <p className="text-muted-foreground">For growing businesses</p>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">$99<span className="text-base text-muted-foreground">/month</span></div>
                        <ul className="space-y-2 text-sm">
                            <li>✓ Up to 100,000 monthly visitors</li>
                            <li>✓ Advanced analytics & insights</li>
                            <li>✓ A/B testing</li>
                            <li>✓ Priority support</li>
                            <li>✓ Up to 5 websites</li>
                            <li>✓ Custom targeting</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">
                            Get Started
                        </Button>
                    </CardFooter>
                </Card>

                {/* Enterprise Plan */}
                <Card>
                    <CardHeader>
                        <CardTitle>Enterprise</CardTitle>
                        <p className="text-muted-foreground">For large organizations</p>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-4">Custom</div>
                        <ul className="space-y-2 text-sm">
                            <li>✓ Unlimited visitors</li>
                            <li>✓ Full feature access</li>
                            <li>✓ Dedicated support</li>
                            <li>✓ Unlimited websites</li>
                            <li>✓ Custom integrations</li>
                            <li>✓ SLA guarantee</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            Contact Sales
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
