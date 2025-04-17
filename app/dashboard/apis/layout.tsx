export const metadata = {
  title: 'Your APIs - Spineless API',
  description: 'Manage your collection of Spineless APIs for frontend development',
};

export default function APIsLayout({
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
