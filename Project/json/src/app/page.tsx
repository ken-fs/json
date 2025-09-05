import Header from '@/components/Header';
import JSONFormatter from '@/components/JSONFormatter';

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <JSONFormatter />
    </div>
  );
}