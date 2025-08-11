interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface FeatureGridProps {
    features: Feature[];
    columns?: 2 | 3 | 4;
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
    const gridCols = {
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
    };

    return (
        <section className={`grid ${gridCols[columns]} gap-8`}>
            {features.map((feature, index) => (
                <div key={index} className="text-center space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                        <span className="text-primary font-semibold text-lg">{feature.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                </div>
            ))}
        </section>
    );
}
