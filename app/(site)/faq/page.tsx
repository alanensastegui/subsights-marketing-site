import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FAQ() {
    const faqs = [
        {
            question: "How easy is it to integrate Subsights?",
            answer: "Integration is as simple as adding a single script tag to your website. Our setup takes less than 5 minutes and works with any website platform."
        },
        {
            question: "What kind of insights can I expect?",
            answer: "You'll get detailed visitor analytics, behavior patterns, conversion funnels, heatmaps, and actionable recommendations to improve your website performance."
        },
        {
            question: "Does Subsights affect my website speed?",
            answer: "No, our widget is optimized for performance and loads asynchronously. It won't impact your website's loading speed or user experience."
        },
        {
            question: "Can I use Subsights with my existing tools?",
            answer: "Yes! Subsights integrates seamlessly with popular tools like Google Analytics, CRM systems, and marketing platforms."
        },
        {
            question: "Is there a free trial?",
            answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started."
        },
        {
            question: "What kind of support do you provide?",
            answer: "We provide email support for all plans, priority support for Professional plans, and dedicated support for Enterprise customers."
        }
    ];

    return (
        <div className="py-20 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Find answers to common questions about Subsights
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <p className="text-muted-foreground mb-4">
                    Still have questions? We&apos;re here to help.
                </p>
                <Button asChild>
                    <Link href="/schedule">
                        Contact Support
                    </Link>
                </Button>
            </div>
        </div>
    );
}
