export const metadata = {
  title: 'API Details - Spineless API',
  description: 'View details and test your Spineless API endpoints',
};

export default function ApiDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container px-4 py-4 md:py-6 mx-auto">
      {children}
    </div>
  );
}
