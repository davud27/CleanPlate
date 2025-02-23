interface CertificationsListProps {
  certifications: Array<{
    name: string;
    verified: boolean;
    details: string;
  }>;
}

export function CertificationsList({
  certifications,
}: CertificationsListProps) {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Certifications</h2>
      <ul className="space-y-2">
        {certifications.map((cert, index) => (
          <li key={index} className="flex items-center gap-2">
            <span>{cert.verified ? "✓" : "✗"}</span>
            <span>{cert.name}</span>
            <span className="text-sm text-gray-600">{cert.details}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
